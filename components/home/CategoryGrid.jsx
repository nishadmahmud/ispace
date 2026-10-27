import React from "react";
import Link from "next/link";
import { categories } from "@/data/products";
import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Zap,
  Gamepad2,
  RotateCcw,
  ArrowRight
} from "lucide-react";

const iconMap = {
  Smartphone: Smartphone,
  Laptop: Laptop,
  Watch: Watch,
  Headphones: Headphones,
  Zap: Zap,
  Gamepad2: Gamepad2,
  RotateCcw: RotateCcw
};

export default function CategoryGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ef233c] uppercase tracking-wider mb-1">
              <span>Explore Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Shop by Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 transition-colors"
          >
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Zap;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative rounded-2xl bg-white border border-gray-200 hover:border-red-500/60 p-4 flex flex-col items-center text-center transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-red-50 border border-gray-200 group-hover:border-red-200 flex items-center justify-center text-gray-700 group-hover:text-[#ef233c] transition-all duration-300 mb-3">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xs font-bold text-gray-800 group-hover:text-red-600 line-clamp-1 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-gray-500 mt-0.5">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
