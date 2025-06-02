# Guide de déploiement - e-motionnel.fr

Ce guide détaille les étapes nécessaires pour déployer la plateforme e-motionnel.fr sur un serveur VPS Hostinger.

## Prérequis

- Un VPS Hostinger avec au moins 2 Go de RAM et 2 cœurs CPU
- Ubuntu 20.04 LTS ou plus récent
- Accès root au serveur
- Un nom de domaine configuré pour pointer vers votre serveur
- Docker et Docker Compose installés

## 1. Installation des dépendances

Connectez-vous à votre serveur VPS via SSH :

```bash
ssh root@votre-ip-serveur
```

Mettez à jour le système :

```bash
apt update && apt upgrade -y
```

Installez Docker et Docker Compose :

```bash
# Installation de Docker
apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt update
apt install -y docker-ce docker-ce-cli containerd.io

# Installation de Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Vérification des installations
docker --version
docker-compose --version
```

## 2. Configuration du pare-feu

Configurez le pare-feu pour autoriser le trafic HTTP, HTTPS et SSH :

```bash
apt install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

## 3. Installation de Certbot pour les certificats SSL

```bash
apt install -y certbot python3-certbot-nginx
```

## 4. Préparation du répertoire de déploiement

```bash
mkdir -p /opt/e-motionnel
cd /opt/e-motionnel
```

## 5. Téléchargement et extraction des fichiers

Téléchargez l'archive du projet sur votre serveur :

```bash
# Remplacez l'URL par celle fournie pour télécharger l'archive
wget https://url-de-votre-archive.zip -O e-motionnel.zip
apt install -y unzip
unzip e-motionnel.zip -d .
rm e-motionnel.zip
```

## 6. Configuration des variables d'environnement

Créez les fichiers d'environnement nécessaires :

```bash
cd /opt/e-motionnel
cp .env.example .env
```

Éditez le fichier `.env` pour configurer les variables d'environnement :

```bash
nano .env
```

Modifiez les valeurs suivantes :

```
# Configuration générale
NODE_ENV=production
DOMAIN=votre-domaine.fr

# Base de données
POSTGRES_USER=emotionnel
POSTGRES_PASSWORD=votre-mot-de-passe-securise
POSTGRES_DB=emotionnel
POSTGRES_PORT=5433

# JWT
JWT_SECRET=votre-secret-jwt-tres-securise
JWT_EXPIRATION=1d
JWT_REFRESH_EXPIRATION=7d

# Email (SendGrid)
SENDGRID_API_KEY=votre-cle-api-sendgrid
EMAIL_FROM=noreply@votre-domaine.fr

# Stockage
STORAGE_PATH=/data/storage

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=votre-mot-de-passe-redis-securise
```

## 7. Génération des certificats SSL

Obtenez un certificat SSL pour votre domaine :

```bash
certbot certonly --standalone -d votre-domaine.fr -d www.votre-domaine.fr
```

## 8. Configuration de Nginx

Modifiez le fichier de configuration Nginx :

```bash
cd /opt/e-motionnel/nginx/conf
nano e-motionnel.conf
```

Remplacez `e-motionnel.fr` par votre domaine et assurez-vous que les chemins des certificats SSL sont corrects :

```nginx
server {
    listen 80;
    server_name votre-domaine.fr www.votre-domaine.fr;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votre-domaine.fr www.votre-domaine.fr;

    ssl_certificate /etc/letsencrypt/live/votre-domaine.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.fr/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/votre-domaine.fr/chain.pem;

    # Autres configurations SSL...

    location / {
        proxy_pass http://web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api {
        proxy_pass http://api:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /socket.io {
        proxy_pass http://api:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 9. Modification du docker-compose.yml

Assurez-vous que les volumes pour les certificats SSL sont correctement configurés :

```bash
cd /opt/e-motionnel
nano docker-compose.yml
```

Ajoutez les volumes pour les certificats SSL dans le service nginx :

```yaml
services:
  nginx:
    # ...
    volumes:
      - ./nginx/conf:/etc/nginx/conf.d
      - /etc/letsencrypt:/etc/letsencrypt:ro
      # ...
```

## 10. Démarrage des services

Lancez les services avec Docker Compose :

```bash
cd /opt/e-motionnel
docker-compose up -d
```

Vérifiez que tous les conteneurs sont en cours d'exécution :

```bash
docker-compose ps
```

## 11. Initialisation de la base de données

Si nécessaire, exécutez les migrations de base de données :

```bash
docker-compose exec api npm run migration:run
```

## 12. Configuration du renouvellement automatique des certificats SSL

Créez un script pour renouveler les certificats et redémarrer Nginx :

```bash
nano /opt/renew-certs.sh
```

Ajoutez le contenu suivant :

```bash
#!/bin/bash
certbot renew --quiet
docker-compose -f /opt/e-motionnel/docker-compose.yml restart nginx
```

Rendez le script exécutable :

```bash
chmod +x /opt/renew-certs.sh
```

Ajoutez une tâche cron pour exécuter le script tous les mois :

```bash
crontab -e
```

Ajoutez la ligne suivante :

```
0 0 1 * * /opt/renew-certs.sh
```

## 13. Configuration des sauvegardes automatiques

Créez un script de sauvegarde :

```bash
nano /opt/backup-emotionnel.sh
```

Ajoutez le contenu suivant :

```bash
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/opt/backups"
mkdir -p $BACKUP_DIR

# Sauvegarde de la base de données
docker-compose -f /opt/e-motionnel/docker-compose.yml exec -T db pg_dump -U emotionnel emotionnel > $BACKUP_DIR/emotionnel_db_$TIMESTAMP.sql

# Sauvegarde des fichiers de stockage
tar -czf $BACKUP_DIR/emotionnel_storage_$TIMESTAMP.tar.gz -C /opt/e-motionnel/data/storage .

# Suppression des sauvegardes de plus de 30 jours
find $BACKUP_DIR -name "emotionnel_*" -type f -mtime +30 -delete
```

Rendez le script exécutable :

```bash
chmod +x /opt/backup-emotionnel.sh
```

Ajoutez une tâche cron pour exécuter le script tous les jours à 2h du matin :

```bash
crontab -e
```

Ajoutez la ligne suivante :

```
0 2 * * * /opt/backup-emotionnel.sh
```

## 14. Vérification du déploiement

Accédez à votre domaine dans un navigateur web pour vérifier que la plateforme fonctionne correctement :

```
https://votre-domaine.fr
```

## 15. Surveillance et maintenance

### Surveillance des logs

Pour consulter les logs des conteneurs :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml logs -f
```

Pour consulter les logs d'un service spécifique :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml logs -f api
```

### Redémarrage des services

Pour redémarrer tous les services :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml restart
```

Pour redémarrer un service spécifique :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml restart api
```

### Mise à jour de la plateforme

Pour mettre à jour la plateforme avec une nouvelle version :

```bash
cd /opt/e-motionnel
git pull  # Si vous utilisez Git pour gérer les mises à jour
docker-compose down
docker-compose build --no-cache  # Reconstruire les images
docker-compose up -d
```

## Résolution des problèmes courants

### Les conteneurs ne démarrent pas

Vérifiez les logs pour identifier le problème :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml logs
```

### Problèmes de connexion à la base de données

Vérifiez que le conteneur de la base de données est en cours d'exécution :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml ps db
```

Vérifiez les logs de la base de données :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml logs db
```

### Problèmes avec Nginx

Vérifiez la configuration Nginx :

```bash
docker-compose -f /opt/e-motionnel/docker-compose.yml exec nginx nginx -t
```

## Support

Pour toute assistance supplémentaire, veuillez contacter le support technique à l'adresse support@e-motionnel.fr.
