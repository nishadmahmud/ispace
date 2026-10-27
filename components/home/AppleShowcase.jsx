import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

export default function AppleShowcase() {
  const appleProducts = products
    .filter((p) => p.brand === "Apple" && !p.isPreOwned)
    .slice(0, 4);

  return (
    <section className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              <span> OFFICIAL ECOSYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              The Apple Experience at iSPACE BD
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-xl">
              100% genuine Apple devices with official global warranties, verified serials, and seamless 0% EMI financing.
            </p>
          </div>
          <Link
            href="/shop?brand=Apple"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ef233c] hover:text-red-700 transition-colors"
          >
            Explore All Apple Gear <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {appleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
