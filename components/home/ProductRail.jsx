"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

const TAB_FILTERS = {
  all: () => true,
  newest: () => true,
  seller: (p) => p.reviewCount >= 80,
  value: (p) => p.regularPrice - p.price > 5000,
  popular: (p) => p.featured,
  featured: (p) => p.featured,
};

export default function ProductRail({
  title,
  subtitle,
  seeAllHref = "/shop",
  products = [],
  limit = 5,
  tabs,
  lifted = false,
}) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || "all");

  const visible = useMemo(() => {
    const filterFn = TAB_FILTERS[activeTab] || TAB_FILTERS.all;
    return products.filter(filterFn).slice(0, limit);
  }, [products, activeTab, limit]);

  return (
    <section className={`py-8 sm:py-10 ${lifted ? "section-lifted" : "section-canvas"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#e8eaed] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[#6b7280] mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {tabs && tabs.length > 0 && (
              <div className="flex items-center gap-1 p-1 rounded-full bg-[#12151a]/80 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-white/[0.08] text-[#e8eaed]"
                        : "text-[#6b7280] hover:text-[#9aa3af]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
            <Link
              href={seeAllHref}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9aa3af] hover:text-[#e8eaed] transition-colors"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
