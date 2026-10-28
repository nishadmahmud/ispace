import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import AnnouncementMarquee from "@/components/home/AnnouncementMarquee";
import CategoryGrid from "@/components/home/CategoryGrid";
import FlashDeals from "@/components/home/FlashDeals";
import PromoBanners from "@/components/home/PromoBanners";
import ProductRail from "@/components/home/ProductRail";
import AppleShowcase from "@/components/home/AppleShowcase";
import CertifiedPreOwned from "@/components/home/CertifiedPreOwned";
import BrandBar from "@/components/home/BrandBar";
import ShowroomsSection from "@/components/home/ShowroomsSection";
import { products } from "@/data/products";

export const metadata = {
  title: "iSPACE BD | Premier Apple & Tech Gadget Store in Bangladesh",
  description:
    "Explore official Apple flagships, iPhones, MacBooks, Samsung, smartwatches, and tech accessories with official warranty and 0% EMI up to 36 months in Bangladesh.",
};

export default function HomePage() {
  const trending = products.filter((p) => p.featured && !p.isPreOwned);
  const newArrivals = [...products]
    .filter((p) => p.isNew && !p.isPreOwned)
    .sort((a, b) => b.reviewCount - a.reviewCount);
  const popular = [...products]
    .filter((p) => !p.isPreOwned)
    .sort((a, b) => b.reviewCount - a.reviewCount);
  const hotDeals = products.filter(
    (p) => p.regularPrice > p.price && !p.isPreOwned
  );

  return (
    <div className="min-h-screen text-[#e8eaed] flex flex-col">
      <HeroBanner />
      <AnnouncementMarquee />
      <CategoryGrid />
      <FlashDeals />
      <PromoBanners />
      <ProductRail
        title="Trending Now"
        subtitle="What shoppers are viewing right now"
        seeAllHref="/shop"
        products={trending}
        limit={5}
        lifted
        tabs={[
          { id: "newest", label: "Newest" },
          { id: "seller", label: "Best Seller" },
          { id: "value", label: "Best Value" },
        ]}
      />
      <BrandBar />
      <ProductRail
        title="New Arrivals"
        subtitle="Fresh stock just landed"
        seeAllHref="/shop"
        products={newArrivals.length ? newArrivals : products}
        limit={5}
        tabs={[
          { id: "newest", label: "Newest" },
          { id: "popular", label: "Popular" },
        ]}
      />
      <AppleShowcase />
      <ProductRail
        title="Most Popular"
        subtitle="Crowd favourites this week"
        seeAllHref="/shop"
        products={popular}
        limit={5}
      />
      <PromoBanners />
      <ProductRail
        title="Hot Deal of the Day"
        subtitle="Steepest discounts right now"
        seeAllHref="/shop?deal=flash"
        products={hotDeals}
        limit={5}
        lifted
      />
      <CertifiedPreOwned />
      <ShowroomsSection />
    </div>
  );
}
