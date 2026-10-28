"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { formatBDT } from "@/data/emi-banks";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ArrowLeft
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartQty, removeFromCart, clearCart, cartTotal, cartCount, showToast } = useStore();

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [shippingMethod, setShippingMethod] = useState("inside");

  const shippingCost = shippingMethod === "inside" ? 60 : shippingMethod === "outside" ? 120 : 150;
  const finalTotal = Math.max(0, cartTotal - discountAmount + (cart.length > 0 ? shippingCost : 0));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "ISPACE500") {
      setDiscountAmount(500);
      setAppliedCoupon("ISPACE500");
      showToast("Coupon applied! ৳500 discount added");
    } else {
      showToast("Invalid coupon code. Try ISPACE500", "warning");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-6 font-medium">
          <Link href="/" className="hover:text-[#e8eaed] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#e8eaed] font-bold">Shopping Bag ({cartCount})</span>
        </div>

        <h1 className="text-3xl font-black text-[#e8eaed] tracking-tight mb-8">
          Review Your Shopping Bag
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-[#1c1f26] flex items-center justify-center text-[#6b7280] mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-[#e8eaed]">Your bag is currently empty</h2>
            <p className="text-xs text-[#6b7280]">
              Looks like you haven&apos;t added any gadgets to your bag yet. Explore our genuine Apple iPhones, MacBooks, and smart accessories.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold transition-all shadow-md shadow-black/40"
              >
                Browse All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] overflow-hidden divide-y divide-[#2a2e37] shadow-xs">
                {cart.map((item) => (
                  <div
                    key={item.cartKey}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-2xl bg-[#1c1f26] border border-[#2a2e37] shrink-0"
                      />
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-bold text-sm text-[#e8eaed] hover:text-[#c45c5c] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#6b7280]">
                          {item.options.storage && (
                            <span className="bg-[#1c1f26] px-2 py-0.5 rounded text-[#9aa3af] font-medium">
                              Storage: {item.options.storage}
                            </span>
                          )}
                          {item.options.color && (
                            <span className="bg-[#1c1f26] px-2 py-0.5 rounded text-[#9aa3af] font-medium">
                              Color: {item.options.color}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-black text-[#e8eaed] mt-1">
                          {formatBDT(item.unitPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#2a2e37] rounded-xl bg-[#14171c] p-1">
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty - 1)}
                          className="p-1.5 text-[#6b7280] hover:text-[#e8eaed] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#e8eaed]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty + 1)}
                          className="p-1.5 text-[#6b7280] hover:text-[#e8eaed] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-sm font-black text-[#e8eaed]">
                          {formatBDT(item.unitPrice * item.qty)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-[#6b7280] hover:text-[#c45c5c] p-2 transition-colors"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-xs text-[#9aa3af] hover:text-[#e8eaed] font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#6b7280] hover:text-[#c45c5c] transition-colors font-medium"
                >
                  Clear Entire Bag
                </button>
              </div>
            </div>

            {/* Order Summary & Coupon (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Coupon Form */}
              <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-5 space-y-3 shadow-xs">
                <h3 className="text-xs font-black text-[#e8eaed] uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#c45c5c]" /> Have a Promo Code?
                </h3>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try 'ISPACE500'"
                    className="flex-1 h-10 px-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
                  />
                  <button
                    type="submit"
                    className="px-4 h-10 rounded-xl bg-[#1c1f26] hover:bg-[#2a2e37] text-xs font-bold text-[#e8eaed] transition-colors border border-[#2a2e37]"
                  >
                    Apply
                  </button>
                </form>
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-400 font-bold">
                    ✓ Applied &quot;{appliedCoupon}&quot; (-৳500)
                  </p>
                )}
              </div>

              {/* Shipping Estimator */}
              <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-5 space-y-3 shadow-xs">
                <h3 className="text-xs font-black text-[#e8eaed] uppercase tracking-wider">
                  Shipping Destination
                </h3>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "inside"}
                        onChange={() => setShippingMethod("inside")}
                        className="accent-[#c45c5c]"
                      />
                      <span className="font-medium text-[#e8eaed]">Inside Dhaka (24 Hours)</span>
                    </div>
                    <span className="font-bold text-[#e8eaed]">৳60</span>
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "outside"}
                        onChange={() => setShippingMethod("outside")}
                        className="accent-[#c45c5c]"
                      />
                      <span className="font-medium text-[#e8eaed]">Outside Dhaka (48 Hours)</span>
                    </div>
                    <span className="font-bold text-[#e8eaed]">৳120</span>
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="accent-[#c45c5c]"
                      />
                      <span className="font-medium text-[#e8eaed]">Express Same-Day Dhaka</span>
                    </div>
                    <span className="font-bold text-[#e8eaed]">৳150</span>
                  </label>
                </div>
              </div>

              {/* Summary Card */}
              <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-5 space-y-4 shadow-xs">
                <h3 className="text-sm font-black text-[#e8eaed]">Order Summary</h3>
                <div className="space-y-2 text-xs divide-y divide-[#2a2e37]">
                  <div className="flex justify-between text-[#9aa3af] pb-2">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#e8eaed]">{formatBDT(cartTotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold py-2">
                      <span>Promo Discount</span>
                      <span>-{formatBDT(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#9aa3af] py-2">
                    <span>Delivery Charge</span>
                    <span className="font-bold text-[#e8eaed]">{formatBDT(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[#e8eaed] pt-3">
                    <span>Total Payable</span>
                    <span className="text-[#c45c5c]">{formatBDT(finalTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-black/40"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-[#6b7280] text-center font-medium">
                  🔒 Safe & Secure Checkout • bKash, Cards, 0% EMI & Cash on Delivery
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
