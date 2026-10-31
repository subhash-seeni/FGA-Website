"use client";

import React, { useState } from "react";
import FloatingNav from "@/components/navigation/FloatingNav";
import CinematicHero from "@/components/hero/CinematicHero";
import KineticTicker from "@/components/ticker/KineticTicker";
import AssetVaultSection from "@/components/vault/AssetVaultSection";
import FinancialEquationSection from "@/components/value/FinancialEquationSection";
import VelocityLineSection from "@/components/velocity/VelocityLineSection";
import ClosingMonolith from "@/components/monolith/ClosingMonolith";
import TypographicFooter from "@/components/footer/TypographicFooter";
import LeaseEnquiryModal from "@/components/modal/LeaseEnquiryModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("luxury-fleet");

  const handleOpenEnquiry = (category: string = "luxury-fleet") => {
    setModalCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Playful Floating Pill Dock Navigation */}
      <FloatingNav onOpenEnquiry={() => handleOpenEnquiry("luxury-fleet")} />

      <main id="main-content" style={{ flex: 1 }}>
        {/* 2. Cinematic Hero with Exaggerated Display Typography & 3D Tilt Asset Window */}
        <CinematicHero onOpenEnquiry={() => handleOpenEnquiry("luxury-fleet")} />

        {/* 3. High-Contrast Monospace Kinetic Horizon Ticker */}
        <KineticTicker />

        {/* 4. The Asset Vault: Interactive 3D Tilt Cards for Luxury Fleet, Equipment & IT */}
        <AssetVaultSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 5. The Financial Equation: Interactive CapEx vs OpEx Balance & Founder's Statement */}
        <FinancialEquationSection />

        {/* 6. The 48-Hour Velocity Line: Interactive 5-Step Process Scrubber */}
        <VelocityLineSection onOpenEnquiry={() => handleOpenEnquiry("luxury-fleet")} />

        {/* 7. Closing Monolith: Dark Illuminated Stage with Dual Magnetic Actions */}
        <ClosingMonolith onOpenEnquiry={handleOpenEnquiry} />
      </main>

      {/* 8. Typographic Horizon Footer: Screen-Spanning Hollow FIRSTGEN Watermark */}
      <TypographicFooter />

      {/* Interactive Commercial Lease Enquiry Modal */}
      <LeaseEnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        initialCategory={modalCategory}
      />
    </div>
  );
}
