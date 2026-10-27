import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FlashDeals from "@/components/home/FlashDeals";
import AppleShowcase from "@/components/home/AppleShowcase";
import CertifiedPreOwned from "@/components/home/CertifiedPreOwned";
import BrandBar from "@/components/home/BrandBar";
import ShowroomsSection from "@/components/home/ShowroomsSection";

export const metadata = {
  title: "iSPACE BD | Premier Apple & Tech Gadget Store in Bangladesh",
  description: "Explore official Apple flagships, iPhones, MacBooks, Samsung, smartwatches, and tech accessories with official warranty and 0% EMI up to 36 months in Bangladesh.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col">
      {/* 1. Hero Flagship Carousel */}
      <HeroBanner />

      {/* 2. Visual Department Grid */}
      <CategoryGrid />

      {/* 3. Limited Time Flash Deals with Countdown */}
      <FlashDeals />

      {/* 4. Curated Apple Showcase */}
      <AppleShowcase />

      {/* 5. iSPACE Recell Certified Pre-Owned */}
      <CertifiedPreOwned />

      {/* 6. Multi-Brand Logos */}
      <BrandBar />

      {/* 7. Physical Experience Showrooms */}
      <ShowroomsSection />
    </div>
  );
}
