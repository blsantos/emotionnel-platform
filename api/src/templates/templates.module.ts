import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './templates.service';
import { TemplatesResolver } from './templates.resolver';
import { TemplatesController } from './templates.controller';
import { Template } from './entities/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [TemplatesService, TemplatesResolver],
  controllers: [TemplatesController],
  exports: [TemplatesService],
})
export class TemplatesModule {}
