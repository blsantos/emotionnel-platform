import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('templates')
export class Template {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  thumbnail_url: string;

  @Field()
  @Column()
  animation_url: string;

  @Field()
  @Column({ default: 'lottie' })
  animation_type: string;

  @Field()
  @Column({ default: false })
  is_premium: boolean;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
