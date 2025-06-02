import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Politique de confidentialité | e-motionnel</title>
        <meta name="description" content="Politique de confidentialité de la plateforme e-motionnel.fr" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              e-motionnel
            </Link>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">Politique de confidentialité</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Dernière mise à jour : 29 mai 2025</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6 prose prose-indigo max-w-none">
            <h2>Introduction</h2>
            <p>
              La présente Politique de confidentialité décrit comment e-motionnel.fr ("nous", "notre", "nos") collecte, utilise et partage vos informations personnelles lorsque vous utilisez notre service de création et de gestion d'invitations interactives.
            </p>
            <p>
              Nous accordons une grande importance à la protection de vos données personnelles et nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD) et toutes les lois applicables en matière de protection des données.
            </p>

            <h2>Informations que nous collectons</h2>
            <p>Nous collectons les types d'informations suivants :</p>
            <h3>Informations que vous nous fournissez</h3>
            <ul>
              <li>Informations d'identification : nom, prénom, adresse e-mail, numéro de téléphone</li>
              <li>Informations de compte : mot de passe (stocké de manière sécurisée et chiffrée)</li>
              <li>Contenu des invitations : titres, descriptions, dates, lieux, images, vidéos</li>
              <li>Informations sur les invités : noms, adresses e-mail, réponses RSVP, commentaires</li>
              <li>Vidéo-témoignages : enregistrements vidéo que vous ou vos invités créez</li>
              <li>Informations de paiement : pour les contributions et les fonctionnalités premium (traitées par notre partenaire de paiement Stripe)</li>
            </ul>

            <h3>Informations collectées automatiquement</h3>
            <ul>
              <li>Données d'utilisation : pages visitées, fonctionnalités utilisées, temps passé sur la plateforme</li>
              <li>Informations sur l'appareil : type d'appareil, système d'exploitation, navigateur</li>
              <li>Données de localisation : pays et région (basés sur l'adresse IP)</li>
              <li>Cookies et technologies similaires : pour maintenir votre session, mémoriser vos préférences et améliorer votre expérience</li>
            </ul>

            <h2>Comment nous utilisons vos informations</h2>
            <p>Nous utilisons vos informations personnelles pour :</p>
            <ul>
              <li>Fournir, maintenir et améliorer notre service</li>
              <li>Créer et gérer votre compte</li>
              <li>Traiter vos invitations et les réponses de vos invités</li>
              <li>Envoyer des notifications liées au service (confirmations, rappels, etc.)</li>
              <li>Répondre à vos demandes et vous fournir une assistance</li>
              <li>Prévenir les activités frauduleuses et assurer la sécurité</li>
              <li>Respecter nos obligations légales</li>
              <li>Avec votre consentement, vous envoyer des communications marketing (que vous pouvez désactiver à tout moment)</li>
            </ul>

            <h2>Base légale du traitement</h2>
            <p>Nous traitons vos données personnelles sur les bases légales suivantes :</p>
            <ul>
              <li><strong>Exécution d'un contrat</strong> : lorsque le traitement est nécessaire pour exécuter le contrat que nous avons conclu avec vous</li>
              <li><strong>Consentement</strong> : lorsque vous avez donné votre consentement explicite pour le traitement</li>
              <li><strong>Intérêts légitimes</strong> : lorsque le traitement est nécessaire pour nos intérêts légitimes, sans porter atteinte à vos droits et libertés</li>
              <li><strong>Obligation légale</strong> : lorsque le traitement est nécessaire pour respecter une obligation légale</li>
            </ul>

            <h2>Partage de vos informations</h2>
            <p>Nous ne vendons pas vos données personnelles. Nous partageons vos informations uniquement dans les cas suivants :</p>
            <ul>
              <li><strong>Avec les invités</strong> : les informations que vous incluez dans vos invitations sont partagées avec les personnes que vous invitez</li>
              <li><strong>Avec nos prestataires de services</strong> : qui nous aident à fournir notre service (hébergement, envoi d'emails, traitement des paiements)</li>
              <li><strong>Pour des raisons légales</strong> : si nécessaire pour respecter la loi, protéger nos droits ou la sécurité</li>
            </ul>

            <h2>Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales. Les données liées aux événements sont conservées pendant 365 jours après la date de l'événement, puis sont automatiquement supprimées ou anonymisées.
            </p>
            <p>
              Vous pouvez demander la suppression de vos données à tout moment via votre compte ou en nous contactant directement.
            </p>

            <h2>Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul>
              <li><strong>Droit d'accès</strong> : vous pouvez demander une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : vous pouvez demander la correction de données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : vous pouvez demander la suppression de vos données dans certaines circonstances</li>
              <li><strong>Droit à la limitation du traitement</strong> : vous pouvez demander de limiter l'utilisation de vos données</li>
              <li><strong>Droit à la portabilité</strong> : vous pouvez demander le transfert de vos données dans un format structuré</li>
              <li><strong>Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données dans certaines circonstances</li>
              <li><strong>Droit de retirer votre consentement</strong> : vous pouvez retirer votre consentement à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez accéder à votre compte, utiliser les fonctionnalités dédiées dans les paramètres, ou nous contacter à l'adresse privacy@e-motionnel.fr.
            </p>

            <h2>Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération et la destruction. Ces mesures comprennent :
            </p>
            <ul>
              <li>Le chiffrement des données sensibles (mots de passe, tokens)</li>
              <li>L'utilisation de connexions sécurisées (HTTPS/SSL)</li>
              <li>Des contrôles d'accès stricts pour nos employés</li>
              <li>Des audits de sécurité réguliers</li>
              <li>Des sauvegardes régulières</li>
            </ul>

            <h2>Transferts internationaux de données</h2>
            <p>
              Nos serveurs sont situés dans l'Union européenne. Cependant, certains de nos prestataires de services peuvent être situés en dehors de l'UE. Dans ce cas, nous nous assurons que des garanties appropriées sont en place pour protéger vos données, conformément aux exigences du RGPD.
            </p>

            <h2>Cookies et technologies similaires</h2>
            <p>
              Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre plateforme. Vous pouvez gérer vos préférences concernant les cookies via notre bannière de cookies ou les paramètres de votre navigateur.
            </p>

            <h2>Enfants</h2>
            <p>
              Notre service n'est pas destiné aux personnes de moins de 16 ans. Nous ne collectons pas sciemment des données personnelles concernant des enfants de moins de 16 ans. Si vous êtes un parent ou un tuteur et que vous pensez que votre enfant nous a fourni des données personnelles, veuillez nous contacter.
            </p>

            <h2>Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. La version la plus récente sera toujours disponible sur notre site web, avec la date de la dernière mise à jour. Nous vous informerons de tout changement important par e-mail ou par une notification sur notre plateforme.
            </p>

            <h2>Nous contacter</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de protection des données, veuillez nous contacter à :
            </p>
            <p>
              E-mail : privacy@e-motionnel.fr<br />
              Adresse : 123 Avenue de la Protection des Données, 75000 Paris, France
            </p>
            <p>
              Vous avez également le droit de déposer une plainte auprès de l'autorité de protection des données compétente si vous estimez que le traitement de vos données personnelles enfreint les lois applicables.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                Accueil
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-500">
                Conditions d'utilisation
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
                Politique de confidentialité
              </Link>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-400">
                &copy; {new Date().getFullYear()} e-motionnel. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
