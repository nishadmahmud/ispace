"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";
import { useStore } from "@/context/StoreContext";
import { categories } from "@/data/products";
import {
  X,
  CreditCard,
  RotateCcw,
  MapPin,
  Truck,
  Phone,
  Flame,
  ArrowRight
} from "lucide-react";

export default function MobileMenuDrawer() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useStore();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-[#14171c] border-r border-[#2a2e37] p-5 text-[#e8eaed] flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2a2e37]">
            <Logo className="h-5.5" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-[#6b7280] hover:text-[#e8eaed] rounded-lg hover:bg-[#1c1f26] transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Browse Categories */}
          <div className="py-4 space-y-1">
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest px-3 mb-2">
              Browse Categories
            </p>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-bold text-[#e8eaed] hover:bg-[#1c1f26]"
            >
              All Tech & Gadgets
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm text-[#9aa3af] hover:text-[#c45c5c] hover:bg-[#1c1f26] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Special Programs */}
          <div className="pt-4 border-t border-[#2a2e37] space-y-1">
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest px-3 mb-2">
              Special Programs
            </p>
            <Link
              href="/shop?deal=flash"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#c45c5c] font-bold hover:bg-[#c45c5c]/10 transition-colors"
            >
              <Flame className="w-4 h-4 text-[#c45c5c]" /> Hot Flash Deals
            </Link>
            <Link
              href="/emi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#9aa3af] font-semibold hover:bg-[#1c1f26] transition-colors"
            >
              <CreditCard className="w-4 h-4 text-[#6b7280]" /> 0% EMI Facility
            </Link>
            <Link
              href="/exchange"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#9aa3af] font-semibold hover:bg-[#1c1f26] transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-[#6b7280]" /> Trade-in & Exchange
            </Link>
            <Link
              href="/outlets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#9aa3af] font-semibold hover:bg-[#1c1f26] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#6b7280]" /> Showroom Outlets
            </Link>
            <Link
              href="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#9aa3af] font-semibold hover:bg-[#1c1f26] transition-colors"
            >
              <Truck className="w-4 h-4 text-[#6b7280]" /> Track Order Status
            </Link>
          </div>
        </div>

        {/* Footer Demo Hotline */}
        <div className="pt-4 border-t border-[#2a2e37]">
          <a
            href="tel:+8800000000000"
            className="flex items-center gap-2 p-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs font-bold text-[#e8eaed] hover:bg-[#1c1f26] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#c45c5c]" />
            <span>Demo Hotline: +880 0000-000000</span>
          </a>
        </div>
      </div>
    </div>
  );
}
