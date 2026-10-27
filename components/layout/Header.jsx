"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Truck,
  ArrowRight
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, cartTotal, setIsCartOpen, wishlist, compare } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchFocused(false);
  }, [pathname]);

  // Exclude pre-owned from main categories map since it has its own dedicated highlight spot
  const navCategories = categories.filter((c) => c.slug !== "pre-owned");

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-gray-50/80 border-b border-gray-200 text-[10px] text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-7 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+8800000000000"
              className="flex items-center gap-1 hover:text-red-600 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#ef233c]" />
              <span>Demo Hotline: <strong className="text-gray-900">+880 0000-000000</strong></span>
            </a>
            <div className="h-2.5 w-px bg-gray-300" />
            <Link
              href="/outlets"
              className="flex items-center gap-1 hover:text-red-600 transition-colors text-gray-600"
            >
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>5 Showrooms in Dhaka & Chattogram</span>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/emi"
              className="flex items-center gap-1 hover:text-gray-900 text-gray-600 font-medium transition-colors"
            >
              <CreditCard className="w-3 h-3 text-gray-400" />
              <span>0% EMI Facility</span>
            </Link>
            <div className="h-2.5 w-px bg-gray-300" />
            <Link
              href="/exchange"
              className="flex items-center gap-1 hover:text-gray-900 text-gray-600 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-gray-400" />
              <span>Device Trade-in</span>
            </Link>
            <div className="h-2.5 w-px bg-gray-300" />
            <Link
              href="/track-order"
              className="flex items-center gap-1 hover:text-gray-900 text-gray-600 font-medium transition-colors"
            >
              <Truck className="w-3 h-3 text-gray-400" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between gap-3 lg:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
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
            <div className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search iPhone 16 Pro, M4 MacBook, S25 Ultra, AirPods..."
                className="w-full h-9 pl-9 pr-8 rounded-xl bg-gray-100/90 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#ef233c] focus:ring-1 focus:ring-red-500/20 transition-all shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-[10px] bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-2 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 bg-gray-50">
                  Matching Products
                </div>
                <div className="divide-y divide-gray-100">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="p-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md bg-gray-50 border border-gray-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 hover:text-red-600 truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {item.brand} • <span>{item.categoryName}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-gray-900">
                          {formatBDT(item.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setIsSearchFocused(false)}
                  className="block p-2 text-center text-xs font-bold text-red-600 hover:bg-red-50 transition-colors bg-gray-50 border-t border-gray-100"
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
              className="relative p-2 rounded-xl text-gray-700 hover:text-black hover:bg-gray-100 transition-colors hidden sm:flex items-center justify-center border border-gray-200 shadow-2xs"
              title="Compare Gadgets"
            >
              <Scale className="w-4 h-4" />
              {compare.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ef233c] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-xs">
                  {compare.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-gray-700 hover:text-black hover:bg-gray-100 transition-colors flex items-center justify-center border border-gray-200 shadow-2xs"
              title="Saved Items"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ef233c] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-900 transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-[#ef233c] relative">
                <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ef233c] text-white text-[9px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs leading-none">
                <span className="text-[9px] text-gray-500 block leading-tight font-medium">My Bag</span>
                <span className="font-extrabold text-gray-900 leading-tight">{formatBDT(cartTotal)}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-2 pt-0.5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech & gadgets..."
              className="w-full h-8.5 pl-9 pr-3 rounded-lg bg-gray-100 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#ef233c]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Category Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-[11px] sm:text-xs font-semibold py-1.5 tracking-wide text-gray-700">
            <li>
              <Link
                href="/shop"
                className="py-1 px-2 hover:text-[#ef233c] transition-colors"
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
                      ? "text-[#ef233c] font-bold"
                      : "hover:text-[#ef233c]"
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
                    ? "text-[#ef233c] font-bold"
                    : "hover:text-[#ef233c]"
                }`}
              >
                Certified Pre-Owned
              </Link>
            </li>
            <li>
              <Link
                href="/shop?deal=flash"
                className="py-1 px-2 text-[#ef233c] hover:text-red-700 font-bold transition-colors inline-flex items-center gap-1"
              >
                <Flame className="w-3 h-3" />
                Hot Deals
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white border-r border-gray-200 p-5 text-gray-900 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <Logo className="h-5.5" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
                  Browse Categories
                </p>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-100"
                >
                  All Tech & Gadgets
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
                  Special Programs
                </p>
                <Link
                  href="/emi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 font-semibold hover:bg-gray-50"
                >
                  <CreditCard className="w-4 h-4 text-gray-500" /> 0% EMI Facility
                </Link>
                <Link
                  href="/exchange"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 font-semibold hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4 text-gray-500" /> Trade-in & Exchange
                </Link>
                <Link
                  href="/outlets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 font-semibold hover:bg-gray-50"
                >
                  <MapPin className="w-4 h-4 text-gray-500" /> Showroom Outlets
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <a
                href="tel:+8800000000000"
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 hover:bg-gray-100"
              >
                <Phone className="w-4 h-4 text-[#ef233c]" />
                <span>Demo Hotline: +880 0000-000000</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
