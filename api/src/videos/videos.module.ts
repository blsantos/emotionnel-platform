import { Module } from '@nestjs/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { VideosController } from './videos.controller';
import { Video } from './entities/video.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    BullModule.registerQueue({
      name: 'video-processing',
    }),
  ],
  providers: [VideosService, VideosResolver],
  controllers: [VideosController],
  exports: [VideosService],
})
export class VideosModule {}
