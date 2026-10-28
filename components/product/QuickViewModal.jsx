"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatBDT, calculateEMI } from "@/data/emi-banks";
import { X, ShoppingBag, Heart, Star, ArrowRight } from "lucide-react";

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || ""
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0]?.size || ""
  );
  const [priceOffset, setPriceOffset] = useState(
    product.storage?.[0]?.priceOffset || 0
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen) return null;

  const currentPrice = product.price + priceOffset;
  const isFavorited = isInWishlist(product.id);

  const handleStorageChange = (item) => {
    setSelectedStorage(item.size);
    setPriceOffset(item.priceOffset);
  };

  const handleAddToCart = () => {
    addToCart(product, {
      color: selectedColor,
      storage: selectedStorage,
      priceOffset: priceOffset
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 text-[#e8eaed] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#6b7280] hover:text-[#e8eaed] rounded-xl bg-[#1c1f26] hover:bg-[#2a2e37] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#1c1f26] border border-[#2a2e37]">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-[#c45c5c]"
                          : "border-[#2a2e37] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Variants */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#6b7280] mb-1">
                  Brand: <span className="font-semibold text-[#e8eaed]">{product.brand}</span>
                </p>
                <h2 className="text-xl font-bold text-[#e8eaed] leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#6b7280]">
                  <div className="flex items-center gap-1 text-[#e8eaed]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-[#6b7280]">({product.reviewCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">In Stock</span>
                </div>
              </div>

              {/* Price & EMI */}
              <div className="py-3 border-y border-[#2a2e37] flex items-center justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-[#e8eaed]">
                    {formatBDT(currentPrice)}
                  </span>
                  {product.regularPrice > currentPrice && (
                    <span className="text-xs text-[#6b7280] line-through ml-2">
                      {formatBDT(product.regularPrice + priceOffset)}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#9aa3af] block">
                    0% EMI Available
                  </span>
                  <span className="text-[10px] text-[#6b7280]">
                    From {formatBDT(calculateEMI(currentPrice, 36))}/mo
                  </span>
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-2">
                    Color: <span className="text-[#e8eaed] font-extrabold">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? "border-[#2a2e37] bg-[#1c1f26] text-[#e8eaed] font-bold ring-1 ring-gray-900"
                            : "border-[#2a2e37] bg-[#14171c] text-[#9aa3af] hover:border-[#3d4450]"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-[#2a2e37]"
                          style={{ backgroundColor: c.hex }}
                        />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Variant Selector */}
              {product.storage && product.storage.length > 1 && (
                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-2">
                    Capacity: <span className="text-[#e8eaed] font-extrabold">{selectedStorage}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.storage.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => handleStorageChange(s)}
                        className={`py-2 px-3 rounded-xl border text-xs transition-all cursor-pointer ${
                          selectedStorage === s.size
                            ? "border-[#2a2e37] bg-[#1c1f26] text-[#e8eaed] font-bold ring-1 ring-gray-900"
                            : "border-[#2a2e37] bg-[#14171c] text-[#9aa3af] hover:border-[#3d4450]"
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-black/40"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? "bg-[#c45c5c]/10 text-[#c45c5c] border-[#c45c5c]/30"
                      : "bg-[#1c1f26] text-[#6b7280] border-[#2a2e37] hover:text-[#e8eaed]"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-[#c45c5c]" : ""}`} />
                </button>
              </div>

              <div className="text-center pt-1">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs text-[#c45c5c] hover:text-[#c45c5c] font-bold"
                >
                  View Full Specifications & Warranty <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
