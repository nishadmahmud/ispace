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
      <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-6 flex-wrap font-medium">
        <Link href="/" className="hover:text-[#e8eaed] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-[#6b7280]" />
        <Link href="/shop" className="hover:text-[#e8eaed] transition-colors">
          Catalog
        </Link>
        <ChevronRight className="w-3 h-3 text-[#6b7280]" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#e8eaed] transition-colors capitalize"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3 h-3 text-[#6b7280]" />
        <span className="text-[#e8eaed] font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#14171c] border border-[#2a2e37] shadow-sm h-80 sm:h-96 lg:h-[460px] flex items-center justify-center p-4">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain object-center rounded-2xl p-4 bg-[#1a1d23]"
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
                      ? "border-[#2a2e37] scale-105"
                      : "border-[#2a2e37] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Badges under gallery */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#14171c] border border-[#2a2e37] flex items-center gap-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#9aa3af] shrink-0" />
              <div className="text-[11px]">
                <strong className="text-[#e8eaed] block font-bold">Official Warranty</strong>
                <span className="text-[#6b7280]">100% Genuine Serial</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#14171c] border border-[#2a2e37] flex items-center gap-3 shadow-2xs">
              <Truck className="w-5 h-5 text-[#9aa3af] shrink-0" />
              <div className="text-[11px]">
                <strong className="text-[#e8eaed] block font-bold">Fast Delivery</strong>
                <span className="text-[#6b7280]">24h Dhaka / 48h BD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Variant Picker (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <p className="text-xs text-[#6b7280]">
                Brand: <Link href={`/shop?brand=${product.brand}`} className="text-[#e8eaed] font-semibold hover:text-[#c45c5c]">{product.brand}</Link>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToCompare(product)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isCompared
                      ? "bg-[#c45c5c]/10 text-[#c45c5c] border-[#c45c5c]/30"
                      : "bg-[#14171c] text-[#9aa3af] border-[#2a2e37] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compare</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isFavorited
                      ? "bg-[#c45c5c]/10 text-[#c45c5c] border-[#c45c5c]/30"
                      : "bg-[#14171c] text-[#9aa3af] border-[#2a2e37] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-[#c45c5c]" : ""}`} />
                  <span className="hidden sm:inline">Wishlist</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#e8eaed] tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-3 mt-2 text-xs text-[#6b7280] flex-wrap">
              <div className="flex items-center gap-1 text-[#e8eaed]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#6b7280]">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-[#9aa3af]">•</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> In Stock
              </span>
              <span className="text-[#9aa3af]">•</span>
              <span className="text-[#6b7280]">Official Brand Warranty</span>
            </div>
          </div>

          {/* Pricing & Quick Meta Grid */}
          <div className="py-4 border-y border-[#2a2e37] space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#e8eaed]">
                {formatBDT(currentPrice)}
              </span>
              {currentRegularPrice > currentPrice && (
                <span className="text-base text-[#6b7280] line-through">
                  {formatBDT(currentRegularPrice)}
                </span>
              )}
              {currentRegularPrice > currentPrice && (
                <span className="text-xs font-semibold text-[#9aa3af]">
                  (Save {formatBDT(currentRegularPrice - currentPrice)})
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <div className="bg-[#1c1f26] p-2.5 rounded-xl border border-[#2a2e37]">
                <span className="text-[#6b7280] block text-[11px]">Availability</span>
                <span className="font-bold text-emerald-400">In Stock</span>
              </div>
              <div className="bg-[#1c1f26] p-2.5 rounded-xl border border-[#2a2e37]">
                <span className="text-[#6b7280] block text-[11px]">Warranty</span>
                <span className="font-bold text-[#e8eaed]">1 Year Official</span>
              </div>
              <div className="bg-[#1c1f26] p-2.5 rounded-xl border border-[#2a2e37]">
                <span className="text-[#6b7280] block text-[11px]">0% EMI</span>
                <span className="font-bold text-[#e8eaed]">From {formatBDT(calculateEMI(currentPrice, 36))}/mo</span>
              </div>
              <div className="bg-[#1c1f26] p-2.5 rounded-xl border border-[#2a2e37]">
                <span className="text-[#6b7280] block text-[11px]">Delivery</span>
                <span className="font-bold text-[#e8eaed]">24-48 Hours</span>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#9aa3af]">
                Color: <span className="text-[#e8eaed] font-extrabold">{selectedColor}</span>
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
                          ? "border-[#2a2e37] bg-[#1c1f26] text-[#e8eaed] font-bold ring-1 ring-gray-900"
                          : "border-[#2a2e37] bg-[#14171c] text-[#9aa3af] hover:border-[#3d4450]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#2a2e37] shrink-0"
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
              <label className="block text-xs font-bold text-[#9aa3af]">
                Configuration: <span className="text-[#e8eaed] font-extrabold">{selectedStorage}</span>
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
                          ? "border-[#2a2e37] bg-[#1c1f26] text-[#e8eaed] ring-1 ring-gray-900 font-bold"
                          : "border-[#2a2e37] bg-[#14171c] text-[#9aa3af] hover:border-[#3d4450]"
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#e8eaed]">{s.size}</span>
                      <span className="block text-[11px] text-[#6b7280] mt-0.5">
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
              <label className="block text-xs font-bold text-[#9aa3af]">
                SIM / Regional Edition: <span className="text-[#e8eaed] font-extrabold">{selectedSim}</span>
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
                          ? "border-[#2a2e37] bg-[#1c1f26] text-[#e8eaed] font-bold ring-1 ring-gray-900"
                          : "border-[#2a2e37] bg-[#14171c] text-[#9aa3af] hover:border-[#3d4450]"
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
              <div className="flex items-center justify-between sm:justify-start border border-[#2a2e37] rounded-2xl bg-[#14171c] p-1 shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#6b7280] hover:text-[#e8eaed] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-black text-sm text-[#e8eaed]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#6b7280] hover:text-[#e8eaed] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag & Buy Now */}
              <div className="flex-1 grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3 sm:py-3.5 px-3 rounded-2xl bg-[#1c1f26] hover:bg-[#2a2e37] border border-[#2a2e37] text-[#e8eaed] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs truncate"
                >
                  <ShoppingBag className="w-4 h-4 text-[#c45c5c] shrink-0" /> Add to Bag
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 sm:py-3.5 px-3 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-black/40 truncate"
                >
                  <Zap className="w-4 h-4 shrink-0" /> Buy Now
                </button>
              </div>
            </div>

            {/* Express Hotline info */}
            <div className="p-3 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9aa3af] gap-2">
              <span className="flex items-center gap-2 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#c45c5c]" /> Demo Support Hotline:
              </span>
              <a
                href="tel:+8800000000000"
                className="font-bold text-[#e8eaed] hover:text-[#c45c5c] transition-colors"
              >
                +880 0000-000000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Warranty, Customer Reviews */}
      <div className="mb-16">
        <div className="border-b border-[#2a2e37] flex gap-4 sm:gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "specs"
                ? "border-[#c45c5c] text-[#c45c5c] font-black"
                : "border-transparent text-[#6b7280] hover:text-[#e8eaed]"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("warranty")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "warranty"
                ? "border-[#c45c5c] text-[#c45c5c] font-black"
                : "border-transparent text-[#6b7280] hover:text-[#e8eaed]"
            }`}
          >
            Warranty & Delivery Policy
          </button>
          <button
            onClick={() => setActiveTab("emi")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "emi"
                ? "border-[#c45c5c] text-[#c45c5c] font-black"
                : "border-transparent text-[#6b7280] hover:text-[#e8eaed]"
            }`}
          >
            EMI Calculator
          </button>
        </div>

        <div className="py-6">
          {activeTab === "specs" && (
            <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 space-y-6 shadow-xs">
              <h3 className="text-base font-black text-[#e8eaed]">Full Product Specifications</h3>
              <div className="divide-y divide-[#2a2e37]">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <div key={key} className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <span className="font-bold text-[#6b7280]">{key}</span>
                    <span className="sm:col-span-2 text-[#e8eaed] font-medium">{val}</span>
                  </div>
                ))}
              </div>

              {product.keyFeatures && (
                <div className="pt-4 border-t border-[#2a2e37]">
                  <h4 className="text-sm font-bold text-[#e8eaed] mb-3">Key Highlights:</h4>
                  <ul className="space-y-2 text-xs text-[#9aa3af]">
                    {product.keyFeatures.map((kf, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{kf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 space-y-4 text-xs text-[#9aa3af] leading-relaxed shadow-xs">
              <h3 className="text-base font-black text-[#e8eaed]">Authenticity & Service Guarantee</h3>
              <p>
                Every device sold at <strong className="text-[#e8eaed]">iSPACE BD</strong> comes with full verification. For official Apple, Samsung, and Sony products, warranty coverage can be cross-verified directly on the official manufacturer serial portal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37]">
                  <h4 className="font-bold text-[#e8eaed] mb-1">7 Days Replacement</h4>
                  <p className="text-[#6b7280]">If any manufacturing fault occurs within 7 days, get an instant replacement.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37]">
                  <h4 className="font-bold text-[#e8eaed] mb-1">Dedicated Service Lab</h4>
                  <p className="text-[#6b7280]">Our certified Apple & smartphone hardware engineers provide authorized care in Dhaka.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37]">
                  <h4 className="font-bold text-[#e8eaed] mb-1">Express Delivery</h4>
                  <p className="text-[#6b7280]">Inside Dhaka deliveries completed within 24 hours. Outside Dhaka across all 64 districts in 48 hours.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "emi" && (
            <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 space-y-6 shadow-xs">
              <div>
                <h3 className="text-base font-black text-[#e8eaed]">Interactive EMI Calculator</h3>
                <p className="text-xs text-[#6b7280] mt-1 font-medium">
                  Calculate your monthly installment for {product.name} across 24+ Bangladeshi banks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-1.5">
                    Select Credit Card Bank
                  </label>
                  <select
                    value={selectedEmiBank}
                    onChange={(e) => setSelectedEmiBank(e.target.value)}
                    className="w-full bg-[#1c1f26] border border-[#2a2e37] rounded-xl px-3 py-2.5 text-xs text-[#e8eaed] font-bold"
                  >
                    {emiBanks.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} (0% Interest)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#9aa3af] mb-1.5">
                    Select EMI Tenure
                  </label>
                  <select
                    value={selectedEmiMonths}
                    onChange={(e) => setSelectedEmiMonths(Number(e.target.value))}
                    className="w-full bg-[#1c1f26] border border-[#2a2e37] rounded-xl px-3 py-2.5 text-xs text-[#e8eaed] font-bold"
                  >
                    {[3, 6, 9, 12, 18, 24, 36].map((m) => (
                      <option key={m} value={m}>
                        {m} Months Installment
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6b7280] block font-medium">Monthly Installment</span>
                  <span className="text-2xl font-black text-amber-400">
                    {formatBDT(monthlyEmi)} / month
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#6b7280] block font-medium">Total Device Price</span>
                  <span className="text-sm font-black text-[#e8eaed]">
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
        <div className="pt-8 border-t border-[#2a2e37]">
          <h2 className="text-xl sm:text-2xl font-black text-[#e8eaed] tracking-tight mb-6">
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
        className={`lg:hidden fixed bottom-24 left-0 right-0 z-30 mx-3 rounded-2xl bg-[#14171c]/95 backdrop-blur-md border border-[#2a2e37] px-3.5 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.35)] flex items-center justify-between gap-3 transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-10 h-10 object-contain p-0.5 rounded-lg bg-[#1c1f26] border border-[#2a2e37] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#e8eaed] truncate">{product.name}</p>
            <p className="text-xs font-black text-[#c45c5c]">{formatBDT(currentPrice)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-[#1c1f26] hover:bg-[#2a2e37] border border-[#2a2e37] text-[#e8eaed] transition-all shadow-2xs"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#c45c5c]" />
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
