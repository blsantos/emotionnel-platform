import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';

/**
 * Configure les mesures de sécurité pour l'application NestJS
 * @param app Instance de l'application NestJS
 * @param config Service de configuration
 */
export function configureSecurityMiddleware(
  app: INestApplication,
  config: ConfigService,
): void {
  // Protection contre les vulnérabilités web courantes
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'blob:'],
          connectSrc: ["'self'", 'https://api.sendgrid.com', 'https://api.stripe.com'],
          mediaSrc: ["'self'", 'blob:'],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // Parser pour les cookies
  app.use(cookieParser(config.get('COOKIE_SECRET')));

  // Protection CSRF pour les routes non-API
  if (config.get('NODE_ENV') === 'production') {
    app.use(
      /^(?!\/api)/,
      csurf({
        cookie: {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        },
      }),
    );
  }

  // Limitation de débit pour prévenir les attaques par force brute
  app.use(
    '/api/auth',
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limite chaque IP à 100 requêtes par fenêtre
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Limitation de débit plus stricte pour les tentatives de connexion
  app.use(
    '/api/auth/login',
    rateLimit({
      windowMs: 60 * 60 * 1000, // 1 heure
      max: 10, // limite chaque IP à 10 requêtes par fenêtre
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Limitation de débit pour les requêtes API générales
  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 300, // limite chaque IP à 300 requêtes par fenêtre
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
}
