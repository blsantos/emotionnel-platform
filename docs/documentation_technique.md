# Documentation Technique - e-motionnel.fr

Cette documentation technique détaille l'architecture, les composants et le fonctionnement de la plateforme e-motionnel.fr.

## Architecture globale

La plateforme e-motionnel.fr est construite selon une architecture moderne en microservices, utilisant Docker pour la conteneurisation et l'isolation des différents composants.

### Schéma d'architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client (Web)   │────▶│  Nginx (Proxy)  │────▶│  Frontend       │
│                 │     │                 │     │  (Next.js)      │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │                        │
                                 │                        │
                                 ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │                 │     │                 │
                        │  API (NestJS)   │◀───▶│  Worker         │
                        │                 │     │  (BullMQ)       │
                        └────────┬────────┘     └────────┬────────┘
                                 │                       │
                                 │                       │
         ┌───────────────────────┼───────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  PostgreSQL     │     │  Redis          │     │  Storage        │
│  (Database)     │     │  (Cache/Queue)  │     │  (Files)        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Composants principaux

1. **Frontend (Next.js)** : Application web responsive utilisant React et Next.js
2. **Backend API (NestJS)** : API RESTful et GraphQL pour la logique métier
3. **Worker (NestJS + BullMQ)** : Traitement asynchrone des tâches (emails, vidéos)
4. **Base de données (PostgreSQL)** : Stockage relationnel des données
5. **Cache et files d'attente (Redis)** : Gestion des sessions, cache et files d'attente
6. **Stockage de fichiers** : Système de fichiers pour les médias uploadés
7. **Proxy inverse (Nginx)** : Routage, SSL et sécurité

## Technologies utilisées

### Frontend
- **Next.js** : Framework React pour le rendu côté serveur et statique
- **TypeScript** : Typage statique pour JavaScript
- **Tailwind CSS** : Framework CSS utilitaire
- **Framer Motion** : Animations fluides
- **Apollo Client** : Client GraphQL
- **React Hook Form** : Gestion des formulaires

### Backend
- **NestJS** : Framework Node.js pour les applications serveur
- **TypeScript** : Typage statique pour JavaScript
- **TypeORM** : ORM pour la gestion de la base de données
- **GraphQL** : API pour les requêtes complexes
- **REST API** : Endpoints RESTful pour les opérations CRUD
- **JWT** : Authentification basée sur les tokens
- **BullMQ** : Gestion des files d'attente et des tâches asynchrones
- **SendGrid** : Service d'envoi d'emails

### Infrastructure
- **Docker** : Conteneurisation des services
- **Docker Compose** : Orchestration des conteneurs
- **Nginx** : Serveur web et proxy inverse
- **PostgreSQL** : Base de données relationnelle
- **Redis** : Cache et files d'attente
- **Let's Encrypt** : Certificats SSL

## Structure de la base de données

### Schéma des tables principales

#### Users
| Colonne       | Type         | Description                           |
|---------------|--------------|---------------------------------------|
| id            | UUID         | Identifiant unique                    |
| email         | VARCHAR(255) | Adresse email (unique)                |
| password      | VARCHAR(255) | Mot de passe hashé                    |
| first_name    | VARCHAR(100) | Prénom                                |
| last_name     | VARCHAR(100) | Nom                                   |
| refresh_token | VARCHAR(255) | Token de rafraîchissement             |
| is_premium    | BOOLEAN      | Statut premium                        |
| created_at    | TIMESTAMP    | Date de création                      |
| updated_at    | TIMESTAMP    | Date de mise à jour                   |
| consents      | TEXT[]       | Liste des consentements               |

#### Events
| Colonne       | Type         | Description                           |
|---------------|--------------|---------------------------------------|
| id            | UUID         | Identifiant unique                    |
| user_id       | UUID         | Référence à l'utilisateur créateur    |
| title         | VARCHAR(255) | Titre de l'événement                  |
| description   | TEXT         | Description                           |
| date          | TIMESTAMP    | Date et heure de l'événement          |
| end_date      | TIMESTAMP    | Date et heure de fin (optionnel)      |
| location      | JSONB        | Informations sur le lieu              |
| template_id   | UUID         | Référence au template utilisé         |
| custom_colors | JSONB        | Couleurs personnalisées               |
| custom_text   | JSONB        | Textes personnalisés                  |
| status        | VARCHAR(50)  | Statut (draft, sent, closed)          |
| created_at    | TIMESTAMP    | Date de création                      |
| updated_at    | TIMESTAMP    | Date de mise à jour                   |

#### Guests
| Colonne       | Type         | Description                           |
|---------------|--------------|---------------------------------------|
| id            | UUID         | Identifiant unique                    |
| event_id      | UUID         | Référence à l'événement               |
| email         | VARCHAR(255) | Adresse email                         |
| first_name    | VARCHAR(100) | Prénom                                |
| last_name     | VARCHAR(100) | Nom                                   |
| phone         | VARCHAR(50)  | Numéro de téléphone (optionnel)       |
| status        | VARCHAR(50)  | Statut RSVP (pending, yes, no, maybe) |
| token         | VARCHAR(255) | Token unique pour l'invitation        |
| comment       | TEXT         | Commentaire (optionnel)               |
| contribution  | DECIMAL      | Contribution financière (optionnel)   |
| created_at    | TIMESTAMP    | Date de création                      |
| updated_at    | TIMESTAMP    | Date de mise à jour                   |

#### Templates
| Colonne          | Type         | Description                           |
|------------------|--------------|---------------------------------------|
| id               | UUID         | Identifiant unique                    |
| name             | VARCHAR(100) | Nom du template                       |
| description      | TEXT         | Description                           |
| thumbnail_url    | VARCHAR(255) | URL de la miniature                   |
| html_template    | TEXT         | Template HTML                         |
| css_template     | TEXT         | Styles CSS                            |
| is_premium       | BOOLEAN      | Statut premium                        |
| animation_url    | VARCHAR(255) | URL de l'animation (optionnel)        |
| animation_type   | VARCHAR(50)  | Type d'animation (lottie, video)      |
| created_at       | TIMESTAMP    | Date de création                      |
| updated_at       | TIMESTAMP    | Date de mise à jour                   |

#### Videos
| Colonne       | Type         | Description                           |
|---------------|--------------|---------------------------------------|
| id            | UUID         | Identifiant unique                    |
| event_id      | UUID         | Référence à l'événement               |
| guest_id      | UUID         | Référence à l'invité (optionnel)      |
| file_path     | VARCHAR(255) | Chemin du fichier                     |
| duration      | INTEGER      | Durée en secondes                     |
| status        | VARCHAR(50)  | Statut (processing, ready, error)     |
| created_at    | TIMESTAMP    | Date de création                      |
| updated_at    | TIMESTAMP    | Date de mise à jour                   |

## API

### Authentification

L'API utilise l'authentification JWT (JSON Web Token) pour sécuriser les endpoints.

#### Endpoints d'authentification

- `POST /api/auth/register` : Inscription d'un nouvel utilisateur
- `POST /api/auth/login` : Connexion d'un utilisateur
- `POST /api/auth/refresh` : Rafraîchissement du token d'accès
- `POST /api/auth/logout` : Déconnexion
- `GET /api/auth/google` : Authentification via Google OAuth
- `GET /api/auth/google/callback` : Callback pour l'authentification Google

### API REST

#### Utilisateurs
- `GET /api/users/me` : Récupérer les informations de l'utilisateur connecté
- `PUT /api/users/me` : Mettre à jour les informations de l'utilisateur connecté

#### Événements
- `GET /api/events` : Récupérer tous les événements de l'utilisateur
- `GET /api/events/:id` : Récupérer un événement spécifique
- `POST /api/events` : Créer un nouvel événement
- `PUT /api/events/:id` : Mettre à jour un événement
- `DELETE /api/events/:id` : Supprimer un événement

#### Invités
- `GET /api/events/:eventId/guests` : Récupérer tous les invités d'un événement
- `POST /api/events/:eventId/guests` : Ajouter un invité à un événement
- `PUT /api/events/:eventId/guests/:id` : Mettre à jour un invité
- `DELETE /api/events/:eventId/guests/:id` : Supprimer un invité

#### RSVP
- `GET /api/rsvp/:token` : Récupérer les informations d'une invitation
- `POST /api/rsvp/:token` : Répondre à une invitation

#### Templates
- `GET /api/templates` : Récupérer tous les templates disponibles
- `GET /api/templates/:id` : Récupérer un template spécifique

#### Vidéos
- `GET /api/events/:eventId/videos` : Récupérer toutes les vidéos d'un événement
- `POST /api/events/:eventId/videos` : Uploader une nouvelle vidéo
- `DELETE /api/events/:eventId/videos/:id` : Supprimer une vidéo

#### GDPR
- `GET /api/gdpr/export` : Exporter toutes les données personnelles
- `DELETE /api/gdpr/delete` : Supprimer le compte et toutes les données associées
- `PUT /api/gdpr/update` : Mettre à jour les données personnelles
- `PUT /api/gdpr/consents` : Mettre à jour les consentements
- `GET /api/gdpr/consents/:purpose` : Vérifier un consentement spécifique

### API GraphQL

L'API GraphQL est disponible à l'endpoint `/api/graphql` et permet des requêtes plus complexes et optimisées.

#### Exemples de requêtes GraphQL

Récupérer un événement avec ses invités et leurs réponses :

```graphql
query {
  event(id: "event-id") {
    id
    title
    date
    location {
      address
      city
      postal_code
    }
    guests {
      id
      first_name
      last_name
      email
      status
    }
  }
}
```

## Sécurité

### Mesures de sécurité implémentées

1. **Protection contre les injections SQL** : Utilisation de TypeORM avec des requêtes paramétrées
2. **Protection XSS** : Échappement des données utilisateur, Content Security Policy
3. **Protection CSRF** : Tokens CSRF pour les formulaires
4. **Rate Limiting** : Limitation du nombre de requêtes par IP
5. **Validation des entrées** : Validation côté serveur de toutes les entrées utilisateur
6. **Hachage des mots de passe** : Utilisation de bcrypt pour le hachage des mots de passe
7. **HTTPS** : Toutes les communications sont chiffrées via SSL/TLS
8. **Headers de sécurité** : Configuration Helmet pour les en-têtes HTTP de sécurité
9. **Gestion des sessions** : Sessions sécurisées avec cookies HttpOnly et Secure
10. **Journalisation** : Journalisation des événements de sécurité

## Conformité RGPD

### Fonctionnalités RGPD implémentées

1. **Consentement explicite** : Recueil et gestion des consentements
2. **Droit d'accès** : Export des données personnelles
3. **Droit à l'effacement** : Suppression du compte et des données associées
4. **Droit de rectification** : Modification des données personnelles
5. **Limitation de la conservation** : Suppression automatique des données après une période définie
6. **Minimisation des données** : Collecte uniquement des données nécessaires
7. **Transparence** : Politique de confidentialité claire et accessible
8. **Sécurité des données** : Mesures techniques et organisationnelles appropriées

## Processus asynchrones

### Files d'attente et tâches en arrière-plan

La plateforme utilise BullMQ avec Redis pour gérer les tâches asynchrones :

1. **Envoi d'emails** : Invitations, rappels, notifications
2. **Traitement des vidéos** : Compression, conversion de format
3. **Nettoyage des données** : Suppression des données expirées
4. **Génération de rapports** : Statistiques et analyses

### Exemple de configuration d'une file d'attente

```typescript
// Configuration de la file d'attente pour l'envoi d'emails
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
  ],
  providers: [MailProcessor],
  exports: [BullModule],
})
export class MailQueueModule {}
```

## Configuration et déploiement

### Variables d'environnement

La plateforme utilise des variables d'environnement pour la configuration. Voici les principales variables :

```
# Configuration générale
NODE_ENV=production
PORT=4000
DOMAIN=e-motionnel.fr

# Base de données
POSTGRES_HOST=db
POSTGRES_PORT=5433
POSTGRES_USER=emotionnel
POSTGRES_PASSWORD=password
POSTGRES_DB=emotionnel

# JWT
JWT_SECRET=secret
JWT_EXPIRATION=1d
JWT_REFRESH_EXPIRATION=7d

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=password

# Email (SendGrid)
SENDGRID_API_KEY=key
EMAIL_FROM=noreply@e-motionnel.fr

# OAuth
GOOGLE_CLIENT_ID=client_id
GOOGLE_CLIENT_SECRET=client_secret
GOOGLE_CALLBACK_URL=https://e-motionnel.fr/api/auth/google/callback

# RGPD
DATA_RETENTION_DAYS=365
```

### Docker Compose

Le fichier `docker-compose.yml` définit tous les services nécessaires au fonctionnement de la plateforme :

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf:/etc/nginx/conf.d
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - web
      - api
    restart: always

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
    depends_on:
      - api
    restart: always

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5433
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis
    restart: always

  worker:
    build:
      context: ./api
      dockerfile: Dockerfile.worker
    environment:
      - NODE_ENV=production
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5433
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis
    restart: always

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=emotionnel
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=emotionnel
    ports:
      - "5433:5432"
    volumes:
      - ./db/data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    restart: always

  redis:
    image: redis:alpine
    command: redis-server --requirepass password
    volumes:
      - ./redis/data:/data
    restart: always
```

## Maintenance et surveillance

### Journalisation

La plateforme utilise un service de journalisation personnalisé pour enregistrer les événements importants :

```typescript
@Injectable()
export class LoggerService {
  private logger = new Logger('e-motionnel');

  log(message: string, context?: string) {
    this.logger.log(message, context);
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context);
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, context);
  }
}
```

### Sauvegardes

Un script de sauvegarde automatique est configuré pour exécuter quotidiennement :

1. Sauvegarde de la base de données PostgreSQL
2. Sauvegarde des fichiers de stockage
3. Rotation des sauvegardes (conservation pendant 30 jours)

## Extension et personnalisation

### Ajout de nouveaux templates

Pour ajouter un nouveau template :

1. Créer les fichiers HTML et CSS du template
2. Ajouter une miniature pour la prévisualisation
3. Insérer les données dans la table `templates`
4. Mettre à jour le frontend pour afficher le nouveau template

### Intégration de nouveaux services

La plateforme est conçue pour être facilement extensible. Pour ajouter un nouveau service :

1. Créer un nouveau module NestJS
2. Implémenter les interfaces nécessaires
3. Ajouter le module au module principal
4. Mettre à jour le frontend pour utiliser le nouveau service

## Résolution des problèmes courants

### Problèmes de connexion à la base de données

Vérifier :
- Les identifiants de connexion dans les variables d'environnement
- L'accessibilité du serveur PostgreSQL
- Les logs du conteneur de la base de données

### Problèmes d'envoi d'emails

Vérifier :
- La clé API SendGrid
- Les logs du worker
- La file d'attente des emails dans Redis

### Problèmes de performance

Vérifier :
- L'utilisation des ressources (CPU, mémoire)
- Les requêtes lentes dans la base de données
- Le cache Redis

## Ressources additionnelles

- [Documentation NestJS](https://docs.nestjs.com/)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation TypeORM](https://typeorm.io/)
- [Documentation BullMQ](https://docs.bullmq.io/)
- [Documentation SendGrid](https://docs.sendgrid.com/)
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Nginx](https://nginx.org/en/docs/)
