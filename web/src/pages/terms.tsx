import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Conditions d'utilisation | e-motionnel</title>
        <meta name="description" content="Conditions d'utilisation de la plateforme e-motionnel.fr" />
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
            <h1 className="text-2xl font-bold text-gray-900">Conditions Générales d'Utilisation</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Dernière mise à jour : 29 mai 2025</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6 prose prose-indigo max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Bienvenue sur e-motionnel.fr (ci-après "la Plateforme"), un service en ligne permettant de créer, envoyer et suivre des invitations interactives pour divers événements. Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation de la Plateforme et constituent un accord juridiquement contraignant entre vous et e-motionnel.fr (ci-après "nous", "notre", "nos").
            </p>
            <p>
              En utilisant notre Plateforme, vous acceptez d'être lié par les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre Plateforme.
            </p>

            <h2>2. Définitions</h2>
            <ul>
              <li><strong>Utilisateur</strong> : toute personne qui accède à la Plateforme et l'utilise.</li>
              <li><strong>Compte</strong> : espace personnel créé par l'Utilisateur sur la Plateforme.</li>
              <li><strong>Contenu</strong> : textes, images, vidéos, sons et autres éléments que l'Utilisateur téléverse, publie ou partage sur la Plateforme.</li>
              <li><strong>Invitation</strong> : document électronique créé par l'Utilisateur pour inviter des personnes à un événement.</li>
              <li><strong>Services</strong> : ensemble des fonctionnalités proposées par la Plateforme.</li>
            </ul>

            <h2>3. Inscription et compte</h2>
            <h3>3.1 Création de compte</h3>
            <p>
              Pour utiliser pleinement notre Plateforme, vous devez créer un compte. Lors de l'inscription, vous vous engagez à fournir des informations exactes, complètes et à jour. Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités effectuées depuis votre compte.
            </p>

            <h3>3.2 Âge minimum</h3>
            <p>
              Vous devez être âgé d'au moins 16 ans pour créer un compte et utiliser nos Services. Si vous avez moins de 18 ans, vous déclarez avoir obtenu le consentement d'un parent ou d'un tuteur légal.
            </p>

            <h3>3.3 Sécurité du compte</h3>
            <p>
              Vous êtes responsable de maintenir la confidentialité de votre mot de passe et de nous informer immédiatement de toute utilisation non autorisée de votre compte ou de toute autre violation de sécurité.
            </p>

            <h2>4. Utilisation des Services</h2>
            <h3>4.1 Licence d'utilisation</h3>
            <p>
              Nous vous accordons une licence limitée, non exclusive, non transférable et révocable pour accéder à la Plateforme et utiliser nos Services conformément aux présentes CGU.
            </p>

            <h3>4.2 Restrictions d'utilisation</h3>
            <p>
              En utilisant notre Plateforme, vous vous engagez à ne pas :
            </p>
            <ul>
              <li>Utiliser la Plateforme d'une manière qui pourrait endommager, désactiver, surcharger ou compromettre nos systèmes</li>
              <li>Utiliser des robots, des scrapers ou d'autres moyens automatisés pour accéder à la Plateforme</li>
              <li>Collecter ou récolter des données personnelles d'autres Utilisateurs</li>
              <li>Utiliser la Plateforme à des fins illégales ou non autorisées</li>
              <li>Transmettre des virus, des vers informatiques ou tout autre code de nature destructive</li>
              <li>Interférer avec ou perturber l'intégrité ou la performance de la Plateforme</li>
            </ul>

            <h3>4.3 Contenu de l'Utilisateur</h3>
            <p>
              Vous conservez tous les droits sur le Contenu que vous publiez sur la Plateforme. En publiant du Contenu, vous nous accordez une licence mondiale, non exclusive, gratuite, transférable et pouvant faire l'objet d'une sous-licence pour utiliser, reproduire, modifier, adapter, publier, traduire et distribuer ce Contenu dans le cadre de la fourniture de nos Services.
            </p>
            <p>
              Vous déclarez et garantissez que :
            </p>
            <ul>
              <li>Vous possédez ou avez obtenu tous les droits nécessaires pour le Contenu que vous publiez</li>
              <li>Le Contenu ne viole pas les droits de tiers, y compris les droits de propriété intellectuelle et les droits à la vie privée</li>
              <li>Le Contenu n'est pas illégal, obscène, diffamatoire, menaçant, pornographique, harcelant, haineux ou autrement répréhensible</li>
            </ul>

            <h3>4.4 Contenu interdit</h3>
            <p>
              Vous vous engagez à ne pas publier de Contenu qui :
            </p>
            <ul>
              <li>Est illégal ou promeut des activités illégales</li>
              <li>Est diffamatoire, obscène, pornographique ou sexuellement explicite</li>
              <li>Constitue du harcèlement, de l'intimidation ou de la discrimination</li>
              <li>Viole les droits de propriété intellectuelle d'autrui</li>
              <li>Contient des virus ou autres codes malveillants</li>
              <li>Interfère avec le fonctionnement normal de la Plateforme</li>
            </ul>

            <h2>5. Abonnements et paiements</h2>
            <h3>5.1 Offres et tarifs</h3>
            <p>
              Nous proposons différentes formules d'abonnement, dont certaines sont gratuites et d'autres payantes. Les détails de ces offres sont disponibles sur notre Plateforme. Nous nous réservons le droit de modifier nos tarifs à tout moment, sous réserve de vous en informer préalablement.
            </p>

            <h3>5.2 Paiements</h3>
            <p>
              Les paiements sont traités par notre partenaire de paiement Stripe. En souscrivant à une offre payante, vous acceptez les conditions générales de Stripe. Vous vous engagez à fournir des informations de paiement exactes et à jour.
            </p>

            <h3>5.3 Renouvellement et annulation</h3>
            <p>
              Les abonnements payants sont renouvelés automatiquement, sauf si vous les annulez avant la date de renouvellement. Vous pouvez annuler votre abonnement à tout moment depuis votre compte. L'annulation prendra effet à la fin de la période d'abonnement en cours.
            </p>

            <h2>6. Propriété intellectuelle</h2>
            <h3>6.1 Nos droits</h3>
            <p>
              La Plateforme et son contenu original, ses fonctionnalités et sa conception sont la propriété exclusive d'e-motionnel.fr et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. Tous les droits non expressément accordés sont réservés.
            </p>

            <h3>6.2 Marques</h3>
            <p>
              Le nom "e-motionnel", le logo et tous les noms, logos, icônes et marques associés sont des marques commerciales d'e-motionnel.fr. Vous ne pouvez pas les utiliser sans notre autorisation écrite préalable.
            </p>

            <h3>6.3 Feedback</h3>
            <p>
              Si vous nous fournissez des commentaires, suggestions ou recommandations concernant la Plateforme (collectivement, le "Feedback"), vous nous accordez une licence mondiale, perpétuelle, irrévocable, gratuite et non exclusive pour utiliser ce Feedback sans restriction.
            </p>

            <h2>7. Confidentialité</h2>
            <p>
              Notre Politique de confidentialité décrit comment nous collectons, utilisons et partageons vos informations personnelles. En utilisant notre Plateforme, vous acceptez notre Politique de confidentialité, qui est incorporée par référence dans les présentes CGU.
            </p>

            <h2>8. Limitation de responsabilité</h2>
            <p>
              Dans toute la mesure permise par la loi applicable, e-motionnel.fr ne pourra être tenu responsable des dommages directs, indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris, mais sans s'y limiter, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes intangibles, résultant de :
            </p>
            <ul>
              <li>Votre utilisation ou votre incapacité à utiliser la Plateforme</li>
              <li>Tout contenu obtenu à partir de la Plateforme</li>
              <li>Tout accès non autorisé à vos transmissions ou données</li>
              <li>Toute interruption ou cessation de transmission vers ou depuis la Plateforme</li>
              <li>Toute erreur, inexactitude ou omission dans le contenu</li>
            </ul>

            <h2>9. Indemnisation</h2>
            <p>
              Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité e-motionnel.fr, ses dirigeants, administrateurs, employés et agents contre toute réclamation, dommage, obligation, perte, responsabilité, coût ou dette, et dépense (y compris, mais sans s'y limiter, les honoraires d'avocat) découlant de : (i) votre utilisation et accès à la Plateforme ; (ii) votre violation de toute disposition des présentes CGU ; (iii) votre violation des droits d'un tiers, y compris, mais sans s'y limiter, les droits d'auteur, de propriété ou de confidentialité ; ou (iv) toute réclamation selon laquelle votre Contenu a causé un dommage à un tiers.
            </p>

            <h2>10. Modifications des CGU</h2>
            <p>
              Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications entreront en vigueur dès leur publication sur la Plateforme. Nous vous informerons des modifications importantes par e-mail ou par une notification sur la Plateforme. Votre utilisation continue de la Plateforme après la publication des modifications constitue votre acceptation de ces modifications.
            </p>

            <h2>11. Résiliation</h2>
            <p>
              Nous nous réservons le droit de suspendre ou de résilier votre compte et votre accès à la Plateforme à tout moment, pour quelque raison que ce soit, sans préavis ni responsabilité. Vous pouvez également résilier votre compte à tout moment en nous contactant ou en supprimant votre compte depuis les paramètres.
            </p>
            <p>
              En cas de résiliation, les dispositions des présentes CGU qui, par leur nature, devraient survivre à la résiliation, survivront, y compris, sans limitation, les dispositions relatives à la propriété, les exclusions de garantie et les limitations de responsabilité.
            </p>

            <h2>12. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont régies par le droit français. Tout litige relatif à l'interprétation, l'exécution ou la validité des présentes CGU sera soumis à la compétence exclusive des tribunaux de Paris, France, sauf disposition légale contraire.
            </p>

            <h2>13. Dispositions diverses</h2>
            <h3>13.1 Intégralité de l'accord</h3>
            <p>
              Les présentes CGU constituent l'intégralité de l'accord entre vous et e-motionnel.fr concernant votre utilisation de la Plateforme et remplacent tous les accords antérieurs ou contemporains, écrits ou oraux, concernant la Plateforme.
            </p>

            <h3>13.2 Renonciation et divisibilité</h3>
            <p>
              Le fait que nous n'exercions pas ou ne fassions pas respecter un droit ou une disposition des présentes CGU ne constitue pas une renonciation à ce droit ou à cette disposition. Si une disposition des présentes CGU est jugée invalide par un tribunal compétent, les parties conviennent néanmoins que le tribunal devrait s'efforcer de donner effet aux intentions des parties telles qu'elles sont reflétées dans la disposition, et que les autres dispositions des présentes CGU restent pleinement en vigueur.
            </p>

            <h3>13.3 Cession</h3>
            <p>
              Vous ne pouvez pas céder ou transférer les présentes CGU, en tout ou en partie, sans notre consentement écrit préalable. Nous pouvons céder ou transférer les présentes CGU, en tout ou en partie, sans restriction.
            </p>

            <h2>14. Contact</h2>
            <p>
              Si vous avez des questions concernant les présentes CGU, veuillez nous contacter à :
            </p>
            <p>
              E-mail : contact@e-motionnel.fr<br />
              Adresse : 123 Avenue de la Protection des Données, 75000 Paris, France
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
