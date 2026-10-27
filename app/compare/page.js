"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatBDT } from "@/data/emi-banks";
import { Scale, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function ComparePage() {
  const { compare, removeFromCompare, addToCart } = useStore();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Compare Gadgets</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Side-by-Side Gadget Comparison
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Compare technical specs, processors, displays, and pricing for up to 4 devices.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
          >
            Add More Devices <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {compare.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">No Gadgets Added for Comparison</h2>
            <p className="text-xs text-gray-500">
              Browse our catalog and click the comparison icon on any product card to see detailed side-by-side specs.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-block px-6 py-2.5 rounded-xl bg-[#ef233c] text-white text-xs font-bold"
              >
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-white border border-gray-200 shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-3 sm:p-4 w-32 sm:w-44 font-black text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-20 border-r border-gray-200 shadow-2xs">
                    Feature
                  </th>
                  {compare.map((item) => (
                    <th key={item.id} className="p-3 sm:p-4 min-w-[200px] sm:min-w-[220px] max-w-[280px] align-top">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold text-red-600 uppercase">
                          {item.brand}
                        </span>
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-50 border border-gray-200 mb-2"
                      />

                      <Link
                        href={`/product/${item.slug}`}
                        className="font-bold text-gray-900 hover:text-red-600 transition-colors block line-clamp-2 text-xs"
                      >
                        {item.name}
                      </Link>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-sm font-black text-gray-900">
                          {formatBDT(item.price)}
                        </span>
                        {item.regularPrice > item.price && (
                          <span className="text-[10px] sm:text-[11px] text-gray-400 line-through">
                            {formatBDT(item.regularPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(item, {})}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-gray-600 bg-gray-50 sticky left-0 z-10 border-r border-gray-200 shadow-2xs">Category</td>
                  {compare.map((item) => (
                    <td key={item.id} className="p-3 sm:p-4 text-gray-800 font-medium">
                      {item.categoryName}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-gray-600 bg-gray-50 sticky left-0 z-10 border-r border-gray-200 shadow-2xs">Warranty</td>
                  {compare.map((item) => (
                    <td key={item.id} className="p-3 sm:p-4 text-gray-800">
                      {item.warranty}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-gray-600 bg-gray-50 sticky left-0 z-10 border-r border-gray-200 shadow-2xs">Rating</td>
                  {compare.map((item) => (
                    <td key={item.id} className="p-3 sm:p-4 text-amber-600 font-bold">
                      ⭐ {item.rating} ({item.reviewCount} reviews)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-gray-600 bg-gray-50 sticky left-0 z-10 border-r border-gray-200 shadow-2xs">Availability</td>
                  {compare.map((item) => (
                    <td key={item.id} className="p-3 sm:p-4 text-emerald-700 font-bold">
                      {item.inStock ? "✓ In Stock" : "Out of Stock"}
                    </td>
                  ))}
                </tr>
                {/* Dynamic specs rows */}
                {["Display", "Chipset", "Processor", "Camera", "Battery", "OS", "Weight"].map(
                  (specKey) => (
                    <tr key={specKey}>
                      <td className="p-3 sm:p-4 font-bold text-gray-600 bg-gray-50 sticky left-0 z-10 border-r border-gray-200 shadow-2xs">{specKey}</td>
                      {compare.map((item) => (
                        <td key={item.id} className="p-3 sm:p-4 text-gray-700">
                          {item.specs?.[specKey] || item.specs?.[`${specKey} (Main)`] || "-"}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
