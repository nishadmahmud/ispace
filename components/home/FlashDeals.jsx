"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Flame, Clock, ArrowRight } from "lucide-react";

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashItems = products.filter((p) => p.isFlashDeal).slice(0, 4);

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with live timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#ef233c] shadow-xs">
              <Flame className="w-5 h-5 text-[#ef233c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-[#ef233c] uppercase tracking-wider">
                  TODAY&apos;S HOTTEST DEALS
                </span>
                <span className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Flash Deals & Special Offers
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-bold">
              <Clock className="w-4 h-4 text-[#ef233c]" />
              <span className="hidden sm:inline">Ends in:</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-sm font-black text-gray-900">
              <span className="bg-gray-100 text-gray-900 px-2.5 py-1 rounded-lg border border-gray-200">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-gray-400">:</span>
              <span className="bg-gray-100 text-gray-900 px-2.5 py-1 rounded-lg border border-gray-200">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-gray-400">:</span>
              <span className="bg-gray-100 text-gray-900 px-2.5 py-1 rounded-lg border border-gray-200">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {flashItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-gray-50 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-[#ef233c] text-white text-[11px] font-black uppercase">
              Notice
            </span>
            <p className="text-xs text-gray-600">
              Limited promotional stock available. Grab your gadget before flash deals expire!
            </p>
          </div>
          <Link
            href="/shop?deal=flash"
            className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 shrink-0"
          >
            Explore all Flash Deals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
