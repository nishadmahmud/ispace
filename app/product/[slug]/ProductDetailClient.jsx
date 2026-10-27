"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatBDT, calculateEMI, emiBanks } from "@/data/emi-banks";
import ProductCard from "@/components/product/ProductCard";
import {
  ShoppingBag,
  Heart,
  Scale,
  Star,
  ShieldCheck,
  Truck,
  Check,
  Plus,
  Minus,
  ChevronRight,
  Phone,
  Zap
} from "lucide-react";

export default function ProductDetailClient({ product, relatedProducts }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, isInCompare } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || "Standard"
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0]?.size || "Standard"
  );
  const [priceOffset, setPriceOffset] = useState(
    product.storage?.[0]?.priceOffset || 0
  );
  const [selectedSim, setSelectedSim] = useState(
    product.simOptions?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [selectedEmiBank, setSelectedEmiBank] = useState(emiBanks[0].id);
  const [selectedEmiMonths, setSelectedEmiMonths] = useState(12);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyBoxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (buyBoxRef.current) {
        const rect = buyBoxRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const currentPrice = product.price + priceOffset;
  const currentRegularPrice = product.regularPrice + priceOffset;
  const monthlyEmi = calculateEMI(currentPrice, selectedEmiMonths);

  const handleStorageChange = (storageItem) => {
    setSelectedStorage(storageItem.size);
    setPriceOffset(storageItem.priceOffset);
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      {
        color: selectedColor,
        storage: selectedStorage,
        sim: selectedSim,
        priceOffset: priceOffset
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      {
        color: selectedColor,
        storage: selectedStorage,
        sim: selectedSim,
        priceOffset: priceOffset
      },
      quantity
    );
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 flex-wrap font-medium">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/shop" className="hover:text-black transition-colors">
          Catalog
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-black transition-colors capitalize"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm h-80 sm:h-96 lg:h-[460px] flex items-center justify-center p-4">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>

          {/* Thumbnail row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? "border-gray-900 scale-105"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Badges under gallery */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white border border-gray-200 flex items-center gap-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="text-[11px]">
                <strong className="text-gray-900 block font-bold">Official Warranty</strong>
                <span className="text-gray-500">100% Genuine Serial</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-gray-200 flex items-center gap-3 shadow-2xs">
              <Truck className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="text-[11px]">
                <strong className="text-gray-900 block font-bold">Fast Delivery</strong>
                <span className="text-gray-500">24h Dhaka / 48h BD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Variant Picker (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <p className="text-xs text-gray-500">
                Brand: <Link href={`/shop?brand=${product.brand}`} className="text-gray-900 font-semibold hover:text-red-600">{product.brand}</Link>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToCompare(product)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isCompared
                      ? "bg-red-50 text-[#ef233c] border-red-300"
                      : "bg-white text-gray-600 border-gray-200 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compare</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isFavorited
                      ? "bg-red-50 text-[#ef233c] border-red-300"
                      : "bg-white text-gray-600 border-gray-200 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-[#ef233c]" : ""}`} />
                  <span className="hidden sm:inline">Wishlist</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 flex-wrap">
              <div className="flex items-center gap-1 text-gray-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> In Stock
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">Official Brand Warranty</span>
            </div>
          </div>

          {/* Pricing & Quick Meta Grid */}
          <div className="py-4 border-y border-gray-200 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                {formatBDT(currentPrice)}
              </span>
              {currentRegularPrice > currentPrice && (
                <span className="text-base text-gray-400 line-through">
                  {formatBDT(currentRegularPrice)}
                </span>
              )}
              {currentRegularPrice > currentPrice && (
                <span className="text-xs font-semibold text-gray-600">
                  (Save {formatBDT(currentRegularPrice - currentPrice)})
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[11px]">Availability</span>
                <span className="font-bold text-emerald-600">In Stock</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[11px]">Warranty</span>
                <span className="font-bold text-gray-800">1 Year Official</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[11px]">0% EMI</span>
                <span className="font-bold text-gray-800">From {formatBDT(calculateEMI(currentPrice, 36))}/mo</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[11px]">Delivery</span>
                <span className="font-bold text-gray-800">24-48 Hours</span>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Color: <span className="text-gray-900 font-extrabold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-gray-900 bg-gray-50 text-gray-900 font-bold ring-1 ring-gray-900"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Storage / Configuration Selector */}
          {product.storage && product.storage.length > 1 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Configuration: <span className="text-gray-900 font-extrabold">{selectedStorage}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.storage.map((s) => {
                  const isSelected = selectedStorage === s.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => handleStorageChange(s)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-gray-900 bg-gray-50 text-gray-900 ring-1 ring-gray-900 font-bold"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <span className="block text-xs font-bold text-gray-900">{s.size}</span>
                      <span className="block text-[11px] text-gray-500 mt-0.5">
                        {s.priceOffset === 0 ? "Standard" : `+${formatBDT(s.priceOffset)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SIM / Region Selector */}
          {product.simOptions && product.simOptions.length > 1 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                SIM / Regional Edition: <span className="text-gray-900 font-extrabold">{selectedSim}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.simOptions.map((sim) => {
                  const isSelected = selectedSim === sim;
                  return (
                    <button
                      key={sim}
                      type="button"
                      onClick={() => setSelectedSim(sim)}
                      className={`px-3 py-2 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-gray-900 bg-gray-50 text-gray-900 font-bold ring-1 ring-gray-900"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {sim}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & CTA Actions */}
          <div ref={buyBoxRef} className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              {/* Quantity counter */}
              <div className="flex items-center justify-between sm:justify-start border border-gray-200 rounded-2xl bg-white p-1 shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-gray-500 hover:text-black transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-black text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-gray-500 hover:text-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag & Buy Now */}
              <div className="flex-1 grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3 sm:py-3.5 px-3 rounded-2xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs truncate"
                >
                  <ShoppingBag className="w-4 h-4 text-[#ef233c] shrink-0" /> Add to Bag
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 sm:py-3.5 px-3 rounded-2xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-500/25 truncate"
                >
                  <Zap className="w-4 h-4 shrink-0" /> Buy Now
                </button>
              </div>
            </div>

            {/* Express Hotline info */}
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-2">
              <span className="flex items-center gap-2 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#ef233c]" /> Demo Support Hotline:
              </span>
              <a
                href="tel:+8800000000000"
                className="font-bold text-gray-900 hover:text-red-600 transition-colors"
              >
                +880 0000-000000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Warranty, Customer Reviews */}
      <div className="mb-16">
        <div className="border-b border-gray-200 flex gap-4 sm:gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "specs"
                ? "border-[#ef233c] text-red-600 font-black"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("warranty")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "warranty"
                ? "border-[#ef233c] text-red-600 font-black"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Warranty & Delivery Policy
          </button>
          <button
            onClick={() => setActiveTab("emi")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "emi"
                ? "border-[#ef233c] text-red-600 font-black"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            EMI Calculator
          </button>
        </div>

        <div className="py-6">
          {activeTab === "specs" && (
            <div className="rounded-3xl bg-white border border-gray-200 p-6 space-y-6 shadow-xs">
              <h3 className="text-base font-black text-gray-900">Full Product Specifications</h3>
              <div className="divide-y divide-gray-100">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <div key={key} className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <span className="font-bold text-gray-500">{key}</span>
                    <span className="sm:col-span-2 text-gray-900 font-medium">{val}</span>
                  </div>
                ))}
              </div>

              {product.keyFeatures && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Key Highlights:</h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {product.keyFeatures.map((kf, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{kf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="rounded-3xl bg-white border border-gray-200 p-6 space-y-4 text-xs text-gray-600 leading-relaxed shadow-xs">
              <h3 className="text-base font-black text-gray-900">Authenticity & Service Guarantee</h3>
              <p>
                Every device sold at <strong className="text-gray-900">iSPACE BD</strong> comes with full verification. For official Apple, Samsung, and Sony products, warranty coverage can be cross-verified directly on the official manufacturer serial portal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">7 Days Replacement</h4>
                  <p className="text-gray-500">If any manufacturing fault occurs within 7 days, get an instant replacement.</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">Dedicated Service Lab</h4>
                  <p className="text-gray-500">Our certified Apple & smartphone hardware engineers provide authorized care in Dhaka.</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">Express Delivery</h4>
                  <p className="text-gray-500">Inside Dhaka deliveries completed within 24 hours. Outside Dhaka across all 64 districts in 48 hours.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "emi" && (
            <div className="rounded-3xl bg-white border border-gray-200 p-6 space-y-6 shadow-xs">
              <div>
                <h3 className="text-base font-black text-gray-900">Interactive EMI Calculator</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  Calculate your monthly installment for {product.name} across 24+ Bangladeshi banks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Select Credit Card Bank
                  </label>
                  <select
                    value={selectedEmiBank}
                    onChange={(e) => setSelectedEmiBank(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-bold"
                  >
                    {emiBanks.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} (0% Interest)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Select EMI Tenure
                  </label>
                  <select
                    value={selectedEmiMonths}
                    onChange={(e) => setSelectedEmiMonths(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-bold"
                  >
                    {[3, 6, 9, 12, 18, 24, 36].map((m) => (
                      <option key={m} value={m}>
                        {m} Months Installment
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block font-medium">Monthly Installment</span>
                  <span className="text-2xl font-black text-amber-700">
                    {formatBDT(monthlyEmi)} / month
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block font-medium">Total Device Price</span>
                  <span className="text-sm font-black text-gray-900">
                    {formatBDT(currentPrice)} (0% Interest)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Gadgets */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-6">
            Recommended With This Device
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Purchase Bar (Appears when scrolled past the main buy box) */}
      <div
        className={`lg:hidden fixed bottom-15 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3.5 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3 transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-lg bg-gray-50 border border-gray-200 shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">{product.name}</p>
            <p className="text-xs font-black text-[#ef233c]">{formatBDT(currentPrice)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 transition-all shadow-2xs"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#ef233c]" />
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
