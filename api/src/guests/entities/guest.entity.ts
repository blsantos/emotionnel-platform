import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@ObjectType()
@Entity('guests')
export class Guest {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  event_id: string;

  @ManyToOne(() => Event, event => event.guests)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column({ default: 'pending' })
  rsvp: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bring_item: string;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  contribution: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string;

  @Field()
  @Column()
  token: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
