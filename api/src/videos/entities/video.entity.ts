import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Guest } from '../../guests/entities/guest.entity';

@ObjectType()
@Entity('videos')
export class Video {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.videos)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Field({ nullable: true })
  @Column({ nullable: true })
  guest_id: string;

  @ManyToOne(() => Guest)
  @JoinColumn({ name: 'guest_id' })
  guest: Guest;

  @Field()
  @Column()
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration: number;

  @Field()
  @Column({ default: false })
  approved: boolean;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
