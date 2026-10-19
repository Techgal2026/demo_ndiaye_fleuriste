"use client";

import React from "react";

const ServicesSection: React.FC = () => {
  const cards = [
    {
      image: "/c3.jpg",
      title: "Hammam & Massages",
      description:
        "Découvrez nos rituels de relaxation, gommages au savon noir, enveloppements et massages duo pour une détente absolue.",
      link: "https://wa.me/221776913230",
    },
    {
      image: "/c4.jpg",
      title: "Épilation & Laser",
      description:
        "Solutions douces à la cire chaude ou épilation définitive au LASER pour visage et corps avec des forfaits sur-mesure.",
      link: "https://wa.me/221776913230",
    },
    {
      image: "/c1.jpg",
      title: "Regard & Maquillage",
      description:
        "Sublimez vos yeux avec l'extension de cils, le rehaussement et le microblading, ou profitez de nos prestations maquillage à domicile.",
      link: "https://wa.me/221776913230",
    },
  ];

  return (
    <section style={styles.section}>
      <style>{`
        /* Définition de l'animation Fade-In Up */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up-section {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .card-button:hover {
          background-color: #51372a !important;
        }

        /* 2 colonnes sur tablettes et écrans moyens (jusqu'à 1024px) */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }

        /* 1 seule colonne sur très petits mobiles (en dessous de 600px) */
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="fade-in-up-section">
        {/* En-tête centré */}
        <div style={styles.headerContainer}>
          
          
          <div style={styles.dividerWrapper}>
            <span style={styles.dividerLine} />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#795548"
              style={{ margin: "0 10px" }}
            >
              <path d="M12 2C12 2 7 8 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 8 12 2 12 2ZM12 22C12 22 17 16 17 12" />
            </svg>
            <span style={styles.dividerLine} />
          </div>

          <h2 style={styles.mainTitle}>
            Une expérience de bien-être unique et sur-mesure pour révéler votre
            beauté naturelle.
          </h2>
        </div>

        {/* Grille de cartes */}
        <div className="services-grid" style={styles.grid}>
          {cards.map((card, index) => (
            <div key={index} className="service-card" style={styles.card}>
              <div style={styles.imageWrapper}>
                <img src={card.image} alt={card.title} style={styles.image} />
              </div>
              <div style={styles.cardContent}>
                <div>
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <p style={styles.cardDescription}>{card.description}</p>
                </div>
                <div style={styles.buttonWrapper}>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-button"
                    style={styles.cardButton}
                  >
                    RÉSERVER
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note d'information sous la grille */}
        <div style={styles.footerContainer}>
          <p style={styles.footerNote}>
            Prestations avec ou sans rendez-vous • Contact : secretbeautyspa136@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "80px 20px",
    backgroundColor: "#ffffff",
    textAlign: "center" as const,
    fontFamily: "'Playfair Display', Georgia, serif",
    color: "#4A3B32",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  /* En-tête */
  headerContainer: {
    maxWidth: "750px",
    margin: "0 auto 50px auto",
  },
  subtitle: {
    fontSize: "15px",
    color: "#6D5A4D",
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: "10px",
  },
  dividerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  dividerLine: {
    width: "40px",
    height: "1px",
    backgroundColor: "#A89284",
  },
  mainTitle: {
    fontSize: "32px",
    fontWeight: "600",
    lineHeight: "1.35",
    color: "#5B4A3E",
    margin: 0,
  },

  /* Grille des Cartes (3 par défaut sur grand écran) */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    marginBottom: "30px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left" as const,
    borderRadius: "2px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    backgroundColor: "#684838",
  },
  imageWrapper: {
    width: "100%",
    height: "210px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardContent: {
    padding: "25px 20px 30px 20px",
    color: "#ffffff",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: "20px",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: "normal",
    margin: "0 0 12px 0",
    color: "#ffffff",
  },
  cardDescription: {
    fontSize: "12px",
    lineHeight: "1.7",
    color: "#E5D8CF",
    margin: "0 0 20px 0",
    fontFamily: "sans-serif",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end", // Aligne le bouton à droite
  },
  cardButton: {
    display: "inline-block",
    backgroundColor: "#51372a",
    color: "#ffffff",
    padding: "10px 22px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1px",
    textAlign: "center" as const,
    textTransform: "uppercase",
    textDecoration: "none",
    borderRadius: "20px", // Coins bien arrondis
    transition: "background-color 0.3s ease",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  /* Section Note */
  footerContainer: {
    marginTop: "20px",
  },
  footerNote: {
    fontSize: "12px",
    color: "#8A796E",
    fontFamily: "sans-serif",
    margin: 0,
  },
};

export default ServicesSection;