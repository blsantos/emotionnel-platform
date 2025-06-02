import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailerService {
  constructor(
    private configService: ConfigService,
    @InjectQueue('mail-queue')
    private mailQueue: Queue,
  ) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(to: string, subject: string, html: string, from?: string): Promise<void> {
    const msg = {
      to,
      from: from || this.configService.get<string>('EMAIL_FROM', 'noreply@e-motionnel.fr'),
      subject,
      html,
    };

    // Ajouter à la file d'attente pour envoi asynchrone
    await this.mailQueue.add('send', msg);
  }

  async sendInvitation(eventId: string, guestId: string): Promise<void> {
    await this.mailQueue.add('send-invitation', {
      eventId,
      guestId,
    });
  }

  async sendReminderToNonRespondents(eventId: string): Promise<void> {
    await this.mailQueue.add('send-reminder', {
      eventId,
      type: 'non-respondents',
    });
  }

  async sendDayBeforeReminder(eventId: string): Promise<void> {
    await this.mailQueue.add('send-reminder', {
      eventId,
      type: 'day-before',
    });
  }

  async sendThankYou(eventId: string): Promise<void> {
    await this.mailQueue.add('send-thank-you', {
      eventId,
    });
  }

  async scheduleAutomatedEmails(eventId: string, eventDate: Date): Promise<void> {
    const eventDateObj = new Date(eventDate);
    
    // Calculer la date pour la relance (J-7)
    const reminderDate = new Date(eventDateObj);
    reminderDate.setDate(reminderDate.getDate() - 7);
    
    // Calculer la date pour le rappel J-1
    const dayBeforeDate = new Date(eventDateObj);
    dayBeforeDate.setDate(dayBeforeDate.getDate() - 1);
    
    // Calculer la date pour le remerciement J+1
    const thankYouDate = new Date(eventDateObj);
    thankYouDate.setDate(thankYouDate.getDate() + 1);
    
    // Planifier les emails automatisés
    await this.mailQueue.add('send-reminder', {
      eventId,
      type: 'non-respondents',
    }, {
      delay: reminderDate.getTime() - Date.now(),
    });
    
    await this.mailQueue.add('send-reminder', {
      eventId,
      type: 'day-before',
    }, {
      delay: dayBeforeDate.getTime() - Date.now(),
    });
    
    await this.mailQueue.add('send-thank-you', {
      eventId,
    }, {
      delay: thankYouDate.getTime() - Date.now(),
    });
  }
}
