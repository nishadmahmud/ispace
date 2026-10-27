import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { RotateCcw, ShieldCheck, BatteryCharging, CheckCircle2, ArrowRight } from "lucide-react";

export default function CertifiedPreOwned() {
  const preOwnedItems = products.filter((p) => p.isPreOwned);

  return (
    <section className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 border border-gray-200">
                <RotateCcw className="w-3 h-3 text-[#ef233c]" /> iSPACE Recell
              </span>
              <span className="text-xs text-gray-500 font-bold">Certified Pre-Owned</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Grade A+ Checked Devices
            </h2>
          </div>

          {/* Value Highlights */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-700">
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 32-Point Diagnostic
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs font-semibold">
              <BatteryCharging className="w-4 h-4 text-gray-700" /> 90%+ Battery Health
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-gray-700" /> 7-Day Replacement
            </span>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {preOwnedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Trade-in Promo Card */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl bg-gray-50 border border-gray-200 p-5 sm:p-6 flex flex-col justify-between text-gray-900 shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#ef233c] shadow-2xs">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Trade-in Your Old Phone</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Exchange your used iPhone or Android smartphone for maximum valuation against any new gadget at iSPACE BD.
              </p>
            </div>

            <div className="pt-6 space-y-2">
              <Link
                href="/exchange"
                className="w-full py-3 px-4 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/10"
              >
                Calculate Exchange Value <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-gray-500 text-center font-medium">
                Instant cash valuation at all 5 showrooms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
