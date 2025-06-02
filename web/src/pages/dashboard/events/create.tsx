import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import DashboardLayout from '../../../components/Layout/DashboardLayout';

const steps = [
  { id: 'type', name: 'Type d\'événement' },
  { id: 'template', name: 'Template' },
  { id: 'details', name: 'Détails' },
  { id: 'guests', name: 'Invités' },
  { id: 'preview', name: 'Aperçu' },
];

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    template_id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    end_date: '',
    end_time: '',
    location: {
      address: '',
      city: '',
      postal_code: '',
      country: 'France',
      details: '',
    },
    custom_colors: {
      primary: '#4F46E5',
      secondary: '#10B981',
      background: '#FFFFFF',
    },
    custom_text: {
      main_heading: '',
      sub_heading: '',
      description: '',
      cta_text: 'Je réponds',
    },
    guests: [],
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dans une implémentation réelle, nous enverrions les données à l'API
    console.log('Données du formulaire:', formData);
    
    // Rediriger vers la page de l'événement créé
    // router.push('/dashboard/events/[id]', `/dashboard/events/123`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Type d'événement
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Choisissez le type d'événement</h2>
              <p className="mt-1 text-sm text-gray-500">
                Sélectionnez le type d'événement que vous souhaitez organiser.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { id: 'birthday', name: 'Anniversaire', icon: '🎂' },
                { id: 'wedding', name: 'Mariage', icon: '💍' },
                { id: 'baptism', name: 'Baptême', icon: '👶' },
                { id: 'party', name: 'Soirée', icon: '🎉' },
                { id: 'dinner', name: 'Dîner', icon: '🍽️' },
                { id: 'other', name: 'Autre', icon: '📅' },
              ].map((type) => (
                <div
                  key={type.id}
                  className={`relative rounded-lg border p-4 flex items-center space-x-3 hover:border-indigo-500 ${
                    formData.type === type.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, type: type.id })}
                >
                  <div className="flex-shrink-0 text-2xl">{type.icon}</div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{type.name}</p>
                  </div>
                  {formData.type === type.id && (
                    <div className="flex-shrink-0 text-indigo-500">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 1: // Template
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Choisissez un template</h2>
              <p className="mt-1 text-sm text-gray-500">
                Sélectionnez un template pour votre invitation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { id: 'template1', name: 'Élégant', thumbnail: 'https://via.placeholder.com/300x200?text=Template+1', isPremium: false },
                { id: 'template2', name: 'Festif', thumbnail: 'https://via.placeholder.com/300x200?text=Template+2', isPremium: false },
                { id: 'template3', name: 'Romantique', thumbnail: 'https://via.placeholder.com/300x200?text=Template+3', isPremium: false },
                { id: 'template4', name: 'Moderne', thumbnail: 'https://via.placeholder.com/300x200?text=Template+4', isPremium: true },
                { id: 'template5', name: 'Classique', thumbnail: 'https://via.placeholder.com/300x200?text=Template+5', isPremium: true },
                { id: 'template6', name: 'Minimaliste', thumbnail: 'https://via.placeholder.com/300x200?text=Template+6', isPremium: false },
              ].map((template) => (
                <div
                  key={template.id}
                  className={`relative rounded-lg border overflow-hidden hover:border-indigo-500 ${
                    formData.template_id === template.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, template_id: template.id })}
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img src={template.thumbnail} alt={template.name} className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{template.name}</p>
                      {template.isPremium && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                  {formData.template_id === template.id && (
                    <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
                      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2: // Détails
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Détails de l'événement</h2>
              <p className="mt-1 text-sm text-gray-500">
                Renseignez les informations concernant votre événement.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre de l'événement *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Décrivez votre événement en quelques mots.</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date *
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Heure *
                  </label>
                  <div className="mt-1">
                    <input
                      type="time"
                      name="time"
                      id="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                    Date de fin
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                    Heure de fin
                  </label>
                  <div className="mt-1">
                    <input
                      type="time"
                      name="end_time"
                      id="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <h3 className="text-sm font-medium text-gray-700">Lieu</h3>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="location.address" className="block text-sm font-medium text-gray-700">
                    Adresse *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location.address"
                      id="location.address"
                      value={formData.location.address}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="location.postal_code" className="block text-sm font-medium text-gray-700">
                    Code postal *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location.postal_code"
                      id="location.postal_code"
                      value={formData.location.postal_code}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="location.city" className="block text-sm font-medium text-gray-700">
                    Ville *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location.city"
                      id="location.city"
                      value={formData.location.city}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="location.details" className="block text-sm font-medium text-gray-700">
                    Précisions sur le lieu
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location.details"
                      id="location.details"
                      value={formData.location.details}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Étage, code d'entrée, etc."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3: // Invités
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Gérer les invités</h2>
              <p className="mt-1 text-sm text-gray-500">
                Ajoutez vos invités manuellement ou importez-les depuis un fichier CSV.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Importer un fichier CSV</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" />
                    </label>
                    <p className="pl-1">ou glissez-déposez</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV jusqu'à 10MB</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    Ajouter manuellement
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    Télécharger un modèle CSV
                  </button>
                </span>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-500">
                        Aucun invité ajouté pour le moment.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 4: // Aperçu
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Aperçu de votre invitation</h2>
              <p className="mt-1 text-sm text-gray-500">
                Vérifiez que tout est correct avant d'envoyer votre invitation.
              </p>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {formData.title || 'Titre de l\'événement'}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {formData.description || 'Description de l\'événement'}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Type d'événement</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.type === 'birthday' && 'Anniversaire'}
                      {formData.type === 'wedding' && 'Mariage'}
                      {formData.type === 'baptism' && 'Baptême'}
                      {formData.type === 'party' && 'Soirée'}
                      {formData.type === 'dinner' && 'Dîner'}
                      {formData.type === 'other' && 'Autre'}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Date et heure</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.date && new Date(formData.date).toLocaleDateString('fr-FR')}
                      {formData.time && ` à ${formData.time}`}
                      {formData.end_date && ` jusqu'au ${new Date(formData.end_date).toLocaleDateString('fr-FR')}`}
                      {formData.end_time && ` à ${formData.end_time}`}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Lieu</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.location.address && `${formData.location.address}, `}
                      {formData.location.postal_code && `${formData.location.postal_code} `}
                      {formData.location.city && formData.location.city}
                      {formData.location.details && <div className="mt-1 text-xs text-gray-500">{formData.location.details}</div>}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Invités</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formData.guests.length > 0 ? `${formData.guests.length} invités` : 'Aucun invité ajouté'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Envoyer l'invitation
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Votre invitation est prête à être envoyée. Vous pourrez toujours la modifier ultérieurement.
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Créer l'invitation
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Créer une invitation | e-motionnel</title>
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Progress">
            <ol className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative md:flex-1 md:flex">
                  {stepIdx < currentStep ? (
                    <div className="group flex items-center w-full">
                      <span className="px-6 py-4 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full">
                          <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                      </span>
                    </div>
                  ) : stepIdx === currentStep ? (
                    <div className="px-6 py-4 flex items-center text-sm font-medium" aria-current="step">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                        <span className="text-indigo-600">{stepIdx + 1}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                    </div>
                  ) : (
                    <div className="group flex items-center">
                      <span className="px-6 py-4 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                          <span className="text-gray-500">{stepIdx + 1}</span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-500">{step.name}</span>
                      </span>
                    </div>
                  )}
                  
                  {stepIdx !== steps.length - 1 ? (
                    <div className="hidden md:block absolute top-0 right-0 h-full w-5">
                      <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                        <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {renderStepContent()}
          </motion.div>

          <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`${
                currentStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              } py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Précédent
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Suivant
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
