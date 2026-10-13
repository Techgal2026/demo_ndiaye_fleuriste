"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  Calendar,
  Send,
} from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
}

// Structure des catégories de soins
const SERVICES_OPTIONS = [
  {
    category: "Hammam & Forfaits Duos",
    services: [
      "Hammam Classique - 35.000 F",
      "Hammam + Enveloppement - 60.000 F",
      "Hammam + Rhassoul - 60.000 F",
      "Jacuzzi (15mn) - 20.000 F",
      "Hammam duo - 65.000 F",
      "Hammam + Enveloppement Duo - 115.000 F",
      "Hammam + Massage Duo - 125.000 F",
      "Hammam + Massage + Pédicure Duo - 145.000 F",
      "Hammam + Massage + Pédicure-Manucure Duo - 155.000 F",
      "Hammam + Enveloppement + Massage Duo - 175.000 F",
      "Hammam + Massage + Soin de visage Duo - 185.000 F",
      "Gommage corps + Massage Duo - 95.000 F",
      "Gommage corps + Massage + Enveloppement Duo - 145.000 F",
    ],
  },
  {
    category: "Massages Relaxants & Cures",
    services: [
      "Massage Bien être - 30.000 F",
      "Massage Californien - 35.000 F",
      "Massage Anti-Stress - 30.000 F",
      "Massage Tonique - 35.000 F",
      "Pierre chaude relaxant - 35.000 F",
      "Pierre chaude tonique - 40.000 F",
      "Serviette chaude - 35.000 F",
      "Serviette chaude tonique - 40.000 F",
      "Massage Amincissant - 30.000 F",
      "Madero thérapie - 35.000 F",
      "Lipocavitation - 35.000 F",
      "Massage Thérapeutique - 50.000 F",
      "Massage dos (30mn) - 20.000 F",
      "Drainage jambe lourde (30mn) - 20.000 F",
      "Drainage corps - 50.000 F",
      "Cure 10 séances post-opération - 250.000 F",
      "Cure 10 séances amincissant - 250.000 F",
      "Cure 10 séances lipocavitation - 300.000 F",
      "Cure 10 séances madero thérapie - 300.000 F",
    ],
  },
  {
    category: "Gommages & Enveloppements",
    services: [
      "Gommage (Sable, Pierre, Café, Sel agrume, Fleur d'oranger, Coco argan) - 20.000 F",
      "Gommage Vitamine C - 30.000 F",
      "Gommage 4*4 Gold - 35.000 F",
      "Gommage Éclaircissant - 50.000 F",
      "Enveloppement Argile / Rhassoul / Fruits rouges - 25.000 F",
      "Enveloppement Nila - 30.000 F",
      "Enveloppement Poudre d'or - 30.000 F",
    ],
  },
  {
    category: "Soins de Visage",
    services: [
      "Soin Classic - 30.000 F",
      "Soin Hydra Facial - 50.000 F",
      "Soin Vitamine C - 35.000 F",
      "Shaker Extrait de carottes glow - 50.000 F",
      "Shaker Sublime or - 50.000 F",
      "Shaker Anti-pollution - 45.000 F",
      "Thermique Antitaches - 50.000 F",
      "Feuille Collagène Éclat - 50.000 F",
      "Soin Peeling (Anti-acné / Anti-tache) - 50.000 F",
      "Soin BB Glow - 50.000 F",
      "Dermaplaning - 50.000 F",
      "Microdermabrasion - 50.000 F",
      "Soin Microneedling - 60.000 F",
      "Soin Pureté aux herbes aromatiques - 50.000 F",
      "Shaker Concombre - 45.000 F",
    ],
  },
  {
    category: "Pédicure & Manucure",
    services: [
      "Manucure Sans Vernis - 5.000 F",
      "Manucure Hydratation - 10.000 F",
      "Manucure Éclaircisante - 10.000 F",
      "Pédicure Hydratation - 15.000 F",
      "Pédicure Paraffine Lavande - 18.000 F",
      "Pédicure / Manucure - 15.000 F",
      "Pédicure / Manucure Vernis Simple - 18.000 F",
      "Pédicure / Manucure Henné - 20.000 F",
      "Pédicure Anti-crevasse - 25.000 F",
      "Pédicure Thérapeutique - 25.000 F",
      "Manucure avec Semi-Permanent - 10.000 F",
      "Pédicure avec Semi-Permanent - 15.000 F",
      "Pédicure / Manucure Semi-Permanent - 25.000 F",
      "Pose Capsule Faux Ongle + Vernis Simple - 13.000 F",
      "Pose Capsule Faux Ongle + Semi-Permanent - 15.000 F",
      "Manucure / Pédicure Homme - 8.000 F à 25.000 F",
    ],
  },
  {
    category: "Onglerie & Dépose",
    services: [
      "Décoration Ongle - 3.000 F",
      "Pose Gel sur ongle naturel - 10.000 F",
      "Pose Gel/Résine/Chablon + Semi-Permanent - 15.000 F",
      "Pose Gel/Résine + Capsule Faux Ongle + Semi-Permanent - 25.000 F",
      "Remplissage gel ou résine - 20.000 F",
      "Dépose Semi-Permanent - 3.000 F",
      "Dépose Capsule Faux Ongle - 5.000 F",
      "Dépose Gel / Résine / Chablon - 10.000 F",
    ],
  },
  {
    category: "Épilations (Cire / Laser)",
    services: [
      "Épilation Cire Femme (Sorcils, Visage, Aisselles, Maillot, Jambes...)",
      "Forfait Corps Cire Femme - 30.000 F à 45.000 F",
      "Épilation Homme - 5.000 F à 20.000 F",
      "Épilation Laser (Zone au choix)",
      "Forfait Laser (Combinaisons zones)",
    ],
  },
  {
    category: "Extension de Cils & Teinture",
    services: [
      "Extension de cils Classic - 35.000 F",
      "Rehaussement des cils - 35.000 F",
      "Volume russe - 50.000 F",
      "Méga volume russe - 60.000 F",
      "Remplissage 15 jours - 20.000 F",
      "Teinture cils - 8.000 F",
      "Henné brown sans épilation - 15.000 F",
      "Épilation sourcils + Henné brown - 20.000 F",
    ],
  },
];

const Nav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // États du formulaire de réservation
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    selectedService: "",
    hasInsurance: "Non",
    isNewPatient: "Oui",
    date: "",
    time: "",
    notes: "",
  });

  const phoneNumber = "221776913230"; // Format international WhatsApp
  const displayPhone = "77 691 32 30";

  const navLinks: NavLink[] = [
    { name: "ACCUEIL", href: "#", active: true },
    { name: "À PROPOS", href: "#" },
    { name: "SERVICES & SOINS", href: "#", hasDropdown: true },
    { name: "ACTUALITÉS", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isModalOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construction du message WhatsApp
    const message =
      `✨ *NOUVELLE DEMANDE DE RÉSERVATION* ✨\n\n` +
      `👤 *Nom complet :* ${formData.fullName}\n` +
      `📞 *Téléphone :* ${formData.phone}\n` +
      `✉️ *Email :* ${formData.email || "Non renseigné"}\n` +
      `💅 *Soin choisi :* ${formData.selectedService || "Non spécifié"}\n` +
      `🛡️ *Assurance :* ${formData.hasInsurance}\n` +
      `🆕 *Nouveau patient :* ${formData.isNewPatient}\n` +
      `📅 *Date souhaitée :* ${formData.date}\n` +
      `⏰ *Heure souhaitée :* ${formData.time}\n` +
      (formData.notes ? `📝 *Notes :* ${formData.notes}\n\n` : `\n`) +
      `Merci de me confirmer la disponibilité !`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirection vers WhatsApp
    window.open(whatsappUrl, "_blank");

    // Réinitialisation et fermeture
    setIsModalOpen(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      selectedService: "",
      hasInsurance: "Non",
      isNewPatient: "Oui",
      date: "",
      time: "",
      notes: "",
    });
  };

  return (
    <>
      <style>{`
        .nav-desktop-list { display: flex; }
        .mobile-toggle-btn { display: flex; }
        .phone-text-desktop { display: inline; }

        @media (min-width: 992px) {
          .nav-desktop-list { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }

        @media (max-width: 991px) {
          .nav-desktop-list { display: none !important; }
          .nav-container-custom { padding: 12px 20px !important; }
        }

        @media (max-width: 576px) {
          .nav-container-custom { padding: 10px 15px !important; }
          .phone-text-desktop { display: none !important; }
          .phone-button-custom { padding: 8px 10px !important; border-radius: 50% !important; }
          .logo-brand-text { font-size: 16px !important; }
          .logo-subtext-text { font-size: 8px !important; }
          .btn-reserve-text { display: none; }
          .btn-reserve-custom { padding: 8px 12px !important; }
        }

        .nav-link-hover { position: relative; }
        .nav-link-hover::after {
          content: ''; position: absolute; width: 0; height: 2px;
          bottom: -4px; left: 0; background-color: #E2BAA9; transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after { width: 100%; }

        .input-field {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #EAE3DE;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          background-color: #FAF7F5;
          color: #2A2421;
        }
        .input-field:focus {
          border-color: #B88E7D;
        }

        .radio-group {
          display: flex;
          gap: 15px;
          align-items: center;
          margin-top: 2px;
        }
        .radio-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #2A2421;
          cursor: pointer;
        }
        .radio-input {
          accent-color: #B88E7D;
          cursor: pointer;
        }
      `}</style>

      <nav
        className="nav-container-custom"
        style={{
          ...styles.navContainer,
          ...(isScrolled ? styles.navContainerScrolled : {}),
        }}
      >
        {/* Logo */}
        <div style={styles.logoContainer}>
          <Image
            src="/logoss.jpeg"
            alt="Secret Beauty & Spa"
            width={48}
            height={48}
            style={styles.logoImage}
            priority
          />
          <div style={styles.logoTextContainer}>
            <span className="logo-brand-text" style={styles.logoBrand}>
              Secret Beauty & Spa
            </span>
            <span className="logo-subtext-text" style={styles.logoSubtext}>
              DU SOIN AU BESOIN
            </span>
          </div>
        </div>

        {/* Navigation Desktop */}
        <ul className="nav-desktop-list" style={styles.navList}>
          {navLinks.map((link, index) => (
            <li key={index} style={styles.navItem}>
              <a
                href={link.href}
                className="nav-link-hover"
                style={{
                  ...styles.navLink,
                  ...(link.active ? styles.navLinkActive : {}),
                }}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown size={14} style={styles.dropdownIcon} />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Boutons d'action */}
        <div style={styles.iconGroup}>
          <a
            href={`tel:${phoneNumber}`}
            className="phone-button-custom"
            style={styles.phoneButton}
            aria-label="Appeler Secret Beauty & Spa"
          >
            <Phone size={15} color="#2A2421" />
            <span className="phone-text-desktop" style={styles.phoneText}>
              {displayPhone}
            </span>
          </a>

          {/* Bouton Réserver */}
          <button
            className="btn-reserve-custom"
            style={styles.reserveButton}
            onClick={() => setIsModalOpen(true)}
          >
            <Calendar size={15} color="#ffffff" />
            <span className="btn-reserve-text">RÉSERVER</span>
          </button>

          <button style={styles.iconButton} aria-label="Rechercher">
            <Search size={19} strokeWidth={1.8} color="#ffffff" />
          </button>

          <button
            className="mobile-toggle-btn"
            style={styles.iconButton}
            aria-label="Ouvrir le menu"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.8} color="#ffffff" />
          </button>
        </div>
      </nav>

      {/* Overlay & Menu Mobile */}
      {isMobileMenuOpen && (
        <div
          style={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        style={{
          ...styles.mobileDrawer,
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={styles.mobileHeader}>
          <div style={styles.logoContainerMobile}>
            <Image
              src="/logoss.jpeg"
              alt="Secret Beauty & Spa"
              width={40}
              height={40}
              style={styles.logoImage}
            />
            <div style={styles.logoTextContainer}>
              <span style={styles.logoBrandMobile}>Secret Beauty & Spa</span>
              <span style={styles.logoSubtextMobile}>DU SOIN AU BESOIN</span>
            </div>
          </div>
          <button
            style={styles.closeButton}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={22} color="#2A2421" />
          </button>
        </div>

        <ul style={styles.mobileNavList}>
          {navLinks.map((link, index) => (
            <li key={index} style={styles.mobileNavItem}>
              <a
                href={link.href}
                style={{
                  ...styles.mobileNavLink,
                  ...(link.active ? styles.mobileNavLinkActive : {}),
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={16} />}
              </a>
            </li>
          ))}
        </ul>

        <div style={styles.mobileActionContainer}>
          <button
            style={styles.mobileReserveButton}
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsModalOpen(true);
            }}
          >
            <Calendar size={16} />
            <span>Réserver un soin</span>
          </button>

          <a href={`tel:${phoneNumber}`} style={styles.mobilePhoneButton}>
            <Phone size={16} color="#ffffff" />
            <span>Appeler au {displayPhone}</span>
          </a>
        </div>
      </div>

      {/* MODALE DE RÉSERVATION */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Réserver votre rendez-vous</h3>
              <button
                style={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} color="#2A2421" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nom complet *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="input-field"
                  placeholder="Ex: Aminata Diallo"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input-field"
                    placeholder="Ex: 77 000 00 00"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-field"
                    placeholder="exemple@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Sélection du soin */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Choisir un soin *</label>
                <select
                  name="selectedService"
                  required
                  className="input-field"
                  value={formData.selectedService}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionnez un soin --</option>
                  {SERVICES_OPTIONS.map((group, idx) => (
                    <optgroup key={idx} label={group.category}>
                      {group.services.map((service, sIdx) => (
                        <option key={sIdx} value={service}>
                          {service}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Autre / Soin personnalisé">
                    Autre / Soin sur-mesure (Préciser en notes)
                  </option>
                </select>
              </div>

              {/* Question Assurance */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Avez-vous une assurance ? *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="hasInsurance"
                      value="Oui"
                      checked={formData.hasInsurance === "Oui"}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    Oui
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="hasInsurance"
                      value="Non"
                      checked={formData.hasInsurance === "Non"}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    Non
                  </label>
                </div>
              </div>

              {/* Question Nouveau Patient */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Êtes-vous un nouveau patient ? *
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="isNewPatient"
                      value="Oui"
                      checked={formData.isNewPatient === "Oui"}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    Oui
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="isNewPatient"
                      value="Non"
                      checked={formData.isNewPatient === "Non"}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    Non
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="input-field"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Heure *</label>
                  <input
                    type="time"
                    name="time"
                    required
                    className="input-field"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Notes ou précisions</label>
                <textarea
                  name="notes"
                  rows={2}
                  className="input-field"
                  placeholder="Précisions sur votre rendez-vous..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" style={styles.submitButton}>
                <Send size={16} />
                <span>Envoyer via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    color: "white",
    backgroundColor: "transparent",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    boxSizing: "border-box",
    zIndex: 100,
    transition: "all 0.3s ease-in-out",
  },
  navContainerScrolled: {
    backgroundColor: "rgba(28, 22, 21, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "10px 40px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  logoContainerMobile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoImage: {
    borderRadius: "50%",
    objectFit: "cover",
  },
  logoTextContainer: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.2",
  },
  logoBrand: {
    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
    fontSize: "19px",
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: "0.5px",
  },
  logoSubtext: {
    fontFamily: "sans-serif",
    fontSize: "9px",
    fontWeight: "500",
    color: "#E2BAA9",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },
  logoBrandMobile: {
    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
    fontSize: "15px",
    fontWeight: "600",
    color: "#2A2421",
  },
  logoSubtextMobile: {
    fontFamily: "sans-serif",
    fontSize: "8px",
    fontWeight: "500",
    color: "#B88E7D",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  navList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "28px",
    alignItems: "center",
  },
  navItem: {
    position: "relative",
  },
  navLink: {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "1px",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "color 0.3s ease",
  },
  navLinkActive: {
    color: "#E2BAA9",
    fontWeight: "600",
  },
  dropdownIcon: {
    marginTop: "1px",
  },
  iconGroup: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  phoneButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#E2BAA9",
    color: "#2A2421",
    padding: "8px 16px",
    borderRadius: "20px",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "600",
  },
  phoneText: {
    color: "#2A2421",
  },
  reserveButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#B88E7D",
    color: "#FFFFFF",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    transition: "background-color 0.3s ease",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    zIndex: 998,
  },
  mobileDrawer: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "80%",
    maxWidth: "320px",
    height: "100vh",
    backgroundColor: "#FAF7F5",
    zIndex: 999,
    padding: "25px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "-5px 0 25px rgba(0, 0, 0, 0.15)",
    overflowY: "auto",
  },
  mobileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #EAE3DE",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },
  mobileNavList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  mobileNavItem: {
    width: "100%",
  },
  mobileNavLink: {
    textDecoration: "none",
    color: "#2A2421",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "6px 0",
  },
  mobileNavLinkActive: {
    color: "#B88E7D",
  },
  mobileActionContainer: {
    marginTop: "auto",
    paddingTop: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  mobileReserveButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "#B88E7D",
    color: "#FFFFFF",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
  },
  mobilePhoneButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "#2A2421",
    color: "#FFFFFF",
    padding: "12px",
    borderRadius: "25px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "500",
    width: "100%",
    boxSizing: "border-box",
  },
  /* Styles Modale Formulaire */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "460px",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    boxSizing: "border-box",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #EAE3DE",
  },
  modalTitle: {
    margin: 0,
    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
    fontSize: "20px",
    color: "#2A2421",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#2A2421",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#25D366", // Couleur WhatsApp
    color: "#FFFFFF",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.2s ease",
  },
};

export default Nav;
