import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import * as SendGrid from '@sendgrid/mail';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { Guest } from '../guests/entities/guest.entity';

@Injectable()
@Processor('mail-queue')
export class MailerProcessor {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  @Process('send')
  async handleSendEmail(job: Job<any>): Promise<void> {
    try {
      await SendGrid.send(job.data);
      console.log(`Email sent to ${job.data.to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  @Process('send-invitation')
  async handleSendInvitation(job: Job<any>): Promise<void> {
    const { eventId, guestId } = job.data;
    
    try {
      const event = await this.eventsRepository.findOne({ where: { id: eventId } });
      const guest = await this.guestsRepository.findOne({ where: { id: guestId } });
      
      if (!event || !guest) {
        throw new Error('Event or guest not found');
      }
      
      const invitationUrl = `${this.configService.get<string>('FRONTEND_URL')}/invitation/${guest.token}`;
      
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Vous êtes invité(e) !</h2>
          <p>Bonjour ${guest.name},</p>
          <p>${event.owner.first_name} ${event.owner.last_name} vous invite à ${event.title}.</p>
          <p>Date: ${new Date(event.date).toLocaleDateString('fr-FR')}</p>
          <p>Pour répondre à cette invitation, cliquez sur le lien ci-dessous :</p>
          <p><a href="${invitationUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Voir l'invitation</a></p>
          <p>À bientôt !</p>
        </div>
      `;
      
      await SendGrid.send({
        to: guest.email,
        from: this.configService.get<string>('EMAIL_FROM', 'noreply@e-motionnel.fr'),
        subject: `Invitation : ${event.title}`,
        html,
      });
      
      console.log(`Invitation sent to ${guest.email}`);
    } catch (error) {
      console.error('Error sending invitation:', error);
      throw error;
    }
  }

  @Process('send-reminder')
  async handleSendReminder(job: Job<any>): Promise<void> {
    const { eventId, type } = job.data;
    
    try {
      const event = await this.eventsRepository.findOne({
        where: { id: eventId },
        relations: ['guests'],
      });
      
      if (!event) {
        throw new Error('Event not found');
      }
      
      if (type === 'non-respondents') {
        // Envoyer des rappels aux invités qui n'ont pas répondu
        const nonRespondents = event.guests.filter(guest => guest.rsvp === 'pending' && guest.email);
        
        for (const guest of nonRespondents) {
          const invitationUrl = `${this.configService.get<string>('FRONTEND_URL')}/invitation/${guest.token}`;
          
          const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Rappel : Vous êtes invité(e) !</h2>
              <p>Bonjour ${guest.name},</p>
              <p>Nous n'avons pas encore reçu votre réponse pour l'événement "${event.title}" qui aura lieu le ${new Date(event.date).toLocaleDateString('fr-FR')}.</p>
              <p>Pour répondre à cette invitation, cliquez sur le lien ci-dessous :</p>
              <p><a href="${invitationUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Voir l'invitation</a></p>
              <p>À bientôt !</p>
            </div>
          `;
          
          await SendGrid.send({
            to: guest.email,
            from: this.configService.get<string>('EMAIL_FROM', 'noreply@e-motionnel.fr'),
            subject: `Rappel : ${event.title}`,
            html,
          });
          
          console.log(`Reminder sent to ${guest.email}`);
        }
      } else if (type === 'day-before') {
        // Envoyer un rappel J-1 avec carte Google Maps à tous les invités qui ont accepté
        const attendees = event.guests.filter(guest => guest.rsvp === 'yes' && guest.email);
        
        for (const guest of attendees) {
          const invitationUrl = `${this.configService.get<string>('FRONTEND_URL')}/invitation/${guest.token}`;
          
          // Générer le lien Google Maps si des coordonnées de localisation sont disponibles
          let mapsLink = '';
          if (event.location && event.location.address) {
            const encodedAddress = encodeURIComponent(event.location.address);
            mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
          }
          
          const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Rappel : ${event.title} - C'est demain !</h2>
              <p>Bonjour ${guest.name},</p>
              <p>Nous vous rappelons que l'événement "${event.title}" aura lieu demain, le ${new Date(event.date).toLocaleDateString('fr-FR')}.</p>
              ${mapsLink ? `<p>Pour vous y rendre : <a href="${mapsLink}" target="_blank">Voir sur Google Maps</a></p>` : ''}
              <p>Pour revoir les détails de l'invitation :</p>
              <p><a href="${invitationUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Voir l'invitation</a></p>
              <p>À demain !</p>
            </div>
          `;
          
          await SendGrid.send({
            to: guest.email,
            from: this.configService.get<string>('EMAIL_FROM', 'noreply@e-motionnel.fr'),
            subject: `Rappel : ${event.title} - C'est demain !`,
            html,
          });
          
          console.log(`Day-before reminder sent to ${guest.email}`);
        }
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
      throw error;
    }
  }

  @Process('send-thank-you')
  async handleSendThankYou(job: Job<any>): Promise<void> {
    const { eventId } = job.data;
    
    try {
      const event = await this.eventsRepository.findOne({
        where: { id: eventId },
        relations: ['guests', 'videos'],
      });
      
      if (!event) {
        throw new Error('Event not found');
      }
      
      // Envoyer un message de remerciement à tous les invités qui ont participé
      const attendees = event.guests.filter(guest => guest.rsvp === 'yes' && guest.email);
      
      // Vérifier s'il y a des vidéos approuvées
      const hasVideos = event.videos && event.videos.some(video => video.approved);
      
      for (const guest of attendees) {
        const invitationUrl = `${this.configService.get<string>('FRONTEND_URL')}/invitation/${guest.token}`;
        
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Merci pour votre présence !</h2>
            <p>Bonjour ${guest.name},</p>
            <p>Nous vous remercions d'avoir participé à l'événement "${event.title}".</p>
            ${hasVideos ? `<p>Un album photo et des vidéos souvenirs sont maintenant disponibles :</p>
            <p><a href="${invitationUrl}#memories" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Voir les souvenirs</a></p>` : ''}
            <p>À bientôt !</p>
          </div>
        `;
        
        await SendGrid.send({
          to: guest.email,
          from: this.configService.get<string>('EMAIL_FROM', 'noreply@e-motionnel.fr'),
          subject: `Merci pour votre présence à ${event.title}`,
          html,
        });
        
        console.log(`Thank you email sent to ${guest.email}`);
      }
    } catch (error) {
      console.error('Error sending thank you email:', error);
      throw error;
    }
  }
}
