import React, { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Shop All Tech & Mobile Gadgets | iSPACE BD",
  description: "Browse the full collection of authentic iPhones, MacBooks, Samsung flagships, smartwatches, and premium accessories at iSPACE BD.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#ef233c] border-t-transparent rounded-full animate-spin" />
          <span>Loading iSPACE BD Catalog...</span>
        </div>
      </div>
    }>
      <ShopClient />
    </Suspense>
  );
}
