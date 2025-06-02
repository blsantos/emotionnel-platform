// Fichier de configuration pour Next.js
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['e-motionnel.fr', 'api.e-motionnel.fr', 'storage.e-motionnel.fr'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
