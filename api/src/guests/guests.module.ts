import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestsService } from './guests.service';
import { GuestsResolver } from './guests.resolver';
import { GuestsController } from './guests.controller';
import { Guest } from './entities/guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  providers: [GuestsService, GuestsResolver],
  controllers: [GuestsController],
  exports: [GuestsService],
})
export class GuestsModule {}
