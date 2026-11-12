import React, { Suspense } from "react";
import ShopClient from "./ShopClient";
import { getNewArrivalsFromServer, getCategoriesFromServer } from "@/lib/api";
import { mapProductList } from "@/lib/productMapping";
import { slugifyProductName } from "@/lib/productSlug";

export const metadata = {
  title: "Shop All Tech & Mobile Gadgets | iSPACE BD",
  description: "Browse the full collection of authentic iPhones, MacBooks, Samsung flagships, smartwatches, and premium accessories at iSPACE BD.",
};

export const revalidate = 120;

export default async function ShopPage() {
  const [newArrivalsRes, categoriesRes] = await Promise.all([
    getNewArrivalsFromServer().catch(() => ({ success: false })),
    getCategoriesFromServer().catch(() => ({ success: false }))
  ]);

  const initialProducts = mapProductList(newArrivalsRes?.data?.data);
  const initialCategories =
    Array.isArray(categoriesRes?.data) && categoriesRes.data.length > 0
      ? categoriesRes.data.map((c) => ({
          id: c.category_id,
          name: c.name,
          slug: slugifyProductName(c.name),
          count: `${c.products_count || 0}+ Models`
        }))
      : null;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0c0e12] flex items-center justify-center text-[#e8eaed]">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#c45c5c] border-t-transparent rounded-full animate-spin" />
            <span>Loading iSPACE BD Catalog...</span>
          </div>
        </div>
      }
    >
      <ShopClient
        initialProducts={initialProducts}
        initialCategories={initialCategories}
      />
    </Suspense>
  );
}
