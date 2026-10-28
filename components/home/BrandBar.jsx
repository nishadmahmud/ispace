import React from "react";
import Link from "next/link";
import { brands } from "@/data/products";
import { ArrowRight } from "lucide-react";

export default function BrandBar() {
  return (
    <section className="py-8 sm:py-10 section-lifted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-5 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#e8eaed] tracking-tight">
              Shop by Brand
            </h2>
            <p className="text-xs text-[#6b7280] mt-1">Authorized multi-brand hub</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9aa3af] hover:text-[#e8eaed] transition-colors"
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {brands.map((b) => (
            <Link
              key={b.name}
              href={`/shop?brand=${encodeURIComponent(b.name)}`}
              className="py-4 px-3 rounded-3xl bg-gradient-to-b from-[#1a1f28] to-[#141820] border border-white/[0.07] hover:border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.22)] text-center transition-all group"
            >
              <span className="text-xs font-bold text-[#e8eaed] group-hover:text-white transition-colors block">
                {b.logoText}
              </span>
              <span className="text-[10px] text-[#6b7280] mt-1 block">
                {b.count}+ products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
