"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/common/Logo";
import { useStore } from "@/context/StoreContext";
import { products, categories } from "@/data/products";
import { formatBDT } from "@/data/emi-banks";
import {
  Search,
  ShoppingBag,
  Heart,
  Scale,
  Phone,
  MapPin,
  CreditCard,
  Menu,
  X,
  RotateCcw,
  Flame,
  Truck
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setIsCartOpen, wishlist, compare, setIsMobileMenuOpen } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);
    setSearchResults(filtered);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      const outsideDesktop = searchRef.current && !searchRef.current.contains(event.target);
      const outsideMobile = mobileSearchRef.current && !mobileSearchRef.current.contains(event.target);
      if (outsideDesktop && (!mobileSearchRef.current || outsideMobile)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSearchFocused(false);
  }, [pathname]);

  // Exclude pre-owned from main categories map since it has its own dedicated highlight spot
  const navCategories = categories.filter((c) => c.slug !== "pre-owned");

  return (
    <header className="sticky top-0 z-40 w-full bg-[#12151a]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-[#0a0c10]/90 border-b border-white/[0.04] text-[10px] text-[#9aa3af]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-7 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+8801958434343"
              className="flex items-center gap-1 hover:text-[#e8eaed] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#ef233c]" />
              <span>Hotline: <strong className="text-[#e8eaed]">+880 1958-434343</strong></span>
            </a>
            <div className="h-2.5 w-px bg-[#3d4450]" />
            <Link
              href="/outlets"
              className="flex items-center gap-1 hover:text-[#e8eaed] transition-colors text-[#9aa3af]"
            >
              <MapPin className="w-3 h-3 text-[#6b7280]" />
              <span>Jamuna Future Park, Level 4 (Block A & B)</span>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/emi"
              className="flex items-center gap-1 hover:text-[#e8eaed] text-[#9aa3af] font-medium transition-colors"
            >
              <CreditCard className="w-3 h-3 text-[#6b7280]" />
              <span>0% EMI Facility</span>
            </Link>
            <div className="h-2.5 w-px bg-[#3d4450]" />
            <Link
              href="/exchange"
              className="flex items-center gap-1 hover:text-[#e8eaed] text-[#9aa3af] font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-[#6b7280]" />
              <span>Device Trade-in</span>
            </Link>
            <div className="h-2.5 w-px bg-[#3d4450]" />
            <Link
              href="/track-order"
              className="flex items-center gap-1 hover:text-[#e8eaed] text-[#9aa3af] font-medium transition-colors"
            >
              <Truck className="w-3 h-3 text-[#6b7280]" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-gradient-to-b from-[#181c24] to-[#14171c] border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between gap-3 lg:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#9aa3af] hover:text-[#e8eaed] rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Logo className="h-5.5 sm:h-6" />
          </div>

          {/* Search Bar (Spans comfortably across the center) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl lg:max-w-3xl mx-2 lg:mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for the item"
                className="w-full h-10 pl-10 pr-8 rounded-2xl bg-[#1e232c] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:border-white/20 focus:bg-[#222832] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#6b7280] absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#9aa3af] text-[10px] bg-[#2a2e37] rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#14171c] border border-[#2a2e37] rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-2 border-b border-[#2a2e37] text-[10px] font-bold text-[#6b7280] uppercase tracking-wider px-3 bg-[#1c1f26]">
                  Matching Products
                </div>
                <div className="divide-y divide-[#2a2e37]">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="p-2.5 flex items-center gap-3 hover:bg-[#1c1f26] transition-colors"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-10 h-10 object-contain p-1 rounded-md bg-[#1c1f26] border border-[#2a2e37] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#e8eaed] hover:text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[#6b7280] mt-0.5">
                          {item.brand} • <span>{item.categoryName}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-[#e8eaed]">
                          {formatBDT(item.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setIsSearchFocused(false)}
                  className="block p-2 text-center text-xs font-bold text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26] transition-colors bg-[#14171c] border-t border-[#2a2e37]"
                >
                  View all results for &quot;{searchQuery}&quot; →
                </Link>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Compare */}
            <Link
              href="/compare"
              className="relative p-2.5 rounded-2xl text-[#9aa3af] hover:text-[#e8eaed] bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hidden sm:flex items-center justify-center"
              title="Compare Gadgets"
            >
              <Scale className="w-4 h-4" />
              {compare.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c45c5c] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {compare.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-2xl text-[#9aa3af] hover:text-[#e8eaed] bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors flex items-center justify-center"
              title="Saved Items"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c45c5c] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl text-[#9aa3af] hover:text-[#e8eaed] bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c45c5c] text-white text-[9px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div ref={mobileSearchRef} className="md:hidden pb-2.5 pt-0.5 relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search tech & gadgets..."
              className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#1e232c] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:border-white/20"
            />
            <Search className="w-3.5 h-3.5 text-[#6b7280] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#9aa3af] text-[10px] bg-[#2a2e37] rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </form>

          {/* Mobile Live Autocomplete Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#14171c] border border-[#2a2e37] rounded-xl shadow-xl overflow-hidden z-50">
              <div className="p-2 border-b border-[#2a2e37] text-[10px] font-bold text-[#6b7280] uppercase tracking-wider px-3 bg-[#1c1f26]">
                Matching Products
              </div>
              <div className="divide-y divide-[#2a2e37] max-h-56 overflow-y-auto">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="p-2.5 flex items-center gap-3 hover:bg-[#1c1f26] transition-colors"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-md bg-[#1c1f26] border border-[#2a2e37] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#e8eaed] hover:text-[#c45c5c] truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#6b7280] mt-0.5">
                        {item.brand} • <span>{item.categoryName}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-[#e8eaed]">
                        {formatBDT(item.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                onClick={() => {
                  setIsSearchFocused(false);
                  setSearchQuery("");
                }}
                className="block p-2 text-center text-xs font-bold text-[#c45c5c] hover:bg-[#c45c5c]/10 transition-colors bg-[#1c1f26] border-t border-[#2a2e37]"
              >
                View all results for &quot;{searchQuery}&quot; →
              </Link>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-[#1a1e26] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-[11px] sm:text-xs font-semibold py-2 tracking-wide text-[#9aa3af]">
            <li>
              <Link
                href="/shop"
                className="py-1 px-2 hover:text-[#e8eaed] transition-colors"
              >
                All Products
              </Link>
            </li>
            {navCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`py-1 px-2 transition-colors ${
                    pathname === `/category/${cat.slug}`
                      ? "text-[#e8eaed] font-bold"
                      : "hover:text-[#e8eaed]"
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/category/pre-owned"
                className={`py-1 px-2 transition-colors ${
                  pathname === "/category/pre-owned"
                    ? "text-[#e8eaed] font-bold"
                    : "hover:text-[#e8eaed]"
                }`}
              >
                Certified Pre-Owned
              </Link>
            </li>
            <li>
              <Link
                href="/shop?deal=flash"
                className="py-1 px-3 rounded-full border border-[#c45c5c]/40 text-[#c45c5c] hover:bg-[#c45c5c]/10 font-bold transition-colors inline-flex items-center gap-1"
              >
                <Flame className="w-3 h-3" />
                Offer
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
