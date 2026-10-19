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
} from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
}

interface NavbarProps {
  onOpenReservation?: () => void;
}

const Nav: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const phoneNumber = "221776913230"; // Format international WhatsApp
  const displayPhone = "77 691 32 30";

  const navLinks: NavLink[] = [
    { name: "ACCUEIL", href: "/", active: true },
    { name: "À PROPOS", href: "about" },
    { name: "SOINS", href: "soins", hasDropdown: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleReservationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Ferme le menu mobile si ouvert
    if (onOpenReservation) {
      onOpenReservation();
    }
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
          .nav-wrapper-custom { padding: 10px 15px !important; }
          .nav-container-custom { padding: 12px 20px !important; }
        }

        @media (max-width: 576px) {
          .nav-wrapper-custom { padding: 8px 10px !important; }
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
          bottom: -4px; left: 0; background-color: #B88E7D; transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after { width: 100%; }
      `}</style>

      {/* Wrapper positionné en fixed avec marges latérales */}
      <div style={styles.navWrapper} className="nav-wrapper-custom">
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

            {/* Bouton Réserver bureau */}
            <button
              onClick={handleReservationClick}
              className="btn-reserve-custom"
              style={styles.reserveButton}
            >
              <Calendar size={15} color="#ffffff" />
              <span className="btn-reserve-text">RÉSERVER</span>
            </button>

            <button style={styles.iconButton} aria-label="Rechercher">
              <Search size={19} strokeWidth={1.8} color="#2A2421" />
            </button>

            <button
              className="mobile-toggle-btn"
              style={styles.iconButton}
              aria-label="Ouvrir le menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.8} color="#2A2421" />
            </button>
          </div>
        </nav>
      </div>

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
          {/* Bouton Réserver mobile */}
          <button
            onClick={handleReservationClick}
            className="btn-reserve-custom"
            style={styles.mobileReserveButton}
          >
            <Calendar size={16} color="#ffffff" />
            <span>Réserver un soin</span>
          </button>

          <a href={`tel:${phoneNumber}`} style={styles.mobilePhoneButton}>
            <Phone size={16} color="#ffffff" />
            <span>Appeler au {displayPhone}</span>
          </a>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    padding: "16px 40px",
    boxSizing: "border-box",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
    color: "#2A2421",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    maxWidth: "1280px",
    margin: "0 auto",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
  navContainerScrolled: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "10px 24px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
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
    fontFamily: '"Playfair Display", "Times New Roman", serif',
    fontSize: "19px",
    fontWeight: 600,
    color: "#2A2421",
  },
  logoSubtext: {
    fontFamily: "sans-serif",
    fontSize: "9px",
    fontWeight: "500",
    color: "#B88E7D",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },
  logoBrandMobile: {
    fontFamily: '"Playfair Display", "Times New Roman", serif',
    fontSize: "15px",
    fontWeight: 600,
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
    display: "flex",
    gap: "28px",
    alignItems: "center",
  },
  navItem: {
    position: "relative",
  },
  navLink: {
    textDecoration: "none",
    color: "#4A3B32",
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
    color: "#B88E7D",
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
    backgroundColor: "#FAF3F0",
    color: "#2A2421",
    padding: "8px 16px",
    borderRadius: "20px",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid #EAE3DE",
  },
  phoneText: {
    color: "#2A2421",
  },
  reserveButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#684838",
    color: "#FFFFFF",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textDecoration: "none",
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
    backgroundColor: "#684838",
    color: "#FFFFFF",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    textDecoration: "none",
    boxSizing: "border-box",
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
};

export default Nav;