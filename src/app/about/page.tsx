"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";

import Navbar from "../../components/Navbar";
export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main style={styles.main}>
        <Navbar />
      {/* --- BANNIÈRE D'EN-TÊTE AVEC LOGO --- */}
      <section style={styles.heroBanner}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            
            <span style={styles.heroSubtitle}>SECRET BEAUTY & SPA • DAKAR</span>
            <h1 style={styles.heroTitle}>Notre Histoire</h1>
            <p style={styles.heroDescription}>
              Un havre de paix et d'élégance né d'une passion pour le bien-être et le soin de soi.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION HISTOIRE DU SPA --- */}
      <section ref={sectionRef} className="about-section" style={styles.section}>
        <style>{`
          .animate-fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          .animate-fade-up.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .delay-1 { transition-delay: 0.2s; }
          .delay-2 { transition-delay: 0.4s; }

          @media (max-width: 1024px) {
            .about-container {
              flex-direction: column !important;
              gap: 60px !important;
            }
            .about-left-column, .about-right-column {
              width: 100% !important;
            }
            .about-right-column { padding-left: 0 !important; }
            .about-left-column { max-width: 650px; margin: 0 auto; }
          }
          @media (max-width: 640px) {
            .about-section { padding: 60px 20px !important; }
            .main-image-wrapper { height: 420px !important; }
            .overlay-image-card {
              width: 220px !important;
              height: 140px !important;
              left: -10px !important;
              bottom: 40px !important;
            }
            .main-title { font-size: 32px !important; }
          }
        `}</style>

        <div className="about-container" style={styles.container}>
          {/* COLONNE GAUCHE : PHOTOS */}
          <div className={`about-left-column animate-fade-up delay-1 ${isVisible ? "visible" : ""}`} style={styles.leftColumn}>
            <div className="main-image-wrapper" style={styles.mainImageWrapper}>
              <img src="/ab.jpg" alt="Cadre apaisant de l'institut" style={styles.mainImage} loading="lazy" />
            </div>
            <div className="overlay-image-card" style={styles.overlayImageCard}>
              <img src="/ab2.jpeg" alt="Détails des soins Secret Beauty" style={styles.overlayImage} loading="lazy" />
            </div>
          </div>

          {/* COLONNE DROITE : L'HISTOIRE DU SPA */}
          <div className={`about-right-column animate-fade-up delay-2 ${isVisible ? "visible" : ""}`} style={styles.rightColumn}>
            <div style={styles.brandBadge}>
              <img src="/logo.png" alt="Secret Beauty Logo" style={styles.inlineLogo} />
              <span style={styles.subtitle}>À propos de Secret Beauty &amp; Spa</span>
            </div>

            <h2 className="main-title" style={styles.mainTitle}>Une histoire dédiée à la beauté et au bien-être.</h2>

            {/* Séparateur décoratif */}
            <div style={styles.dividerContainer}>
              <span style={styles.dottedLine}>- - - - -</span>
              <svg width="26" height="20" viewBox="0 0 24 20" fill="#6C534E" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 0C9.5 6 9.5 14 12 20C14.5 14 14.5 6 12 0Z" />
                <path d="M11 6C6 2 2 4 1 11C6 11 10 9 11.5 6Z" />
                <path d="M13 6C18 2 22 4 23 11C18 11 14 9 12.5 6Z" />
              </svg>
              <span style={styles.dottedLine}>- - - - -</span>
            </div>

            <p style={styles.paragraph}>
              Secret Beauty &amp; Spa est né du désir d’offrir un véritable refuge d’apaisement au cœur de Dakar. C’est l’histoire d’une passion profonde pour l’art du soin, la beauté holistique et l’épanouissement personnel.
            </p>

            <blockquote style={styles.quoteBlock}>
              « La véritable beauté commence lorsque l'on prend le temps de prendre soin de soi. Offrez-vous un instant de détente, de douceur et de bien-être. »
            </blockquote>

            <p style={styles.paragraph}>
              Au fil des années, nous avons pensé chaque détail de notre institut pour en faire un sanctuaire intime et raffiné. Des soins esthétiques aux rituels de relaxation les plus enveloppants, chaque visite est une invitation au lâcher-prise dans un cadre chaleureux, moderne et apaisant.
            </p>

            <p style={styles.paragraph}>
              Aujourd'hui, Secret Beauty &amp; Spa continue d'accompagner chaque cliente avec une attention sur-mesure, en révélant la beauté naturelle de chacune au travers d'expériences uniques.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily: "'Playfair Display', Georgia, serif",
    color: "#2A2421",
  },
  heroBanner: {
    backgroundColor: "#2A2421",
    backgroundImage: "linear-gradient(rgba(42, 36, 33, 0.88), rgba(42, 36, 33, 0.88)), url('/ab.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "90px 20px 70px 20px",
    textAlign: "center",
    color: "#ffffff",
  },
  heroOverlay: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroLogo: {
    maxHeight: "80px",
    width: "auto",
    marginBottom: "20px",
    objectFit: "contain",
  },
  heroSubtitle: {
    fontSize: "13px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#C19A90",
    marginBottom: "12px",
    display: "block",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  heroTitle: {
    fontSize: "46px",
    fontWeight: "600",
    marginBottom: "16px",
    lineHeight: "1.2",
  },
  heroDescription: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#E5DCD8",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  section: {
    padding: "80px 20px 100px 20px",
    overflow: "hidden",
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "50px",
  },
  leftColumn: {
    position: "relative",
    width: "50%",
    minHeight: "520px",
    display: "flex",
    justifyContent: "flex-end",
  },
  mainImageWrapper: {
    width: "78%",
    height: "530px",
    borderRadius: "2px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    zIndex: 2,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  overlayImageCard: {
    position: "absolute",
    bottom: "60px",
    left: "-20px",
    width: "290px",
    height: "185px",
    borderRadius: "2px",
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0,0,0,0.18)",
    border: "6px solid #ffffff",
    zIndex: 3,
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  rightColumn: {
    width: "50%",
    paddingLeft: "20px",
    boxSizing: "border-box",
  },
  brandBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  inlineLogo: {
    height: "30px",
    width: "auto",
    objectFit: "contain",
  },
  subtitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#6C534E",
    letterSpacing: "1px",
    textTransform: "uppercase",
    display: "block",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  mainTitle: {
    fontSize: "40px",
    fontWeight: "600",
    lineHeight: "1.25",
    color: "#544B45",
    margin: "8px 0 16px 0",
    letterSpacing: "-0.5px",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "22px",
  },
  dottedLine: {
    color: "#C19A90",
    fontSize: "12px",
    letterSpacing: "2px",
  },
  paragraph: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#776E65",
    fontFamily: "system-ui, -apple-system, sans-serif",
    margin: "0 0 20px 0",
  },
  quoteBlock: {
    borderLeft: "2px solid #544B45",
    paddingLeft: "20px",
    margin: "0 0 25px 0",
    fontSize: "15px",
    fontStyle: "italic",
    lineHeight: "1.8",
    color: "#544B45",
  },
};