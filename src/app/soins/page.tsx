"use client";

import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ReservationModal, { ServiceItem, allAvailableServices } from "../../components/ReservationModal";

interface ServiceCategory {
  id: string;
  title: string;
  items?: ServiceItem[];
  subsections?: {
    subtitle: string;
    items: ServiceItem[];
  }[];
}

const servicesData: ServiceCategory[] = [
  {
    id: "cire",
    title: "Épilations à la Cire Chaude",
    items: [
      { name: "Épilation aisselles", price: "5 000 FCFA" },
      { name: "Épilation maillot simple", price: "7 000 FCFA" },
      { name: "Épilation brésilien", price: "10 000 FCFA" },
      { name: "Épilation ventre", price: "5 000 FCFA" },
      { name: "Épilation bas du dos", price: "5 000 FCFA" },
      { name: "Épilation dos complet", price: "10 000 FCFA" },
    ],
  },
  {
    id: "laser",
    title: "Épilation Définitive au Laser",
    subsections: [
      {
        subtitle: "Soins Individuels",
        items: [
          { name: "Laser menton", price: "25 000 FCFA" },
          { name: "Laser joues", price: "20 000 FCFA" },
          { name: "Laser visage complet", price: "60 000 FCFA" },
          { name: "Laser aisselles", price: "25 000 FCFA" },
          { name: "Laser maillot simple", price: "40 000 FCFA" },
          { name: "Laser maillot brésilien", price: "55 000 FCFA" },
          { name: "Laser intégral", price: "70 000 FCFA" },
          { name: "Laser demi-jambe", price: "75 000 FCFA" },
          { name: "Laser jambe complète", price: "120 000 FCFA" },
          { name: "Laser cuisses", price: "70 000 FCFA" },
          { name: "Laser demi-bras", price: "50 000 FCFA" },
          { name: "Laser bras entier", price: "70 000 FCFA" },
          { name: "Laser ventre", price: "40 000 FCFA" },
          { name: "Laser bas du dos", price: "40 000 FCFA" },
          { name: "Laser dos complet", price: "70 000 FCFA" },
        ],
      },
      {
        subtitle: "Forfaits Laser",
        items: [
          { name: "Forfait 1 (Laser)", description: "Aisselles + Maillot intégral + Jambe complète", price: "195 000 FCFA" },
          { name: "Forfait 2 (Laser)", description: "Aisselles + Maillot simple + Demi-jambe", price: "120 000 FCFA" },
          { name: "Forfait 3 (Laser)", description: "Aisselles + Maillot brésilien + Demi-bras", price: "200 000 FCFA" },
          { name: "Forfait 4 (Laser)", description: "Aisselles + Maillot intégral + Demi-jambe + Bras entier", price: "200 000 FCFA" },
          { name: "Forfait 5 (Laser)", description: "Aisselles + Maillot intégral + Bras entier + Jambe entière", price: "230 000 FCFA" },
        ],
      },
    ],
  },
  {
    id: "hammam",
    title: "Hammam & Rituels",
    subsections: [
      {
        subtitle: "Formules Hammam",
        items: [
          { name: "Hammam classic + savonnage", price: "30 000 FCFA" },
          { name: "Hammam + enveloppement", price: "55 000 FCFA" },
          { name: "Hammam + massage (1h)", price: "60 000 FCFA" },
        ],
      },
      {
        subtitle: "Forfaits Hammam Solo",
        items: [
          { name: "Forfait 1 (Hammam Solo)", description: "Hammam + Enveloppement + Massage (1h)", price: "85 000 FCFA" },
          { name: "Forfait 2 (Hammam Solo)", description: "Hammam + Pédicure/Manucure + Soin du visage", price: "80 000 FCFA" },
          { name: "Forfait 3 (Hammam Solo)", description: "Gommage corps + Massage (1h) + Enveloppement", price: "70 000 FCFA" },
          { name: "Forfait 4 (Hammam Solo)", description: "Massage (30 min) + Pédicure/Manucure", price: "35 000 FCFA" },
          { name: "Forfait 5 (Hammam Solo)", description: "Hammam + Enveloppement + Soin du visage + Massage + Pédicure/Manucure", price: "130 000 FCFA" },
        ],
      },
    ],
  },
  {
    id: "hammam-duo",
    title: "Hammam en Duo",
    items: [
      { name: "Hammam + Enveloppement duo", price: "110 000 FCFA" },
      { name: "Hammam + Massage (1h) duo", price: "120 000 FCFA" },
      { name: "Hammam + Pédicure/Manucure + Massage (1h) duo", price: "160 000 FCFA" },
      { name: "Hammam + Enveloppement + Massage (1h) duo", price: "170 000 FCFA" },
      { name: "Gommage corps + Massage duo", price: "100 000 FCFA" },
      { name: "Hammam + Massage (1h) + Soin du visage + Enveloppement duo", price: "230 000 FCFA" },
      { name: "Gommage corps + Massage (1h) + Enveloppement + Soin du visage duo", price: "210 000 FCFA" },
    ],
  },
  {
    id: "soin-intime",
    title: "Soins Intimes",
    items: [
      { name: "Soin aisselles", price: "20 000 FCFA" },
      { name: "Soin aisselles + Épilation", price: "25 000 FCFA" },
    ],
  },
  {
    id: "regard",
    title: "Embellir le Regard",
    items: [
      { name: "Faux cils", price: "10 000 FCFA" },
      { name: "Extensions cils", price: "30 000 FCFA" },
      { name: "Volume russe", price: "50 000 FCFA" },
      { name: "Dépose cils", price: "10 000 FCFA" },
      { name: "Teinture cils", price: "8 000 FCFA" },
      { name: "Teinture sourcils", price: "8 000 FCFA" },
      { name: "Henna brown + Épilation", price: "20 000 FCFA" },
      { name: "Rehaussement cils", price: "35 000 FCFA" },
    ],
  },
  {
    id: "maquillage",
    title: "Tatouage Permanent & Maquillage",
    items: [
      { name: "Microblading", price: "100 000 FCFA" },
      { name: "Maquillage du jour", price: "35 000 FCFA" },
      { name: "Maquillage soirée", price: "40 000 FCFA" },
      { name: "Maquillage mariée", price: "120 000 FCFA" },
      { name: "Maquillage à domicile / hôtel", price: "170 000 FCFA" },
    ],
  },
];

export default function SpaBeautyMenuPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  // États pour contrôler le modal global et le soin cliqué
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenModal = (item?: ServiceItem) => {
    if (item) {
      setSelectedService(item);
    } else {
      setSelectedService(null);
    }
    setIsModalOpen(true);
  };

  const filteredCategories = servicesData.filter(
    (cat) => activeTab === "all" || cat.id === activeTab
  );

  return (
    <>
      {/* 1. On connecte la Navbar pour qu'elle ouvre le modal au clic sur "Réserver" */}
      <Navbar onOpenReservation={() => handleOpenModal()} />

      <section style={styles.section}>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in-up-section { animation: fadeInUp 0.8s ease-out forwards; }
          .service-item-row { transition: background-color 0.2s ease, transform 0.2s ease; }
          .service-item-row:hover { background-color: #583c2f !important; transform: translateX(3px); }
          .card-button { transition: background-color 0.3s ease; cursor: pointer; }
          .card-button:hover { background-color: #51372a !important; }
          .tab-button { transition: all 0.3s ease; }
          .tab-button:hover { background-color: #684838; color: #ffffff; }

          .services-grid-pricing { align-items: stretch; }
          .service-card { min-width: 0; height: 560px; display: flex; flex-direction: column; }
          .service-card-content {
            flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden;
            scrollbar-width: thin; scrollbar-color: #b49a89 #684838;
          }
          .service-card-content::-webkit-scrollbar { width: 6px; }
          .service-card-content::-webkit-scrollbar-thumb { background: #b49a89; border-radius: 10px; }
          .service-card-footer { flex-shrink: 0; padding: 0 18px 18px; background-color: #684838; }

          @media (max-width: 1024px) {
            .services-grid-pricing { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 640px) {
            .services-grid-pricing { grid-template-columns: minmax(0, 1fr) !important; }
            .service-card { height: 480px; }
          }
        `}</style>

        <div className="fade-in-up-section">
          {/* En-tête */}
          <div style={styles.headerContainer}>
            <div style={styles.dividerWrapper}>
              <span style={styles.dividerLine} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#795548" style={{ margin: "0 10px" }} aria-hidden="true">
                <path d="M12 2C12 2 7 8 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 8 12 2 12 2ZM12 22C12 22 17 16 17 12" />
              </svg>
              <span style={styles.dividerLine} />
            </div>

            <h2 style={styles.mainTitle}>Secret Beauty & Spa</h2>
            <p style={styles.subHeaderText}>
              Consultez l&apos;ensemble de nos tarifs et offrez-vous une parenthèse de bien-être sur-mesure.
            </p>

            <div style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => handleOpenModal()}
                style={styles.globalBookingBtn}
              >
                Faire une réservation personnalisée
              </button>
            </div>
          </div>

          {/* Filtres par catégorie */}
          <div style={styles.filterContainer}>
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className="tab-button"
              style={{
                ...styles.tabButton,
                ...(activeTab === "all" ? styles.tabButtonActive : styles.tabButtonInactive),
              }}
            >
              Tous les soins
            </button>

            {servicesData.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="tab-button"
                style={{
                  ...styles.tabButton,
                  ...(activeTab === cat.id ? styles.tabButtonActive : styles.tabButtonInactive),
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Grille des cartes */}
          <div className="services-grid-pricing" style={styles.grid}>
            {filteredCategories.map((category) => (
              <div key={category.id} className="service-card" style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardCategoryTitle}>{category.title}</h3>
                </div>

                <div className="service-card-content" style={styles.cardContent}>
                  {category.items && (
                    <div style={styles.itemList}>
                      {category.items.map((item, idx) => (
                        <div
                          key={`${category.id}-item-${idx}`}
                          className="service-item-row"
                          style={styles.itemRow}
                          onClick={() => handleOpenModal(item)}
                          title="Cliquer pour ajouter à la réservation"
                        >
                          <div style={styles.itemInfo}>
                            <span style={styles.itemName}>{item.name}</span>
                            {item.description && <span style={styles.itemDesc}>{item.description}</span>}
                          </div>
                          <span style={styles.itemPrice}>{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {category.subsections && (
                    <div style={styles.subsectionsWrapper}>
                      {category.subsections.map((sub, sIdx) => (
                        <div key={`${category.id}-sub-${sIdx}`} style={styles.subsectionBlock}>
                          <h4 style={styles.subTitle}>{sub.subtitle}</h4>
                          <div style={styles.itemList}>
                            {sub.items.map((item, idx) => (
                              <div
                                key={`${category.id}-${sIdx}-item-${idx}`}
                                className="service-item-row"
                                style={styles.itemRow}
                                onClick={() => handleOpenModal(item)}
                                title="Cliquer pour ajouter à la réservation"
                              >
                                <div style={styles.itemInfo}>
                                  <span style={styles.itemName}>{item.name}</span>
                                  {item.description && <span style={styles.itemDesc}>{item.description}</span>}
                                </div>
                                <span style={styles.itemPrice}>{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="service-card-footer">
                  <div style={styles.buttonWrapper}>
                    <button
                      type="button"
                      onClick={() => handleOpenModal()}
                      className="card-button"
                      style={styles.cardButton}
                    >
                      RÉSERVER CE SOIN
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* 2. Intégration propre du Modal Global sur la page des soins */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialSelectedService={selectedService}
      />
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "60px 15px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontFamily: "'Playfair Display', Georgia, serif",
    color: "#4A3B32",
    maxWidth: "1250px",
    margin: "0 auto",
    boxSizing: "border-box",
    width: "100%",
  },
  headerContainer: { maxWidth: "700px", margin: "0 auto 30px auto" },
  dividerWrapper: { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" },
  dividerLine: { width: "35px", height: "1px", backgroundColor: "#A89284" },
  mainTitle: { fontSize: "30px", fontWeight: "600", lineHeight: "1.25", color: "#5B4A3E", margin: "0 0 8px 0" },
  subHeaderText: { fontSize: "14px", lineHeight: "1.7", color: "#6D5A4D", fontFamily: "sans-serif", margin: 0 },
  globalBookingBtn: {
    backgroundColor: "#684838",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  filterContainer: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "35px" },
  tabButton: {
    padding: "8px 14px",
    fontSize: "11px",
    letterSpacing: "0.5px",
    borderRadius: "18px",
    cursor: "pointer",
    fontFamily: "sans-serif",
    border: "1px solid #C8B5A6",
  },
  tabButtonActive: { backgroundColor: "#684838", color: "#ffffff", borderColor: "#684838" },
  tabButtonInactive: { backgroundColor: "#ffffff", color: "#684838" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px", marginBottom: "30px", textAlign: "left", width: "100%" },
  card: { display: "flex", flexDirection: "column", borderRadius: "4px", overflow: "hidden", boxShadow: "0 6px 15px rgba(0,0,0,0.05)", backgroundColor: "#684838" },
  cardHeader: { flexShrink: 0, padding: "16px 18px 12px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "#684838" },
  cardCategoryTitle: { fontSize: "18px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "normal", margin: 0, color: "#ffffff" },
  cardContent: { padding: "15px 18px", color: "#ffffff", display: "flex", flexDirection: "column", gap: "15px", boxSizing: "border-box" },
  subsectionsWrapper: { display: "flex", flexDirection: "column", gap: "18px" },
  subsectionBlock: { display: "flex", flexDirection: "column", gap: "8px" },
  subTitle: { fontSize: "12px", letterSpacing: "0.8px", textTransform: "uppercase", color: "#E5D8CF", margin: "3px 0 0 0", borderBottom: "1px dashed rgba(255,255,255,0.2)", paddingBottom: "6px" },
  itemList: { display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 },
  itemRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", padding: "9px 10px", borderRadius: "3px", backgroundColor: "rgba(255, 255, 255, 0.03)", cursor: "pointer" },
  itemInfo: { display: "flex", flexDirection: "column", gap: "3px", flex: "1 1 auto" },
  itemName: { fontSize: "13px", color: "#ffffff", fontFamily: "sans-serif" },
  itemDesc: { fontSize: "11px", color: "#D4C3B9", fontFamily: "sans-serif" },
  itemPrice: { fontSize: "12px", fontWeight: "bold", color: "#FFF5EE", fontFamily: "sans-serif", whiteSpace: "nowrap" },
  buttonWrapper: { display: "flex", justifyContent: "flex-end", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" },
  cardButton: { backgroundColor: "#51372a", color: "#ffffff", padding: "9px 18px", fontSize: "10px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.2)" },
};