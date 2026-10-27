"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatBDT, calculateEMI } from "@/data/emi-banks";
import { Heart, ShoppingBag, Eye, Scale, Star } from "lucide-react";
import QuickViewModal from "./QuickViewModal";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, isInCompare } = useStore();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const emiPerMonth = calculateEMI(product.price, 36);

  return (
    <>
      <div className="group relative rounded-2xl bg-white border border-gray-200 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl">
        {/* Top Badges & Actions */}
        <div className="p-3 pb-0 flex items-start justify-between z-10">
          <div className="flex flex-col gap-1 items-start">
            {product.flashDiscount ? (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#ef233c] text-white tracking-wide uppercase shadow-2xs">
                {product.flashDiscount}
              </span>
            ) : product.badge ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200 tracking-wide uppercase">
                {product.badge}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => addToCompare(product)}
              className={`p-1.5 rounded-xl border transition-all ${
                isCompared
                  ? "bg-red-50 text-[#ef233c] border-red-300"
                  : "bg-white text-gray-500 border-gray-200 hover:text-black hover:bg-gray-100"
              }`}
              title="Compare"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-1.5 rounded-xl border transition-all ${
                isFavorited
                  ? "bg-red-50 text-[#ef233c] border-red-300"
                  : "bg-white text-gray-500 border-gray-200 hover:text-black hover:bg-gray-100"
              }`}
              title="Wishlist"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isFavorited ? "fill-[#ef233c]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Product Image Showcase */}
        <div className="relative p-4 pt-1 flex items-center justify-center overflow-hidden">
          <Link
            href={`/product/${product.slug}`}
            className="block w-full h-48 sm:h-52 relative overflow-hidden rounded-xl bg-gray-50"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Quick View Button overlay on hover */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs border border-gray-200 text-gray-900 text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:bg-gray-50"
          >
            <Eye className="w-3.5 h-3.5 text-[#ef233c]" /> Quick View
          </button>
        </div>

        {/* Details & Info */}
        <div className="p-4 pt-1 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Brand & Category & Rating */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
              <span className="font-bold text-gray-500 uppercase tracking-wider">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3 h-3 fill-amber-500" />
                <span className="font-bold text-gray-800">{product.rating}</span>
                <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
              </div>
            </div>

            {/* Title */}
            <Link
              href={`/product/${product.slug}`}
              className="block font-bold text-sm text-gray-900 hover:text-red-600 line-clamp-2 transition-colors leading-snug"
            >
              {product.name}
            </Link>

            {/* Color preview swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedColor === c.name
                        ? "border-[#ef233c] ring-1 ring-[#ef233c] scale-110"
                        : "border-gray-300 opacity-80 hover:opacity-100"
                    }`}
                    title={c.name}
                  />
                ))}
                <span className="text-[10px] text-gray-400 ml-1">
                  {product.colors.length} {product.colors.length === 1 ? "color" : "colors"}
                </span>
              </div>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-base font-black text-gray-900">
                  {formatBDT(product.price)}
                </span>
                {product.regularPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through ml-2">
                    {formatBDT(product.regularPrice)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                EMI from {formatBDT(emiPerMonth)}/mo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href={`/product/${product.slug}`}
                className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 text-xs font-bold text-center transition-all"
              >
                Details
              </Link>
              <button
                onClick={() =>
                  addToCart(product, {
                    color: selectedColor || product.colors?.[0]?.name,
                    storage: product.storage?.[0]?.size
                  })
                }
                className="w-full py-2 px-3 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
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
