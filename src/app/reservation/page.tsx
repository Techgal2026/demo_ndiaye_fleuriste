"use client";

import React, { useState } from 'react';

interface Service {
  name: string;
  price: number;
}

const services: Service[] = [
  { name: "Soin Visage Hydratant", price: 20000 },
  { name: "Massage Relaxant (1h)", price: 35000 },
  { name: "Soin Anti-âge", price: 40000 },
  { name: "Manucure & Pédicure", price: 15000 },
];

export default function ReservationPage() {
  const [fullname, setFullname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [currentDeposit, setCurrentDeposit] = useState<number>(0);
  
  // État pour gérer l'étape (formulaire vs attente/vérification du paiement)
  const [step, setStep] = useState<'form' | 'waiting_payment'>('form');

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceName = e.target.value;
    setSelectedService(serviceName);

    const found = services.find((s) => s.name === serviceName);
    const price = found ? found.price : 0;

    setCurrentTotal(price);
    setCurrentDeposit(price * 0.5);
  };

  // Étape 1 : Soumission du formulaire -> Redirection vers Wave
  const handleInitiatePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentDeposit <= 0) {
      alert("Veuillez sélectionner un soin valide.");
      return;
    }

    // 1. Rediriger l'utilisateur vers le lien de paiement Wave
    // Remplacez par votre lien Wave Merchant configuré
    const wavePayUrl = `https://pay.wave.com/m/YOUR_MERCHANT_ID?amount=${currentDeposit}`;
    
    // Ouvre le lien de paiement dans un nouvel onglet ou redirige
    window.open(wavePayUrl, '_blank');

    // 2. Basculer l'affichage pour lui permettre de valider une fois le paiement fait
    setStep('waiting_payment');
  };

  // Étape 2 : Vérification / Confirmation après paiement pour envoyer le message WhatsApp
  const handleVerifyAndSendWhatsApp = () => {
    const whatsappTargetNumber = "221770000000"; // Numéro WhatsApp de l'entreprise

    const message = `Bonjour ! Je viens d'effectuer le paiement de l'acompte de ${currentDeposit.toLocaleString('fr-FR')} FCFA via Wave.

📌 *Détails de ma réservation :*
- **Nom :** ${fullname}
- **Téléphone :** ${phone}
- **Soin :** ${selectedService}
- **Date :** ${date} à ${time}
- **Montant Total :** ${currentTotal.toLocaleString('fr-FR')} FCFA
- **Acompte Payé (50%) :** ${currentDeposit.toLocaleString('fr-FR')} FCFA`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappTargetNumber}?text=${encodedMessage}`;

    // Ouverture de WhatsApp avec le message pré-rempli
    window.location.href = whatsappUrl;
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans text-gray-800">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Réserver votre Soin</h1>
      
      {step === 'form' ? (
        <form onSubmit={handleInitiatePayment} className="space-y-5">
          <p className="text-center text-sm text-gray-500 mb-6">Remplissez le formulaire pour procéder au paiement de l'acompte.</p>

          {/* Informations Personnelles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input 
                type="text" 
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required 
                placeholder="Ex: Jean Dupont" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (WhatsApp)</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
                placeholder="Ex: +221 77 000 00 00" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Date & Heure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date du rendez-vous</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Choix du soin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionnez le soin</label>
            <select 
              value={selectedService}
              onChange={handleServiceChange}
              required 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">-- Choisir un soin --</option>
              {services.map((service, index) => (
                <option key={index} value={service.name}>
                  {service.name} - {service.price.toLocaleString('fr-FR')} FCFA
                </option>
              ))}
            </select>
          </div>

          {/* Récapitulatif Tarifaire */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Montant total du soin :</span>
              <span className="font-semibold text-gray-800">{currentTotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex justify-between text-base font-bold text-blue-900 border-t border-blue-200 pt-2">
              <span>Acompte à payer (50%) :</span>
              <span className="text-blue-600">{currentDeposit.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>

          {/* Bouton de paiement */}
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center space-x-2"
          >
            <span>Procéder au paiement de l'acompte par Wave</span>
          </button>
        </form>
      ) : (
        /* Étape de validation post-paiement */
        <div className="text-center space-y-6 py-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-800 text-sm">
            <p className="font-semibold mb-1">Paiement Wave en cours...</p>
            Une fenêtre de paiement s'est ouverte. Veuillez valider le montant de <b>{currentDeposit.toLocaleString('fr-FR')} FCFA</b> sur votre application Wave.
          </div>

          <p className="text-gray-600 text-sm">
            Une fois le paiement validé, cliquez sur le bouton ci-dessous pour envoyer la confirmation de votre réservation sur notre WhatsApp.
          </p>

          <div className="space-y-3">
            <button 
              onClick={handleVerifyAndSendWhatsApp}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              J'ai payé, envoyer la confirmation sur WhatsApp
            </button>

            <button 
              onClick={() => setStep('form')}
              className="text-sm text-gray-500 hover:underline"
            >
              Modifier les informations ou recommencer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}