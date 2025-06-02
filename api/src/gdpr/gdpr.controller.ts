import { Controller, Get, Post, Body, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { GdprService } from './gdpr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('gdpr')
@Controller('gdpr')
export class GdprController {
  constructor(private readonly gdprService: GdprService) {}

  @Get('export')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Exporter toutes les données personnelles de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Données exportées avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async exportMyData(@GetUser() user: User) {
    return this.gdprService.exportUserData(user.id);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer toutes les données personnelles de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Données supprimées avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async deleteMyData(@GetUser() user: User) {
    return this.gdprService.deleteUserData(user.id);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour les données personnelles de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Données mises à jour avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async updateMyData(@GetUser() user: User, @Body() userData: Partial<User>) {
    return this.gdprService.updateUserData(user.id, userData);
  }

  @Put('consents')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour les consentements de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Consentements mis à jour avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async updateMyConsents(
    @GetUser() user: User,
    @Body() data: { consents: string[] },
  ) {
    return this.gdprService.updateConsents(user.id, data.consents);
  }

  @Get('consents/:purpose')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Vérifier si l\'utilisateur a donné son consentement pour une finalité spécifique' })
  @ApiResponse({ status: 200, description: 'Statut du consentement' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async checkConsent(
    @GetUser() user: User,
    @Param('purpose') purpose: string,
  ) {
    const hasConsent = await this.gdprService.hasConsent(user.id, purpose);
    return { hasConsent };
  }
}
