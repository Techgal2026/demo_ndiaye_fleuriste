"use client";

import React, { useState, useEffect } from "react";

export interface ServiceItem {
  name: string;
  price: string;
  description?: string;
}

export const allAvailableServices: ServiceItem[] = [
  { name: "Épilation aisselles", price: "5 000 FCFA" },
  { name: "Épilation maillot simple", price: "7 000 FCFA" },
  { name: "Épilation brésilien", price: "10 000 FCFA" },
  { name: "Épilation ventre", price: "5 000 FCFA" },
  { name: "Épilation bas du dos", price: "5 000 FCFA" },
  { name: "Épilation dos complet", price: "10 000 FCFA" },
  { name: "Laser visage complet", price: "60 000 FCFA" },
  { name: "Laser aisselles", price: "25 000 FCFA" },
  { name: "Laser maillot intégral", price: "70 000 FCFA" },
  { name: "Laser jambe complète", price: "120 000 FCFA" },
  { name: "Hammam classic + savonnage", price: "30 000 FCFA" },
  { name: "Hammam + enveloppement", price: "55 000 FCFA" },
  { name: "Hammam + massage (1h)", price: "60 000 FCFA" },
  { name: "Forfait Hammam Solo 1", description: "Hammam + Enveloppement + Massage (1h)", price: "85 000 FCFA" },
  { name: "Extensions cils", price: "30 000 FCFA" },
  { name: "Volume russe", price: "50 000 FCFA" },
  { name: "Microblading", price: "100 000 FCFA" },
  { name: "Maquillage mariée", price: "120 000 FCFA" },
];

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedService?: ServiceItem | null;
}

export default function ReservationModal({
  isOpen,
  onClose,
  initialSelectedService,
}: ReservationModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialSelectedService) {
        setSelectedServices([initialSelectedService]);
      } else {
        setSelectedServices([]);
      }
    }
  }, [isOpen, initialSelectedService]);

  if (!isOpen) return null;

  const addServiceToSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceName = e.target.value;
    if (!serviceName) return;
    const found = allAvailableServices.find((s) => s.name === serviceName);
    if (found && !selectedServices.some((s) => s.name === found.name)) {
      setSelectedServices([...selectedServices, found]);
    }
    e.target.value = "";
  };

  const removeService = (name: string) => {
    setSelectedServices(selectedServices.filter((s) => s.name !== name));
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, item) => {
      const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
      return total + cleanPrice;
    }, 0);
  };

  // Appel de l'API backend pour initialiser le paiement Wave intégré
  const handleIntegratedWavePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || selectedServices.length === 0) {
      alert("Veuillez renseigner votre nom, votre téléphone et sélectionner au moins un soin.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/payment/wave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          services: selectedServices,
          totalAmount: calculateTotal(),
        }),
      });

      const data = await response.json();

      if (data.paymentUrl) {
        // Redirection automatique vers la page de paiement officielle Wave
        window.location.href = data.paymentUrl;
      } else {
        alert("Erreur lors de l'initialisation du paiement.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur technique est survenue.");
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Réservation & Paiement Wave</h3>
          <button onClick={onClose} style={styles.closeModalBtn}>✕</button>
        </div>

        <form onSubmit={handleIntegratedWavePayment} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nom complet *</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ex : Fatou Diop"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Adresse Email</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Ex : fatou@gmail.com"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Numéro de téléphone (WhatsApp) *</label>
            <input
              type="tel"
              required
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Ex : +221 77 000 00 00"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Soins sélectionnés :</label>
            {selectedServices.length === 0 ? (
              <p style={styles.noServiceText}>Aucun soin sélectionné.</p>
            ) : (
              <ul style={styles.selectedList}>
                {selectedServices.map((s, idx) => (
                  <li key={idx} style={styles.selectedItem}>
                    <span>{s.name} - <strong>{s.price}</strong></span>
                    <button type="button" onClick={() => removeService(s.name)} style={styles.removeBtn}>Retirer</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Ajouter un autre soin :</label>
            <select onChange={addServiceToSelection} defaultValue="" style={styles.input}>
              <option value="" disabled>-- Choisir un soin à rajouter --</option>
              {allAvailableServices.map((s, idx) => (
                <option key={idx} value={s.name}>{s.name} ({s.price})</option>
              ))}
            </select>
          </div>

          <div style={styles.totalBox}>
            <span>Total à régler :</span>
            <strong style={styles.totalPrice}>{calculateTotal().toLocaleString()} FCFA</strong>
          </div>

          <button type="submit" disabled={isLoading} style={styles.submitWaveBtn}>
            {isLoading ? "Redirection vers Wave..." : "Payer avec Wave 🌊"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", padding: "15px" },
  modalContent: { backgroundColor: "#fff", padding: "25px", borderRadius: "8px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", textAlign: "left", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  modalTitle: { fontSize: "20px", color: "#684838", margin: 0, fontFamily: "serif" },
  closeModalBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#333" },
  form: { display: "flex", flexDirection: "column", gap: "15px", fontFamily: "sans-serif" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#4A3B32" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "13px" },
  noServiceText: { fontSize: "12px", color: "#888", fontStyle: "italic" },
  selectedList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "5px" },
  selectedItem: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9f6f4", padding: "8px", borderRadius: "4px", fontSize: "12px" },
  removeBtn: { background: "#ff4d4d", color: "#fff", border: "none", padding: "3px 8px", borderRadius: "3px", cursor: "pointer", fontSize: "10px" },
  totalBox: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#FAF3F0", borderRadius: "4px", fontSize: "14px" },
  totalPrice: { color: "#684838", fontSize: "16px" },
  submitWaveBtn: { backgroundColor: "#1FA6FF", color: "#fff", border: "none", padding: "12px", borderRadius: "20px", fontSize: "14px", fontWeight: "600", cursor: "pointer", textAlign: "center", marginTop: "10px" }
};