"use client";

import Image from "next/image";
import React, { useState } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Why from "../components/Why";
import Collection from "../components/Collection";
import Tesmonials from "../components/Tesmonials";
import Footer from "../components/Footer";
import ReservationModal from "../components/ReservationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* ⚠️ C'est cette ligne qui connecte le bouton de la Navbar au modal */}
      <Navbar onOpenReservation={() => setIsModalOpen(true)} />
      
      <Hero />
      <About />
      <Why />
      <Collection />
      <Tesmonials />
      <Footer />

      {/* Le composant du modal global */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}