import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
    @InjectQueue('video-processing')
    private videoProcessingQueue: Queue,
  ) {}

  async create(createVideoInput: CreateVideoInput): Promise<Video> {
    const video = this.videosRepository.create(createVideoInput);
    const savedVideo = await this.videosRepository.save(video);
    
    // Ajouter la vidéo à la file d'attente pour traitement
    await this.videoProcessingQueue.add('process', {
      videoId: savedVideo.id,
      url: savedVideo.url,
    });
    
    return savedVideo;
  }

  async findAll(): Promise<Video[]> {
    return this.videosRepository.find();
  }

  async findAllByEventId(eventId: string): Promise<Video[]> {
    return this.videosRepository.find({
      where: { event_id: eventId },
      order: { created_at: 'DESC' }
    });
  }

  async findAllApprovedByEventId(eventId: string): Promise<Video[]> {
    return this.videosRepository.find({
      where: { event_id: eventId, approved: true },
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Video> {
    return this.videosRepository.findOne({ where: { id } });
  }

  async update(id: string, updateVideoInput: UpdateVideoInput): Promise<Video> {
    await this.videosRepository.update(id, updateVideoInput);
    return this.findOne(id);
  }

  async approve(id: string): Promise<Video> {
    await this.videosRepository.update(id, { approved: true });
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.videosRepository.delete(id);
    return result.affected > 0;
  }

  async createCompilation(eventId: string): Promise<string> {
    // Ajouter à la file d'attente pour créer une compilation
    const job = await this.videoProcessingQueue.add('compile', {
      eventId,
    });
    
    return job.id.toString();
  }
}
