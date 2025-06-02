import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Guest } from '../../guests/entities/guest.entity';
import { Video } from '../../videos/entities/video.entity';

@ObjectType()
@Entity('events')
export class Event {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  owner_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  end_date: Date;

  @Field(() => String)
  @Column('jsonb', { nullable: true })
  location: Record<string, any>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  template_id: string;

  @Field(() => String, { nullable: true })
  @Column('jsonb', { nullable: true })
  custom_colors: Record<string, any>;

  @Field(() => String, { nullable: true })
  @Column('jsonb', { nullable: true })
  custom_text: Record<string, any>;

  @Field()
  @Column()
  status: string;

  @OneToMany(() => Guest, guest => guest.event)
  guests: Guest[];

  @OneToMany(() => Video, video => video.event)
  videos: Video[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
