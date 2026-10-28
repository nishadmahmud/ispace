import React from "react";
import Link from "next/link";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="py-10 section-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#e8eaed] tracking-tight">
              Categories
            </h2>
            <p className="text-xs text-[#6b7280] mt-1">Browse every department</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9aa3af] hover:text-[#e8eaed] transition-colors"
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 lg:grid-cols-7 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="shrink-0 w-[7.25rem] sm:w-auto group rounded-3xl bg-gradient-to-b from-[#1a1f28] to-[#141820] border border-white/[0.07] hover:border-white/15 shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] p-3 flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="img-well w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl flex items-center justify-center mb-2.5 overflow-hidden">
                <img
                  src={cat.image || cat.banner}
                  alt={cat.name}
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-[11px] sm:text-xs font-bold text-[#e8eaed] line-clamp-1">
                {cat.name.split(" & ")[0]}
              </h3>
              <span className="text-[10px] text-[#6b7280] mt-0.5">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
