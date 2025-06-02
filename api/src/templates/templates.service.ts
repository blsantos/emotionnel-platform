import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateInput } from './dto/create-template.input';
import { UpdateTemplateInput } from './dto/update-template.input';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  async create(createTemplateInput: CreateTemplateInput): Promise<Template> {
    const template = this.templatesRepository.create(createTemplateInput);
    return this.templatesRepository.save(template);
  }

  async findAll(): Promise<Template[]> {
    return this.templatesRepository.find();
  }

  async findAllByCategory(category: string): Promise<Template[]> {
    return this.templatesRepository.find({
      where: { category },
      order: { name: 'ASC' }
    });
  }

  async findAllFeatured(): Promise<Template[]> {
    return this.templatesRepository.find({
      take: 6,
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Template> {
    return this.templatesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTemplateInput: UpdateTemplateInput): Promise<Template> {
    await this.templatesRepository.update(id, updateTemplateInput);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.templatesRepository.delete(id);
    return result.affected > 0;
  }
}
