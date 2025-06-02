import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Event } from '../events/entities/event.entity';
import { Guest } from '../guests/entities/guest.entity';
import { Video } from '../videos/entities/video.entity';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';

/**
 * Service responsable de la gestion des données personnelles et de la conformité RGPD
 */
@Injectable()
export class GdprService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
    private configService: ConfigService,
    private logger: LoggerService,
  ) {}

  /**
   * Exporte toutes les données personnelles d'un utilisateur (droit d'accès)
   * @param userId ID de l'utilisateur
   * @returns Objet contenant toutes les données personnelles de l'utilisateur
   */
  async exportUserData(userId: string): Promise<any> {
    this.logger.log(`Exportation des données pour l'utilisateur ${userId}`, 'GdprService');
    
    try {
      // Récupérer les données de l'utilisateur
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['events', 'events.guests', 'events.videos'],
      });

      if (!user) {
        throw new Error(`Utilisateur avec ID ${userId} non trouvé`);
      }

      // Préparer l'objet d'export en excluant les données sensibles
      const { password, refresh_token, ...userData } = user;

      // Récupérer les événements créés par l'utilisateur
      const events = await this.eventsRepository.find({
        where: { user: { id: userId } },
        relations: ['guests', 'videos'],
      });

      // Récupérer les invitations reçues par l'utilisateur
      const receivedInvitations = await this.guestsRepository.find({
        where: { email: user.email },
        relations: ['event', 'event.user'],
      });

      // Formater les données pour l'export
      const exportData = {
        user: userData,
        events: events.map(event => {
          const { user, ...eventData } = event;
          return {
            ...eventData,
            guests: event.guests.map(guest => {
              const { token, ...guestData } = guest;
              return guestData;
            }),
          };
        }),
        receivedInvitations: receivedInvitations.map(invitation => {
          const { token, ...invitationData } = invitation;
          const { user, ...eventData } = invitation.event;
          return {
            ...invitationData,
            event: {
              ...eventData,
              host: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
              },
            },
          };
        }),
      };

      return exportData;
    } catch (error) {
      this.logger.error(`Erreur lors de l'exportation des données: ${error.message}`, error.stack, 'GdprService');
      throw error;
    }
  }

  /**
   * Supprime toutes les données personnelles d'un utilisateur (droit à l'effacement)
   * @param userId ID de l'utilisateur
   * @returns Résultat de l'opération
   */
  async deleteUserData(userId: string): Promise<{ success: boolean; message: string }> {
    this.logger.log(`Suppression des données pour l'utilisateur ${userId}`, 'GdprService');
    
    try {
      // Récupérer l'utilisateur avec ses relations
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['events', 'events.guests', 'events.videos'],
      });

      if (!user) {
        throw new Error(`Utilisateur avec ID ${userId} non trouvé`);
      }

      // Supprimer les vidéos associées aux événements de l'utilisateur
      for (const event of user.events) {
        await this.videosRepository.delete({ event: { id: event.id } });
      }

      // Supprimer les invités associés aux événements de l'utilisateur
      for (const event of user.events) {
        await this.guestsRepository.delete({ event: { id: event.id } });
      }

      // Supprimer les événements de l'utilisateur
      await this.eventsRepository.delete({ user: { id: userId } });

      // Anonymiser les invitations reçues par l'utilisateur
      const receivedInvitations = await this.guestsRepository.find({
        where: { email: user.email },
      });

      for (const invitation of receivedInvitations) {
        await this.guestsRepository.update(invitation.id, {
          first_name: 'Anonyme',
          last_name: 'Anonyme',
          email: `anonyme-${Date.now()}@example.com`,
          phone: null,
          comment: null,
        });
      }

      // Supprimer l'utilisateur
      await this.usersRepository.delete(userId);

      return {
        success: true,
        message: `Toutes les données de l'utilisateur ${userId} ont été supprimées ou anonymisées avec succès.`,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la suppression des données: ${error.message}`, error.stack, 'GdprService');
      throw error;
    }
  }

  /**
   * Met à jour les données personnelles d'un utilisateur (droit de rectification)
   * @param userId ID de l'utilisateur
   * @param userData Nouvelles données de l'utilisateur
   * @returns Utilisateur mis à jour
   */
  async updateUserData(userId: string, userData: Partial<User>): Promise<User> {
    this.logger.log(`Mise à jour des données pour l'utilisateur ${userId}`, 'GdprService');
    
    try {
      // Vérifier que l'utilisateur existe
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`Utilisateur avec ID ${userId} non trouvé`);
      }

      // Mettre à jour les données de l'utilisateur
      await this.usersRepository.update(userId, userData);

      // Retourner l'utilisateur mis à jour
      return await this.usersRepository.findOne({
        where: { id: userId },
      });
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour des données: ${error.message}`, error.stack, 'GdprService');
      throw error;
    }
  }

  /**
   * Nettoie les données personnelles selon la politique de conservation
   * @returns Résultat de l'opération
   */
  async cleanupExpiredData(): Promise<{ success: boolean; message: string }> {
    this.logger.log('Nettoyage des données expirées', 'GdprService');
    
    try {
      const retentionPeriod = this.configService.get<number>('DATA_RETENTION_DAYS', 365);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionPeriod);

      // Trouver les événements expirés
      const expiredEvents = await this.eventsRepository.find({
        where: {
          date: cutoffDate.toISOString(),
        },
        relations: ['guests', 'videos'],
      });

      let deletedVideos = 0;
      let deletedGuests = 0;
      let deletedEvents = 0;

      // Supprimer les données associées aux événements expirés
      for (const event of expiredEvents) {
        // Supprimer les vidéos
        const videoResult = await this.videosRepository.delete({ event: { id: event.id } });
        deletedVideos += videoResult.affected || 0;

        // Supprimer les invités
        const guestResult = await this.guestsRepository.delete({ event: { id: event.id } });
        deletedGuests += guestResult.affected || 0;

        // Supprimer l'événement
        await this.eventsRepository.delete(event.id);
        deletedEvents++;
      }

      return {
        success: true,
        message: `Nettoyage terminé: ${deletedEvents} événements, ${deletedGuests} invités et ${deletedVideos} vidéos supprimés.`,
      };
    } catch (error) {
      this.logger.error(`Erreur lors du nettoyage des données: ${error.message}`, error.stack, 'GdprService');
      throw error;
    }
  }

  /**
   * Vérifie si un utilisateur a donné son consentement pour une finalité spécifique
   * @param userId ID de l'utilisateur
   * @param purpose Finalité du traitement
   * @returns Booléen indiquant si le consentement a été donné
   */
  async hasConsent(userId: string, purpose: string): Promise<boolean> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        select: ['consents'],
      });

      if (!user || !user.consents) {
        return false;
      }

      return user.consents.includes(purpose);
    } catch (error) {
      this.logger.error(`Erreur lors de la vérification du consentement: ${error.message}`, error.stack, 'GdprService');
      throw error;
    }
  }

  /**
   * Met à jour les consentements d'un utilisateur
   * @param userId ID de l'utilisateur
   * @param consents Liste des consentements
   * @returns Résultat de l'opération
   */
  async updateConsents(userId: string, consents: string[]): Promise<{ success: boolean; message: string }> {
    this.logger.log(`Mise à jour des consentements pour l'utilisateur ${userId}`, 'GdprService');
    
    try {
      await this.usersRepository.update(userId, { consents });

      return {
        success: true,
        message: 'Consentements mis à jour avec succès.',
      };
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour des consentements: ${error.message}`, error.stack, 'GdprService');
      throw error;
    }
  }
}
