import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Head>
        <title>e-motionnel | Invitations interactives</title>
        <meta name="description" content="Créez, envoyez et suivez des invitations motionnelles interactives pour vos événements" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">e-motionnel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Connexion
            </Link>
            <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Des invitations <span className="text-indigo-600">motionnelles</span> qui marquent les esprits
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Créez, envoyez et suivez des invitations interactives pour tous vos événements : anniversaires, mariages, baptêmes, apéros et plus encore.
              </p>
              <div className="mt-8">
                <Link href="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors inline-block">
                  Créer mon invitation
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-indigo-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-indigo-600 font-medium">Animation de démonstration</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Comment ça fonctionne</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Créez des invitations interactives en quelques étapes simples
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-900">Choisissez un template</h3>
                <p className="mt-2 text-gray-600">Sélectionnez parmi nos nombreux templates animés pour tous types d'événements.</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-900">Personnalisez</h3>
                <p className="mt-2 text-gray-600">Ajoutez vos textes, photos et détails de l'événement avec notre éditeur intuitif.</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-900">Envoyez et suivez</h3>
                <p className="mt-2 text-gray-600">Partagez par email ou message et suivez les réponses en temps réel.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Fonctionnalités</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour créer des invitations mémorables
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Templates animés</h3>
                <p className="mt-2 text-gray-600">Des animations Lottie et MP4 pour tous types d'événements.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Éditeur WYSIWYG</h3>
                <p className="mt-2 text-gray-600">Personnalisez facilement avec notre éditeur drag-and-drop.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Gestion RSVP</h3>
                <p className="mt-2 text-gray-600">Suivez les réponses, commentaires et contributions.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Vidéo-témoignages</h3>
                <p className="mt-2 text-gray-600">Permettez à vos invités de laisser des messages vidéo.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Automatisations</h3>
                <p className="mt-2 text-gray-600">Relances, rappels et remerciements automatiques.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Partage facile</h3>
                <p className="mt-2 text-gray-600">Email, lien URL, QR Code et partage direct sur les réseaux sociaux.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Prêt à créer votre invitation ?</h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui créent des invitations mémorables
            </p>
            <div className="mt-8">
              <Link href="/register" className="bg-white text-indigo-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-50 transition-colors inline-block">
                Commencer gratuitement
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">e-motionnel</h3>
              <p className="mt-2 text-gray-600">Des invitations interactives qui marquent les esprits.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Produit</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/features" className="text-gray-600 hover:text-gray-900">Fonctionnalités</Link></li>
                <li><Link href="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900">Tarifs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/help" className="text-gray-600 hover:text-gray-900">Centre d'aide</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Légal</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Confidentialité</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Conditions d'utilisation</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-gray-500 text-sm text-center">&copy; {new Date().getFullYear()} e-motionnel. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
