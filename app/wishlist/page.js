"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/product/ProductCard";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-6 font-medium">
          <Link href="/" className="hover:text-[#e8eaed] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#e8eaed] font-bold">My Wishlist ({wishlist.length})</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#e8eaed] tracking-tight">
              Saved Favorites
            </h1>
            <p className="text-xs text-[#9aa3af] mt-1">
              Your personal gadget wishlist. Add to bag anytime or share with friends.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#c45c5c] hover:text-[#c45c5c] inline-flex items-center gap-1"
          >
            Explore More Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#14171c] border border-[#2a2e37] shadow-xs space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#1c1f26] flex items-center justify-center text-[#6b7280] mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-[#e8eaed]">Your Wishlist is Empty</h2>
            <p className="text-xs text-[#6b7280]">
              Click the heart icon on any gadget while browsing to save it here for later.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-block px-6 py-2.5 rounded-xl bg-[#c45c5c] text-white text-xs font-bold shadow-xs"
              >
                Start Exploring
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
