
"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const About: React.FC = () => {
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
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section"
      style={styles.section}
    >
      <style>{`
        /* Animation d'apparition */
        .animate-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out,
                      transform 0.8s ease-out;
        }

        .animate-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Délais des animations */
        .delay-1 {
          transition-delay: 0.2s;
        }

        .delay-2 {
          transition-delay: 0.4s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up,
          .animate-fade-up.visible {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* Tablettes */
        @media (max-width: 1024px) {
          .about-container {
            flex-direction: column !important;
            gap: 60px !important;
          }

          .about-left-column,
          .about-right-column {
            width: 100% !important;
          }

          .about-right-column {
            padding-left: 0 !important;
          }

          .about-left-column {
            max-width: 650px;
            margin: 0 auto;
          }
        }

        /* Mobiles */
        @media (max-width: 640px) {
          .about-section {
            padding: 60px 20px !important;
          }

          .main-image-wrapper {
            height: 420px !important;
          }

          .overlay-image-card {
            width: 220px !important;
            height: 140px !important;
            left: -10px !important;
            bottom: 40px !important;
          }

          .main-title {
            font-size: 32px !important;
          }
        }

        /* Petits mobiles */
        @media (max-width: 380px) {
          .main-image-wrapper {
            height: 340px !important;
          }

          .overlay-image-card {
            width: 185px !important;
            height: 120px !important;
          }

          .main-title {
            font-size: 28px !important;
          }
        }
      `}</style>

      <div
        className="about-container"
        style={styles.container}
      >
        {/* COLONNE GAUCHE : PHOTOS DE L'INSTITUT */}
        <div
          className={`about-left-column animate-fade-up delay-1 ${
            isVisible ? "visible" : ""
          }`}
          style={styles.leftColumn}
        >
          {/* Image principale */}
          <div
            className="main-image-wrapper"
            style={styles.mainImageWrapper}
          >
            <img
              src="/ab.jpg"
              alt="Soin du visage et moment de détente"
              style={styles.mainImage}
              loading="lazy"
            />
          </div>

          {/* Image secondaire */}
          <div
            className="overlay-image-card"
            style={styles.overlayImageCard}
          >
            <img
              src="/ab2.jpeg"
              alt="Massage relaxant aux pierres chaudes"
              style={styles.overlayImage}
              loading="lazy"
            />
          </div>
        </div>

        {/* COLONNE DROITE : PRÉSENTATION */}
        <div
          className={`about-right-column animate-fade-up delay-2 ${
            isVisible ? "visible" : ""
          }`}
          style={styles.rightColumn}
        >
          <span style={styles.subtitle}>
            À propos de Secret Beauty &amp; Spa
          </span>

          <h2 className="main-title" style={styles.mainTitle}>
            Votre beauté, notre passion.
          </h2>

          {/* Séparateur décoratif */}
          <div style={styles.dividerContainer}>
            <span style={styles.dottedLine}>- - - - - -</span>

            <svg
              width="26"
              height="20"
              viewBox="0 0 24 20"
              fill="#6C534E"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
              aria-hidden="true"
            >
              <path d="M12 0C9.5 6 9.5 14 12 20C14.5 14 14.5 6 12 0Z" />
              <path d="M11 6C6 2 2 4 1 11C6 11 10 9 11.5 6Z" />
              <path d="M13 6C18 2 22 4 23 11C18 11 14 9 12.5 6Z" />
            </svg>

            <span style={styles.dottedLine}>- - - - - -</span>
          </div>

          <p style={styles.paragraph}>
            Bienvenue chez Secret Beauty &amp; Spa, votre espace
            dédié à la beauté et au bien-être à Dakar, au Sénégal.
            Nous croyons que prendre soin de soi est bien plus
            qu'une simple routine : c'est un moment privilégié
            pour se ressourcer, retrouver confiance en soi et
            révéler sa beauté naturelle.
          </p>

          <blockquote style={styles.quoteBlock}>
            « La véritable beauté commence lorsque l'on prend
            le temps de prendre soin de soi. Offrez-vous un
            instant de détente, de douceur et de bien-être. »
          </blockquote>

          <p style={styles.paragraph}>
            Des soins de beauté aux massages relaxants, nous
            souhaitons vous offrir une expérience agréable
            dans une atmosphère accueillante et apaisante.
            Nous sommes à votre écoute pour vous accompagner
            dans le choix des soins adaptés à vos envies et
            à vos besoins.
          </p>

          <a
            href="https://wa.me/221776913230?text=Bonjour%20Secret%20Beauty%20%26%20Spa%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20prestations."
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
          >
            <span>DÉCOUVRIR NOS SOINS</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "80px 20px",
    backgroundColor: "#ffffff",
    fontFamily: "'Playfair Display', Georgia, serif",
    color: "#2A2421",
    overflow: "hidden",
  },

  container: {
    maxWidth: "1140px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "50px",
  },

  /* COLONNE GAUCHE */
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

  /* COLONNE DROITE */
  rightColumn: {
    width: "50%",
    paddingLeft: "20px",
    boxSizing: "border-box",
  },

  subtitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#6C534E",
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: "12px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  mainTitle: {
    fontSize: "42px",
    fontWeight: "600",
    lineHeight: "1.2",
    color: "#544B45",
    margin: "0 0 16px 0",
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
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#776E65",
    fontFamily: "system-ui, -apple-system, sans-serif",
    margin: "0 0 25px 0",
  },

  quoteBlock: {
    borderLeft: "2px solid #544B45",
    paddingLeft: "20px",
    margin: "0 0 30px 0",
    fontSize: "15px",
    fontStyle: "italic",
    lineHeight: "1.8",
    color: "#544B45",
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#6C534E",
    color: "#ffffff",
    padding: "14px 32px",
    borderRadius: "25px",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "none",
    letterSpacing: "0.5px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxShadow: "0 4px 15px rgba(108, 83, 78, 0.25)",
  },
};

export default About;
