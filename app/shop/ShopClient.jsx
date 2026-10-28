"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { formatBDT } from "@/data/emi-banks";
import {
  SlidersHorizontal,
  X,
  Search
} from "lucide-react";

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";
  const initialQuery = searchParams.get("q") || "";
  const initialDeal = searchParams.get("deal") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(350000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyFlashDeals, setOnlyFlashDeals] = useState(initialDeal === "flash");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        if (selectedCategory && item.category !== selectedCategory) return false;
        if (selectedBrand && item.brand !== selectedBrand) return false;
        if (onlyInStock && !item.inStock) return false;
        if (onlyFlashDeals && !item.isFlashDeal) return false;
        if (item.price > maxPrice) return false;
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchBrand = item.brand.toLowerCase().includes(q);
          const matchCat = item.categoryName.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // featured default
      });
  }, [selectedCategory, selectedBrand, onlyInStock, onlyFlashDeals, maxPrice, searchTerm, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSearchTerm("");
    setMaxPrice(350000);
    setOnlyInStock(false);
    setOnlyFlashDeals(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedBrand ||
    searchTerm ||
    onlyInStock ||
    onlyFlashDeals ||
    maxPrice < 350000;

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#e8eaed] font-bold">Catalog</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-[#c45c5c] capitalize font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-black text-[#e8eaed] tracking-tight">
            All Tech & Mobile Gadgets
          </h1>
          <p className="text-xs text-[#9aa3af] mt-1">
            Explore authentic Apple iPhones, MacBooks, Galaxy flagships, audio gear, and lifestyle tech.
          </p>
        </div>

        {/* Toolbar Bar */}
        <div className="p-4 rounded-2xl bg-[#14171c] border border-[#2a2e37] mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs font-bold text-[#e8eaed]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#c45c5c]" /> Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>

            {/* Results Counter */}
            <span className="text-xs font-semibold text-[#9aa3af]">
              Showing <strong className="text-[#e8eaed]">{filteredProducts.length}</strong> items
            </span>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Sort Options */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6b7280] hidden sm:inline font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1c1f26] border border-[#2a2e37] rounded-xl px-3 py-2 text-xs font-bold text-[#e8eaed] focus:outline-none focus:border-[#c45c5c]"
              >
                <option value="featured">Featured & Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-[#6b7280] font-medium">Active Filters:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#14171c] border border-[#2a2e37] text-xs text-[#e8eaed] shadow-2xs font-semibold">
                Category: <strong className="capitalize text-[#e8eaed]">{selectedCategory}</strong>
                <button onClick={() => setSelectedCategory("")}>
                  <X className="w-3.5 h-3.5 hover:text-[#c45c5c]" />
                </button>
              </span>
            )}
            {selectedBrand && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#14171c] border border-[#2a2e37] text-xs text-[#e8eaed] shadow-2xs font-semibold">
                Brand: <strong className="text-[#e8eaed]">{selectedBrand}</strong>
                <button onClick={() => setSelectedBrand("")}>
                  <X className="w-3.5 h-3.5 hover:text-[#c45c5c]" />
                </button>
              </span>
            )}
            {onlyFlashDeals && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#c45c5c]/10 border border-[#c45c5c]/25 text-xs text-[#c45c5c] font-bold shadow-2xs">
                Flash Deals Only
                <button onClick={() => setOnlyFlashDeals(false)}>
                  <X className="w-3.5 h-3.5 hover:text-[#e8eaed]" />
                </button>
              </span>
            )}
            {onlyInStock && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-400 font-bold shadow-2xs">
                In Stock Only
                <button onClick={() => setOnlyInStock(false)}>
                  <X className="w-3.5 h-3.5 hover:text-[#e8eaed]" />
                </button>
              </span>
            )}
            {maxPrice < 350000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#14171c] border border-[#2a2e37] text-xs text-[#e8eaed] shadow-2xs font-semibold">
                Max Price: {formatBDT(maxPrice)}
                <button onClick={() => setMaxPrice(350000)}>
                  <X className="w-3.5 h-3.5 hover:text-[#c45c5c]" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-[#c45c5c] hover:text-[#c45c5c] ml-2 underline"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Main Grid + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block space-y-6">
            {/* Search within category */}
            <div className="p-5 rounded-2xl bg-[#14171c] border border-[#2a2e37] shadow-2xs space-y-3">
              <h3 className="font-black text-xs text-[#e8eaed] uppercase tracking-wider">
                Search Catalog
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Model name, chipset..."
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
                />
                <Search className="w-4 h-4 text-[#6b7280] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div className="p-5 rounded-2xl bg-[#14171c] border border-[#2a2e37] shadow-2xs space-y-3">
              <h3 className="font-black text-xs text-[#e8eaed] uppercase tracking-wider mb-2">
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                    selectedCategory === ""
                      ? "bg-[#c45c5c]/10 text-[#c45c5c]"
                      : "text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      selectedCategory === c.slug
                        ? "bg-[#c45c5c]/10 text-[#c45c5c]"
                        : "text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                    }`}
                  >
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="p-5 rounded-2xl bg-[#14171c] border border-[#2a2e37] shadow-2xs space-y-3">
              <h3 className="font-black text-xs text-[#e8eaed] uppercase tracking-wider mb-2">
                Brands
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedBrand("")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                    selectedBrand === ""
                      ? "bg-[#c45c5c]/10 text-[#c45c5c]"
                      : "text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <span>All Brands</span>
                </button>
                {brands.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setSelectedBrand(b.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      selectedBrand === b.name
                        ? "bg-[#c45c5c]/10 text-[#c45c5c]"
                        : "text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                    }`}
                  >
                    <span>{b.name}</span>
                    <span className="text-[11px] text-[#6b7280]">({b.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="p-5 rounded-2xl bg-[#14171c] border border-[#2a2e37] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xs text-[#e8eaed] uppercase tracking-wider">
                  Price Limit
                </h3>
                <span className="text-xs font-bold text-[#c45c5c]">
                  Up to {formatBDT(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="350000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#c45c5c] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#6b7280] font-medium">
                <span>৳2,000</span>
                <span>৳350,000</span>
              </div>
            </div>

            {/* Quick Checkboxes */}
            <div className="p-5 rounded-2xl bg-[#14171c] border border-[#2a2e37] shadow-2xs space-y-2.5">
              <h3 className="font-black text-xs text-[#e8eaed] uppercase tracking-wider mb-2">
                Availability & Deals
              </h3>
              <label className="flex items-center gap-2.5 text-xs text-[#9aa3af] cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-[#2a2e37] accent-[#c45c5c] w-4 h-4 cursor-pointer"
                />
                <span>In Stock Items Only</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-[#9aa3af] cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={onlyFlashDeals}
                  onChange={(e) => setOnlyFlashDeals(e.target.checked)}
                  className="rounded border-[#2a2e37] accent-[#c45c5c] w-4 h-4 cursor-pointer"
                />
                <span>Flash Deals & Discounts</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#14171c] border border-[#2a2e37] shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c1f26] flex items-center justify-center text-[#6b7280] mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#e8eaed]">No products found</h3>
                  <p className="text-xs text-[#6b7280] mt-1 max-w-sm mx-auto">
                    We couldn&apos;t find any gadget matching your current filters. Try relaxing your price slider or searching another brand.
                  </p>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold transition-all shadow-md shadow-black/40"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-[#14171c] border-l border-[#2a2e37] p-5 text-[#e8eaed] flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#2a2e37]">
                <h3 className="font-black text-sm">Filter Products</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#6b7280] hover:text-[#e8eaed] rounded-lg hover:bg-[#1c1f26]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-2">
                  Category
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold ${
                      selectedCategory === "" ? "text-[#c45c5c] bg-[#c45c5c]/10" : "text-[#9aa3af]"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold ${
                        selectedCategory === c.slug ? "text-[#c45c5c] bg-[#c45c5c]/10" : "text-[#9aa3af]"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brands */}
              <div>
                <p className="text-xs font-bold text-[#6b7280] uppercase tracking-wider mb-2">
                  Brand
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedBrand("");
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold ${
                      selectedBrand === "" ? "text-[#c45c5c] bg-[#c45c5c]/10" : "text-[#9aa3af]"
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => {
                        setSelectedBrand(b.name);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold ${
                        selectedBrand === b.name ? "text-[#c45c5c] bg-[#c45c5c]/10" : "text-[#9aa3af]"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2a2e37] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#c45c5c] text-white text-xs font-bold shadow-xs"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 text-center text-xs text-[#6b7280] hover:text-[#e8eaed] font-bold"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
