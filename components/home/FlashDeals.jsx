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

  const flashItems = products.filter((p) => p.isFlashDeal).slice(0, 5);

  return (
    <section className="py-8 sm:py-10 section-lifted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with live timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#242a36] to-[#1a1f28] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex items-center justify-center text-[#c45c5c]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#e8eaed] tracking-tight">
                Flash Sale
              </h2>
              <p className="text-xs text-[#6b7280] mt-0.5">Limited stock · ends soon</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-[#12151a]/80 border border-white/10 px-4 py-2 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-xs text-[#9aa3af] font-bold">
              <Clock className="w-4 h-4 text-[#c45c5c]" />
              <span className="hidden sm:inline">Ends in:</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-sm font-black text-[#e8eaed]">
              <span className="bg-white/[0.06] text-[#e8eaed] px-2.5 py-1 rounded-lg border border-white/10">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[#6b7280]">:</span>
              <span className="bg-white/[0.06] text-[#e8eaed] px-2.5 py-1 rounded-lg border border-white/10">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[#6b7280]">:</span>
              <span className="bg-white/[0.06] text-[#e8eaed] px-2.5 py-1 rounded-lg border border-white/10">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {flashItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <Link
            href="/shop?deal=flash"
            className="text-xs font-bold text-[#9aa3af] hover:text-[#e8eaed] inline-flex items-center gap-1"
          >
            See all Flash Deals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
