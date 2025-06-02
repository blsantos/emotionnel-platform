import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password_hash: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_name: string;

  @Field()
  @Column({ default: 'local' })
  provider: string;

  @Field()
  @Column({ default: 'user' })
  role: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar_url: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
