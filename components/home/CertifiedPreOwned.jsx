import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { RotateCcw, ShieldCheck, BatteryCharging, CheckCircle2, ArrowRight } from "lucide-react";

export default function CertifiedPreOwned() {
  const preOwnedItems = products.filter((p) => p.isPreOwned);

  return (
    <section className="py-14 section-lifted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-4 border-b border-[#2a2e37] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1c1f26] text-[#e8eaed] text-[11px] font-black uppercase tracking-wider flex items-center gap-1 border border-[#2a2e37]">
                <RotateCcw className="w-3 h-3 text-[#c45c5c]" /> iSPACE Recell
              </span>
              <span className="text-xs text-[#6b7280] font-bold">Certified Pre-Owned</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#e8eaed] tracking-tight">
              Grade A+ Checked Devices
            </h2>
          </div>

          {/* Value Highlights */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#9aa3af]">
            <span className="flex items-center gap-1.5 bg-[#1c1f26] px-3 py-1.5 rounded-xl border border-[#2a2e37] shadow-2xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 32-Point Diagnostic
            </span>
            <span className="flex items-center gap-1.5 bg-[#1c1f26] px-3 py-1.5 rounded-xl border border-[#2a2e37] shadow-2xs font-semibold">
              <BatteryCharging className="w-4 h-4 text-[#9aa3af]" /> 90%+ Battery Health
            </span>
            <span className="flex items-center gap-1.5 bg-[#1c1f26] px-3 py-1.5 rounded-xl border border-[#2a2e37] shadow-2xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#9aa3af]" /> 7-Day Replacement
            </span>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {preOwnedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Trade-in Promo Card */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] p-5 sm:p-6 flex flex-col justify-between text-[#e8eaed] shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#14171c] border border-[#2a2e37] flex items-center justify-center text-[#c45c5c] shadow-2xs">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#e8eaed]">Trade-in Your Old Phone</h3>
              <p className="text-xs text-[#9aa3af] leading-relaxed">
                Exchange your used iPhone or Android smartphone for maximum valuation against any new gadget at iSPACE BD.
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <Link
                href="/exchange"
                className="w-full py-3 px-4 rounded-xl bg-[#c45c5c] hover:bg-[#a84848] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-black/40"
              >
                Calculate Exchange Value <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-[#6b7280] text-center font-medium">
                Instant cash valuation at Jamuna Future Park outlets
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
