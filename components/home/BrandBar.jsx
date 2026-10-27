import React from "react";
import Link from "next/link";
import { brands } from "@/data/products";

export default function BrandBar() {
  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Authorized Multi-Brand Tech Hub
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {brands.map((b) => (
            <Link
              key={b.name}
              href={`/shop?brand=${encodeURIComponent(b.name)}`}
              className="py-3 px-4 rounded-xl bg-white border border-gray-200 hover:border-[#ef233c] text-center transition-all shadow-2xs group hover:shadow-xs"
            >
              <span className="text-xs font-bold text-gray-800 group-hover:text-[#ef233c] transition-colors block">
                {b.logoText}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5 block">
                {b.count} products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
