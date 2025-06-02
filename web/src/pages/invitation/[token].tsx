import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function InvitationView({ token }) {
  const [invitation, setInvitation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState('pending');
  const [comment, setComment] = useState('');
  const [contribution, setContribution] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideoRecorder, setShowVideoRecorder] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simuler le chargement des données depuis l'API
  useEffect(() => {
    // Dans une implémentation réelle, nous ferions un appel à l'API
    setTimeout(() => {
      setInvitation({
        id: '123',
        title: 'Anniversaire de Sophie',
        description: 'Venez célébrer mes 30 ans dans une ambiance festive !',
        date: new Date('2025-06-15T19:00:00'),
        end_date: new Date('2025-06-16T02:00:00'),
        location: {
          address: '123 Rue des Fêtes',
          postal_code: '75001',
          city: 'Paris',
          details: 'Code porte: 1234, 2ème étage'
        },
        host: {
          first_name: 'Sophie',
          last_name: 'Martin'
        },
        template: {
          id: 'template1',
          name: 'Élégant',
          animation_url: 'https://assets9.lottiefiles.com/packages/lf20_u4yrau.json',
          animation_type: 'lottie'
        },
        custom_colors: {
          primary: '#FF4081',
          secondary: '#3F51B5',
          background: '#FFFFFF'
        },
        custom_text: {
          main_heading: 'Sophie fête ses 30 ans !',
          sub_heading: 'Venez célébrer ce moment spécial',
          description: 'Une soirée inoubliable vous attend avec musique, cocktails et surprises.',
          cta_text: 'Je réponds'
        }
      });
      setIsLoading(false);
    }, 1500);
  }, [token]);

  const handleRsvpChange = (status) => {
    setRsvpStatus(status);
  };

  const handleSubmitRsvp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi des données à l'API
    setTimeout(() => {
      console.log('RSVP soumis:', {
        token,
        status: rsvpStatus,
        comment,
        contribution: parseFloat(contribution) || 0
      });
      setIsSubmitting(false);
      // Afficher un message de confirmation
      alert('Votre réponse a été enregistrée. Merci !');
    }, 1000);
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setVideoStream(stream);
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        setPreviewVideo(videoURL);
        setRecordedChunks(chunks);
      };
      
      recorder.start();
      setIsRecording(true);
      
      // Arrêter automatiquement après 30 secondes
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
          setIsRecording(false);
        }
      }, 30000);
    } catch (error) {
      console.error('Erreur lors de l\'accès à la caméra:', error);
      alert('Impossible d\'accéder à votre caméra. Veuillez vérifier les permissions.');
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const uploadVideo = async () => {
    if (recordedChunks.length === 0) return;
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob);
    formData.append('token', token);
    
    // Simuler l'upload avec progression
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadProgress(i);
    }
    
    // Simuler la fin de l'upload
    setTimeout(() => {
      setUploadProgress(0);
      setShowVideoRecorder(false);
      setPreviewVideo(null);
      setRecordedChunks([]);
      alert('Votre vidéo a été envoyée avec succès !');
    }, 1000);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
        <p className="mt-4 text-gray-600">Chargement de l'invitation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{invitation.title} | e-motionnel</title>
        <meta name="description" content={invitation.description} />
      </Head>

      {/* En-tête avec animation */}
      <header className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {invitation.template.animation_type === 'lottie' ? (
            <div className="w-full h-full opacity-20">
              {/* Ici, nous utiliserions normalement le composant Lottie */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse w-32 h-32 rounded-full bg-white bg-opacity-30"></div>
              </div>
            </div>
          ) : (
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={invitation.template.animation_url} type="video/mp4" />
            </video>
          )}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {invitation.custom_text.main_heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-lg mx-auto text-xl sm:max-w-3xl"
          >
            {invitation.custom_text.sub_heading}
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Détails de l'événement */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow overflow-hidden sm:rounded-lg mb-8"
          >
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Détails de l'événement</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{invitation.description}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Hôte</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {invitation.host.first_name} {invitation.host.last_name}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formatDate(invitation.date)} à {formatTime(invitation.date)}
                    {invitation.end_date && ` jusqu'à ${formatTime(invitation.end_date)}`}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Lieu</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div>{invitation.location.address}</div>
                    <div>{invitation.location.postal_code} {invitation.location.city}</div>
                    {invitation.location.details && (
                      <div className="mt-2 text-xs text-gray-500">{invitation.location.details}</div>
                    )}
                    <div className="mt-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${invitation.location.address}, ${invitation.location.postal_code} ${invitation.location.city}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-pink-600 hover:text-pink-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Voir sur Google Maps
                      </a>
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {invitation.custom_text.description}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.section>

          {/* Formulaire RSVP */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white shadow sm:rounded-lg mb-8"
          >
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Votre réponse</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Merci de confirmer votre présence
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmitRsvp}>
                <div className="space-y-6">
                  <div>
                    <label className="text-base font-medium text-gray-900">Serez-vous présent(e) ?</label>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="rsvp-yes"
                          name="rsvp"
                          type="radio"
                          checked={rsvpStatus === 'yes'}
                          onChange={() => handleRsvpChange('yes')}
                          className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300"
                        />
                        <label htmlFor="rsvp-yes" className="ml-3 block text-sm font-medium text-gray-700">
                          Oui, je serai présent(e)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="rsvp-no"
                          name="rsvp"
                          type="radio"
                          checked={rsvpStatus === 'no'}
                          onChange={() => handleRsvpChange('no')}
                          className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300"
                        />
                        <label htmlFor="rsvp-no" className="ml-3 block text-sm font-medium text-gray-700">
                          Non, je ne pourrai pas venir
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="rsvp-maybe"
                          name="rsvp"
                          type="radio"
                          checked={rsvpStatus === 'maybe'}
                          onChange={() => handleRsvpChange('maybe')}
                          className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300"
                        />
                        <label htmlFor="rsvp-maybe" className="ml-3 block text-sm font-medium text-gray-700">
                          Peut-être
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                      Commentaire (facultatif)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Un message pour l'hôte..."
                      />
                    </div>
                  </div>

                  {rsvpStatus === 'yes' && (
                    <div>
                      <label htmlFor="contribution" className="block text-sm font-medium text-gray-700">
                        Contribution (facultatif)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">€</span>
                        </div>
                        <input
                          type="number"
                          name="contribution"
                          id="contribution"
                          value={contribution}
                          onChange={(e) => setContribution(e.target.value)}
                          className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          aria-describedby="contribution-currency"
                          min="0"
                          step="0.01"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm" id="contribution-currency">
                            EUR
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma réponse'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.section>

          {/* Section vidéo-témoignage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white shadow sm:rounded-lg mb-8"
          >
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Laisser un message vidéo</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Enregistrez un court message vidéo pour l'hôte (30 secondes maximum)
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              {!showVideoRecorder ? (
                <button
                  type="button"
                  onClick={() => setShowVideoRecorder(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Enregistrer un message vidéo
                </button>
              ) : (
                <div className="space-y-4">
                  {!previewVideo ? (
                    <div className="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                      {videoStream && (
                        <video
                          autoPlay
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                          ref={(video) => {
                            if (video && videoStream) {
                              video.srcObject = videoStream;
                            }
                          }}
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {!videoStream && !isRecording && (
                          <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">Cliquez sur "Commencer l'enregistrement"</p>
                          </div>
                        )}
                        {isRecording && (
                          <div className="absolute top-2 left-2 flex items-center bg-red-600 text-white px-2 py-1 rounded-md text-xs">
                            <span className="animate-pulse mr-1 h-2 w-2 bg-white rounded-full"></span>
                            Enregistrement en cours...
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                      <video
                        src={previewVideo}
                        controls
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {!isRecording && !previewVideo && (
                      <button
                        type="button"
                        onClick={startVideoRecording}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Commencer l'enregistrement
                      </button>
                    )}
                    {isRecording && (
                      <button
                        type="button"
                        onClick={stopVideoRecording}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                        </svg>
                        Arrêter l'enregistrement
                      </button>
                    )}
                    {previewVideo && (
                      <>
                        <button
                          type="button"
                          onClick={uploadVideo}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Envoyer la vidéo
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewVideo(null);
                            setRecordedChunks([]);
                          }}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          Recommencer
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setShowVideoRecorder(false);
                        setPreviewVideo(null);
                        setRecordedChunks([]);
                        if (videoStream) {
                          videoStream.getTracks().forEach(track => track.stop());
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      Annuler
                    </button>
                  </div>

                  {uploadProgress > 0 && (
                    <div className="mt-2">
                      <div className="text-xs font-medium text-gray-500">
                        Envoi en cours... {uploadProgress}%
                      </div>
                      <div className="mt-1 relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                          <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.section>

          {/* Partage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white shadow sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Partager l'invitation</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Partagez cette invitation avec vos amis
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Lien copié dans le presse-papier !');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier le lien
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${invitation.custom_text.main_heading} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(invitation.custom_text.main_heading)}&body=${encodeURIComponent(`${invitation.custom_text.sub_heading}\n\n${window.location.href}`)}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Créé avec <span className="text-pink-500">❤️</span> sur{' '}
              <Link href="/" className="text-pink-600 hover:text-pink-500">
                e-motionnel.fr
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Dans une implémentation réelle, nous récupérerions le token depuis l'URL
export async function getServerSideProps(context) {
  const { token } = context.query;
  
  return {
    props: {
      token: token || 'demo-token',
    },
  };
}
