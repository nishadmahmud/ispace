"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatBDT } from "@/data/emi-banks";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import QuickViewModal from "./QuickViewModal";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const selectedColor = product.colors?.[0]?.name || "";
  const isFavorited = isInWishlist(product.id);
  const discountPct =
    product.regularPrice > product.price
      ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
      : 0;

  return (
    <>
      <div className="group relative rounded-3xl bg-gradient-to-b from-[#1a1f28] to-[#141820] border border-white/[0.07] hover:border-white/15 shadow-[0_8px_28px_rgba(0,0,0,0.28)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {discountPct > 0 && (
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#c45c5c] text-white tracking-wide shadow-md shadow-black/30">
              {discountPct}%
            </span>
          )}
          {product.badge && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#12151a]/90 border border-white/10 text-[#9aa3af] backdrop-blur-xs">
              {product.badge}
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-2xl border transition-all ${
            isFavorited
              ? "bg-[#c45c5c]/15 text-[#c45c5c] border-[#c45c5c]/30"
              : "bg-black/30 text-[#6b7280] border-white/5 hover:text-[#e8eaed] hover:bg-white/10"
          }`}
          title="Wishlist"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-[#c45c5c]" : ""}`} />
        </button>

        <div className="relative px-3 pt-10 pb-2 flex items-center justify-center">
          <Link
            href={`/product/${product.slug}`}
            className="img-well block w-full h-40 sm:h-44 relative overflow-hidden rounded-2xl"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain object-center p-3 mix-blend-normal group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1.5 rounded-full bg-[#0c0e12]/90 border border-[#2a2e37] text-[#e8eaed] text-[10px] font-bold items-center gap-1.5"
          >
            <Eye className="w-3 h-3" /> Quick View
          </button>
        </div>

        <div className="px-3.5 pb-3.5 flex-1 flex flex-col gap-2.5">
          <div>
            <p className="text-[10px] text-[#6b7280] font-medium mb-0.5">
              {product.inStock ? (
                <span className="text-emerald-400">In Stock</span>
              ) : (
                <span className="text-[#c45c5c]">Out of Stock</span>
              )}
              <span className="text-[#3d4450]"> · </span>
              {product.brand}
            </p>
            <Link
              href={`/product/${product.slug}`}
              className="block font-bold text-xs sm:text-[13px] text-[#e8eaed] hover:text-white line-clamp-2 transition-colors leading-snug min-h-[2.4em]"
            >
              {product.name}
            </Link>
          </div>

          <div className="mt-auto space-y-2.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm sm:text-[15px] font-black text-[#e8eaed]">
                {formatBDT(product.price)}
              </span>
              {product.regularPrice > product.price && (
                <span className="text-[11px] text-[#6b7280] line-through">
                  {formatBDT(product.regularPrice)}
                </span>
              )}
            </div>

            <button
              onClick={() =>
                addToCart(product, {
                  color: selectedColor || product.colors?.[0]?.name,
                  storage: product.storage?.[0]?.size,
                })
              }
              className="w-full py-2.5 px-3 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
