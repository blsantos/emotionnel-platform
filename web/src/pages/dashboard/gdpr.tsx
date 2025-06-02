import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function GdprSettings() {
  const [consents, setConsents] = useState({
    marketing: false,
    analytics: false,
    thirdParty: false,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setConsents((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSaveConsents = async () => {
    // Dans une implémentation réelle, nous enverrions les données à l'API
    console.log('Consentements sauvegardés:', consents);
    alert('Vos préférences de consentement ont été mises à jour.');
  };

  const handleExportData = async () => {
    setIsExporting(true);
    
    // Simuler un appel API
    setTimeout(() => {
      setIsExporting(false);
      
      // Dans une implémentation réelle, nous téléchargerions le fichier JSON
      const dummyData = {
        user: {
          id: '123',
          first_name: 'Jean',
          last_name: 'Dupont',
          email: 'jean.dupont@example.com',
          created_at: '2025-01-15T10:30:00Z',
        },
        events: [
          {
            id: '456',
            title: 'Anniversaire de Sophie',
            date: '2025-06-15T19:00:00Z',
            guests: [
              { first_name: 'Marie', last_name: 'Martin', email: 'marie@example.com' },
              { first_name: 'Paul', last_name: 'Bernard', email: 'paul@example.com' },
            ],
          },
        ],
      };
      
      const dataStr = JSON.stringify(dummyData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'mes-donnees-e-motionnel.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }, 2000);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'SUPPRIMER') {
      alert('Veuillez saisir "SUPPRIMER" pour confirmer la suppression de votre compte.');
      return;
    }
    
    setIsDeleting(true);
    
    // Simuler un appel API
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      
      // Dans une implémentation réelle, nous déconnecterions l'utilisateur et le redirigerions vers la page d'accueil
      alert('Votre compte a été supprimé. Vous allez être redirigé vers la page d\'accueil.');
      window.location.href = '/';
    }, 2000);
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Paramètres RGPD | e-motionnel</title>
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres de confidentialité</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Gestion des consentements</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Gérez vos préférences concernant l'utilisation de vos données personnelles.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing"
                      name="marketing"
                      type="checkbox"
                      checked={consents.marketing}
                      onChange={handleConsentChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing" className="font-medium text-gray-700">Communications marketing</label>
                    <p className="text-gray-500">Recevoir des emails concernant les nouvelles fonctionnalités, offres spéciales et événements.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="analytics"
                      name="analytics"
                      type="checkbox"
                      checked={consents.analytics}
                      onChange={handleConsentChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="analytics" className="font-medium text-gray-700">Analyse d'utilisation</label>
                    <p className="text-gray-500">Nous permettre de collecter des données anonymisées sur votre utilisation de la plateforme pour l'améliorer.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="thirdParty"
                      name="thirdParty"
                      type="checkbox"
                      checked={consents.thirdParty}
                      onChange={handleConsentChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="thirdParty" className="font-medium text-gray-700">Partage avec des tiers</label>
                    <p className="text-gray-500">Autoriser le partage de certaines données avec nos partenaires de confiance.</p>
                  </div>
                </div>
                
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={handleSaveConsents}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enregistrer mes préférences
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Mes données personnelles</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Exercez vos droits concernant vos données personnelles.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Exporter mes données</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Téléchargez une copie de toutes vos données personnelles au format JSON.
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleExportData}
                      disabled={isExporting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {isExporting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Exportation en cours...
                        </>
                      ) : (
                        <>
                          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Exporter mes données
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="pt-5 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Supprimer mon compte</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Cette action est irréversible et supprimera définitivement toutes vos données personnelles.
                  </p>
                  <div className="mt-3">
                    {!showDeleteConfirm ? (
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Supprimer mon compte
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-red-600">
                          Pour confirmer la suppression, veuillez saisir "SUPPRIMER" ci-dessous :
                        </p>
                        <input
                          type="text"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="SUPPRIMER"
                        />
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Suppression en cours...
                              </>
                            ) : (
                              'Confirmer la suppression'
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowDeleteConfirm(false);
                              setDeleteConfirmText('');
                            }}
                            disabled={isDeleting}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Informations complémentaires</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Pour en savoir plus sur la façon dont nous traitons vos données personnelles, veuillez consulter notre{' '}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                    Politique de confidentialité
                  </Link>.
                </p>
                <p className="text-sm text-gray-500">
                  Si vous avez des questions concernant vos données personnelles, vous pouvez nous contacter à{' '}
                  <a href="mailto:privacy@e-motionnel.fr" className="text-indigo-600 hover:text-indigo-500">
                    privacy@e-motionnel.fr
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
