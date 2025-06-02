import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    const event = this.eventsRepository.create(createEventInput);
    return this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findAllByOwnerId(ownerId: string): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { owner_id: ownerId },
      order: { date: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Event> {
    return this.eventsRepository.findOne({
      where: { id },
      relations: ['guests', 'videos']
    });
  }

  async update(id: string, updateEventInput: UpdateEventInput): Promise<Event> {
    await this.eventsRepository.update(id, updateEventInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.eventsRepository.delete(id);
    return result.affected > 0;
  }

  async updateStatus(id: string, status: string): Promise<Event> {
    await this.eventsRepository.update(id, { status });
    return this.findOne(id);
  }
}
