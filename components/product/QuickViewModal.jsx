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
        <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-gray-200 p-6 text-gray-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
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
                          ? "border-[#ef233c]"
                          : "border-gray-200 opacity-60 hover:opacity-100"
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
                <p className="text-xs text-gray-500 mb-1">
                  Brand: <span className="font-semibold text-gray-900">{product.brand}</span>
                </p>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-1 text-gray-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <span className="text-emerald-600 font-medium">In Stock</span>
                </div>
              </div>

              {/* Price & EMI */}
              <div className="py-3 border-y border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-gray-900">
                    {formatBDT(currentPrice)}
                  </span>
                  {product.regularPrice > currentPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">
                      {formatBDT(product.regularPrice + priceOffset)}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-gray-700 block">
                    0% EMI Available
                  </span>
                  <span className="text-[10px] text-gray-400">
                    From {formatBDT(calculateEMI(currentPrice, 36))}/mo
                  </span>
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Color: <span className="text-gray-900 font-extrabold">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? "border-gray-900 bg-gray-50 text-gray-900 font-bold ring-1 ring-gray-900"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-gray-300"
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
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Capacity: <span className="text-gray-900 font-extrabold">{selectedStorage}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.storage.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => handleStorageChange(s)}
                        className={`py-2 px-3 rounded-xl border text-xs transition-all cursor-pointer ${
                          selectedStorage === s.size
                            ? "border-gray-900 bg-gray-50 text-gray-900 font-bold ring-1 ring-gray-900"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
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
                  className="flex-1 py-3 px-4 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? "bg-red-50 text-[#ef233c] border-red-300"
                      : "bg-gray-100 text-gray-500 border-gray-200 hover:text-black"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-[#ef233c]" : ""}`} />
                </button>
              </div>

              <div className="text-center pt-1">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-bold"
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
