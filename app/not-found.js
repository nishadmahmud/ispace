import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | iSPACE BD",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#0c0e12] text-[#e8eaed] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-[#c45c5c]/10 border border-[#c45c5c]/25 flex items-center justify-center text-[#c45c5c] mx-auto shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#c45c5c]">
            404 Error
          </span>
          <h1 className="text-3xl font-black text-[#e8eaed] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#9aa3af] leading-relaxed">
            The gadget page or category you are looking for might have been moved or is currently unavailable.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold transition-all shadow-md shadow-black/40 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-2xl bg-[#14171c] hover:bg-[#1c1f26] border border-[#2a2e37] text-[#e8eaed] text-xs font-bold transition-all shadow-2xs"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
