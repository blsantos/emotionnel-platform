import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailerService } from './mailer.service';
import { MailerProcessor } from './mailer.processor';
import { MailerController } from './mailer.controller';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  providers: [MailerService, MailerProcessor],
  controllers: [MailerController],
  exports: [MailerService],
})
export class MailerModule {}
