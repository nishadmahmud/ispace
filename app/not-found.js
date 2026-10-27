import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | iSPACE BD",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#f8fafc] text-gray-900 flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-red-50 border border-red-200 flex items-center justify-center text-[#ef233c] mx-auto shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#ef233c]">
            404 Error
          </span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            The gadget page or category you are looking for might have been moved or is currently unavailable.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold transition-all shadow-md shadow-red-500/20 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-xs font-bold transition-all shadow-2xs"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
