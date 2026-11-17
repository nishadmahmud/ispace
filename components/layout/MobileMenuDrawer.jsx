"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useStore } from "@/context/StoreContext";
import { contactConfig } from "@/data/contact";
import { getCategoriesFromServer } from "@/lib/api";
import { slugifyProductName } from "@/lib/productSlug";
import {
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  MessengerIcon,
  WhatsAppIcon,
} from "@/components/common/SocialIcons";
import {
  X,
  CreditCard,
  RotateCcw,
  MapPin,
  Truck,
  Phone,
  Flame,
  ArrowRight,
  ChevronDown
} from "lucide-react";

export default function MobileMenuDrawer({ initialCategories = [] }) {
  const pathname = usePathname();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useStore();
  const [categoriesList, setCategoriesList] = useState(
    Array.isArray(initialCategories) && initialCategories.length > 0 ? initialCategories : []
  );
  const [expandedCat, setExpandedCat] = useState(null);

  useEffect(() => {
    if (Array.isArray(initialCategories) && initialCategories.length > 0) {
      setCategoriesList(initialCategories);
    } else {
      getCategoriesFromServer()
        .then((res) => {
          if (res?.success && Array.isArray(res?.data)) {
            setCategoriesList(res.data);
          }
        })
        .catch(() => {});
    }
  }, [initialCategories]);

  const navCategories = useMemo(() => {
    if (!Array.isArray(categoriesList) || categoriesList.length === 0) {
      return [];
    }

    return categoriesList.map((c) => ({
      id: c.category_id || c.id,
      name: c.name,
      slug: slugifyProductName(c.name),
      subcategories: Array.isArray(c.sub_category)
        ? c.sub_category.map((s) => ({
            id: s.id,
            name: s.name,
            slug: slugifyProductName(s.name)
          }))
        : []
    }));
  }, [categoriesList]);

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
            {navCategories.map((cat) => {
              const hasSubs = cat.subcategories.length > 0;
              const isExpanded = expandedCat === cat.id;

              if (!hasSubs) {
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm text-[#9aa3af] hover:text-[#c45c5c] hover:bg-[#1c1f26] transition-colors"
                  >
                    {cat.name}
                  </Link>
                );
              }

              return (
                <div key={cat.id} className="space-y-0.5">
                  <div className="flex items-center justify-between rounded-xl hover:bg-[#1c1f26] transition-colors">
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 px-3 py-2 text-sm text-[#9aa3af] hover:text-[#c45c5c] font-medium transition-colors"
                    >
                      {cat.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                      className="p-2 text-[#6b7280] hover:text-[#e8eaed] cursor-pointer"
                      aria-label={`Toggle ${cat.name} subcategories`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#c45c5c]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pl-4 pr-1 py-1 space-y-1 bg-[#101317] rounded-xl border border-[#2a2e37]/50 ml-2">
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-1.5 rounded-lg text-xs font-bold text-[#e8eaed] hover:text-[#c45c5c]"
                      >
                        All {cat.name}
                      </Link>
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${cat.slug}?sub=${sub.id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-1.5 rounded-lg text-xs text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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

          {/* Theme Preference */}
          <div className="pt-4 border-t border-[#2a2e37]">
            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest px-3 mb-2">
              Theme Mode
            </p>
            <ThemeToggle showLabel />
          </div>
        </div>

        {/* Footer Contact & Socials */}
        <div className="pt-4 border-t border-[#2a2e37] space-y-2">
          <a
            href={`tel:${contactConfig.phoneRaw}`}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs font-bold text-[#e8eaed] hover:bg-[#252a34] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#ef233c]" />
              <span>Hotline: {contactConfig.phone}</span>
            </span>
          </a>
          <a
            href={contactConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            <span className="flex items-center gap-2">
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </span>
            <span className="text-[10px] text-emerald-400/80 font-normal">Active</span>
          </a>

          {/* Social Links Row */}
          <div className="flex items-center justify-around pt-2 px-1 text-[#9aa3af]">
            <a
              href={contactConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-[#ef233c] hover:bg-[#1c1f26] transition-colors"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
            <a
              href={contactConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-pink-400 hover:bg-[#1c1f26] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={contactConfig.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-white hover:bg-[#1c1f26] transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href={contactConfig.socials.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-[#0084ff] hover:bg-[#1c1f26] transition-colors"
              aria-label="Messenger"
            >
              <MessengerIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
