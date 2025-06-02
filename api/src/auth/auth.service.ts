import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponse } from './dto/auth-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.validateUser(loginInput.email, loginInput.password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return this.generateTokens(user);
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.usersService.findOneByEmail(registerInput.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(registerInput.password, 10);
    const newUser = await this.usersService.create({
      ...registerInput,
      password: hashedPassword,
      provider: 'local',
    });
    
    return this.generateTokens(newUser);
  }

  async validateGoogleUser(profile: any): Promise<any> {
    const { email, given_name, family_name } = profile;
    
    let user = await this.usersService.findOneByEmail(email);
    
    if (!user) {
      user = await this.usersService.create({
        email,
        first_name: given_name,
        last_name: family_name,
        provider: 'google',
      });
    }
    
    return user;
  }

  async googleLogin(req): Promise<AuthResponse> {
    if (!req.user) {
      throw new Error('No user from Google');
    }
    
    return this.generateTokens(req.user);
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('REFRESH_SECRET'),
      });
      
      const user = await this.usersService.findOneById(payload.sub);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return this.generateTokens(user);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  private generateTokens(user: any): AuthResponse {
    const payload: JwtPayload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('REFRESH_SECRET'),
        expiresIn: '7d',
      }),
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    };
  }
}
