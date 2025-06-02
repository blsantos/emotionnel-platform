import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { CreateGuestInput } from './dto/create-guest.input';
import { UpdateGuestInput } from './dto/update-guest.input';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  async create(createGuestInput: CreateGuestInput): Promise<Guest> {
    const token = crypto.createHash('sha256').update(uuidv4()).digest('hex');
    const guest = this.guestsRepository.create({
      ...createGuestInput,
      token,
    });
    return this.guestsRepository.save(guest);
  }

  async createMany(eventId: string, guests: CreateGuestInput[]): Promise<Guest[]> {
    const guestEntities = guests.map(guest => {
      const token = crypto.createHash('sha256').update(uuidv4()).digest('hex');
      return this.guestsRepository.create({
        ...guest,
        event_id: eventId,
        token,
      });
    });
    
    return this.guestsRepository.save(guestEntities);
  }

  async findAll(): Promise<Guest[]> {
    return this.guestsRepository.find();
  }

  async findAllByEventId(eventId: string): Promise<Guest[]> {
    return this.guestsRepository.find({
      where: { event_id: eventId },
      order: { name: 'ASC' }
    });
  }

  async findOne(id: string): Promise<Guest> {
    return this.guestsRepository.findOne({ where: { id } });
  }

  async findByToken(token: string): Promise<Guest> {
    return this.guestsRepository.findOne({
      where: { token },
      relations: ['event']
    });
  }

  async update(id: string, updateGuestInput: UpdateGuestInput): Promise<Guest> {
    await this.guestsRepository.update(id, updateGuestInput);
    return this.findOne(id);
  }

  async updateRsvp(token: string, rsvp: string, comment?: string, bringItem?: string, contribution?: number): Promise<Guest> {
    const guest = await this.findByToken(token);
    
    if (!guest) {
      throw new Error('Guest not found');
    }
    
    const updateData: any = { rsvp };
    
    if (comment !== undefined) {
      updateData.comment = comment;
    }
    
    if (bringItem !== undefined) {
      updateData.bring_item = bringItem;
    }
    
    if (contribution !== undefined) {
      updateData.contribution = contribution;
    }
    
    await this.guestsRepository.update(guest.id, updateData);
    return this.findOne(guest.id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.guestsRepository.delete(id);
    return result.affected > 0;
  }
}
