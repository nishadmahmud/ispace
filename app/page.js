import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import AnnouncementMarquee from "@/components/home/AnnouncementMarquee";
import CategoryGrid from "@/components/home/CategoryGrid";
import FlashDeals from "@/components/home/FlashDeals";
import PromoBanners from "@/components/home/PromoBanners";
import ProductRail from "@/components/home/ProductRail";
import AppleShowcase from "@/components/home/AppleShowcase";
import BrandBar from "@/components/home/BrandBar";
import ShowroomsSection from "@/components/home/ShowroomsSection";
import { products as fallbackProducts } from "@/data/products";
import {
  getCategoriesFromServer,
  getSlidersFromServer,
  getNewArrivalsFromServer,
  getBestDealsFromServer,
  getBestSellersFromServer
} from "@/lib/api";
import { mapProductList } from "@/lib/productMapping";
import { slugifyProductName } from "@/lib/productSlug";

export const metadata = {
  title: "iSPACE BD | Premier Apple & Tech Gadget Store in Bangladesh",
  description:
    "Explore official Apple flagships, iPhones, MacBooks, Samsung, smartwatches, and tech accessories with official warranty and 0% EMI up to 36 months in Bangladesh.",
};

export const revalidate = 120;

export default async function HomePage() {
  const [
    categoriesRes,
    slidersRes,
    newArrivalsRes,
    bestDealsRes,
    bestSellersRes
  ] = await Promise.all([
    getCategoriesFromServer().catch(() => ({ success: false })),
    getSlidersFromServer().catch(() => ({ success: false })),
    getNewArrivalsFromServer().catch(() => ({ success: false })),
    getBestDealsFromServer().catch(() => ({ success: false })),
    getBestSellersFromServer().catch(() => ({ success: false }))
  ]);

  // Sliders mapping
  const mappedSliders =
    Array.isArray(slidersRes?.sliders) && slidersRes.sliders.length > 0
      ? slidersRes.sliders.map((s, idx) => {
          let href = "/shop";
          if (s.product_id) {
            href = `/product/${s.product_id}`;
          } else if (s.link) {
            try {
              const url = new URL(s.link);
              href = url.pathname;
            } catch {
              href = s.link;
            }
          }
          return {
            id: s.id || idx + 1,
            title: s.title || "Special Offer",
            href,
            image: s.image_path,
            alt: s.title || "Banner",
          };
        })
      : null;

  // Categories mapping
  const mappedCategories =
    Array.isArray(categoriesRes?.data) && categoriesRes.data.length > 0
      ? categoriesRes.data.map((c) => ({
          id: c.category_id,
          name: c.name,
          slug: slugifyProductName(c.name),
          image: c.image_url || c.banner || "/icon.png",
          banner: c.banner || c.image_url || "/icon.png",
          count: `${c.products_count || 0}+ Models`,
        }))
      : null;

  // Products mapping
  const apiNewArrivals = mapProductList(newArrivalsRes?.data?.data);
  const apiBestDeals = mapProductList(bestDealsRes?.data);
  const apiBestSellers = mapProductList(bestSellersRes?.data);

  const newArrivals = apiNewArrivals.length > 0
    ? apiNewArrivals
    : fallbackProducts.filter((p) => p.isNew && !p.isPreOwned);

  const hotDeals = apiBestDeals.length > 0
    ? apiBestDeals
    : fallbackProducts.filter((p) => p.isFlashDeal || (p.regularPrice > p.price && !p.isPreOwned));

  const trending = apiBestSellers.length > 0
    ? apiBestSellers
    : fallbackProducts.filter((p) => p.featured && !p.isPreOwned);

  const popular = apiBestSellers.length > 0
    ? apiBestSellers
    : [...fallbackProducts].sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <div className="min-h-screen text-[#e8eaed] flex flex-col">
      <HeroBanner slides={mappedSliders} />
      <AnnouncementMarquee />
      <CategoryGrid categories={mappedCategories} />
      <FlashDeals items={hotDeals} />
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
        products={newArrivals}
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
      <ShowroomsSection />
    </div>
  );
}
