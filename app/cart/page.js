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
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Shopping Bag ({cartCount})</span>
        </div>

        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">
          Review Your Shopping Bag
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white border border-gray-200 p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your bag is currently empty</h2>
            <p className="text-xs text-gray-500">
              Looks like you haven&apos;t added any gadgets to your bag yet. Explore our genuine Apple iPhones, MacBooks, and smart accessories.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold transition-all shadow-md shadow-red-500/20"
              >
                Browse All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-3xl bg-white border border-gray-200 overflow-hidden divide-y divide-gray-100 shadow-xs">
                {cart.map((item) => (
                  <div
                    key={item.cartKey}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-2xl bg-gray-50 border border-gray-200 shrink-0"
                      />
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-bold text-sm text-gray-900 hover:text-red-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-gray-500">
                          {item.options.storage && (
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">
                              Storage: {item.options.storage}
                            </span>
                          )}
                          {item.options.color && (
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">
                              Color: {item.options.color}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-black text-gray-900 mt-1">
                          {formatBDT(item.unitPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1">
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty - 1)}
                          className="p-1.5 text-gray-500 hover:text-black transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty + 1)}
                          className="p-1.5 text-gray-500 hover:text-black transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-sm font-black text-gray-900">
                          {formatBDT(item.unitPrice * item.qty)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-gray-400 hover:text-red-600 p-2 transition-colors"
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
                  className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-black font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-600 transition-colors font-medium"
                >
                  Clear Entire Bag
                </button>
              </div>
            </div>

            {/* Order Summary & Coupon (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Coupon Form */}
              <div className="rounded-3xl bg-white border border-gray-200 p-5 space-y-3 shadow-xs">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#ef233c]" /> Have a Promo Code?
                </h3>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try 'ISPACE500'"
                    className="flex-1 h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#ef233c]"
                  />
                  <button
                    type="submit"
                    className="px-4 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors border border-gray-200"
                  >
                    Apply
                  </button>
                </form>
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-700 font-bold">
                    ✓ Applied &quot;{appliedCoupon}&quot; (-৳500)
                  </p>
                )}
              </div>

              {/* Shipping Estimator */}
              <div className="rounded-3xl bg-white border border-gray-200 p-5 space-y-3 shadow-xs">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                  Shipping Destination
                </h3>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "inside"}
                        onChange={() => setShippingMethod("inside")}
                        className="accent-[#ef233c]"
                      />
                      <span className="font-medium text-gray-800">Inside Dhaka (24 Hours)</span>
                    </div>
                    <span className="font-bold text-gray-900">৳60</span>
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "outside"}
                        onChange={() => setShippingMethod("outside")}
                        className="accent-[#ef233c]"
                      />
                      <span className="font-medium text-gray-800">Outside Dhaka (48 Hours)</span>
                    </div>
                    <span className="font-bold text-gray-900">৳120</span>
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="accent-[#ef233c]"
                      />
                      <span className="font-medium text-gray-800">Express Same-Day Dhaka</span>
                    </div>
                    <span className="font-bold text-gray-900">৳150</span>
                  </label>
                </div>
              </div>

              {/* Summary Card */}
              <div className="rounded-3xl bg-white border border-gray-200 p-5 space-y-4 shadow-xs">
                <h3 className="text-sm font-black text-gray-900">Order Summary</h3>
                <div className="space-y-2 text-xs divide-y divide-gray-100">
                  <div className="flex justify-between text-gray-600 pb-2">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">{formatBDT(cartTotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold py-2">
                      <span>Promo Discount</span>
                      <span>-{formatBDT(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 py-2">
                    <span>Delivery Charge</span>
                    <span className="font-bold text-gray-900">{formatBDT(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-gray-900 pt-3">
                    <span>Total Payable</span>
                    <span className="text-[#ef233c]">{formatBDT(finalTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/25"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-gray-500 text-center font-medium">
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
