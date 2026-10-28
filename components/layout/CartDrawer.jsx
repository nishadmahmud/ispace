"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatBDT } from "@/data/emi-banks";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQty, removeFromCart, cartTotal, cartCount } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen sm:max-w-md bg-[#14171c] border-l border-[#2a2e37] text-[#e8eaed] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#2a2e37] flex items-center justify-between bg-[#14171c]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c45c5c]" />
              <h2 className="text-lg font-black tracking-tight text-[#e8eaed]">Shopping Bag</h2>
              <span className="bg-[#c45c5c]/10 text-[#c45c5c] border border-[#c45c5c]/25 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#6b7280] hover:text-[#e8eaed] rounded-lg hover:bg-[#1c1f26] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-[#1c1f26]/50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c1f26] flex items-center justify-center text-[#6b7280]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-[#e8eaed]">Your bag is empty</h3>
                  <p className="text-xs text-[#6b7280] mt-1">
                    Explore top Apple devices, flagship smartphones, and premium audio gadgets.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold transition-all shadow-md shadow-black/40"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartKey}
                  className="p-3.5 rounded-2xl bg-[#14171c] border border-[#2a2e37] flex gap-3.5 relative shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-[#1c1f26] border border-[#2a2e37] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-[#e8eaed] hover:text-[#c45c5c] line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartKey)}
                          className="text-[#6b7280] hover:text-[#c45c5c] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#6b7280]">
                        {item.options.storage && (
                          <span className="bg-[#1c1f26] px-1.5 py-0.5 rounded text-[#9aa3af] font-medium">
                            {item.options.storage}
                          </span>
                        )}
                        {item.options.color && (
                          <span className="bg-[#1c1f26] px-1.5 py-0.5 rounded text-[#9aa3af] font-medium">
                            {item.options.color}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2a2e37]">
                      <div className="flex items-center border border-[#2a2e37] rounded-lg overflow-hidden bg-[#14171c]">
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty - 1)}
                          className="p-1 hover:bg-[#1c1f26] text-[#9aa3af] hover:text-[#e8eaed] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#e8eaed]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty + 1)}
                          className="p-1 hover:bg-[#1c1f26] text-[#9aa3af] hover:text-[#e8eaed] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-[#e8eaed]">
                          {formatBDT(item.unitPrice * item.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#2a2e37] bg-[#14171c] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#9aa3af]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#e8eaed]">{formatBDT(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#9aa3af]">
                  <span>Delivery Inside Dhaka</span>
                  <span className="text-emerald-400 font-bold">৳60</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-2 border-t border-[#2a2e37] text-[#e8eaed]">
                  <span>Estimated Total</span>
                  <span className="text-[#c45c5c]">{formatBDT(cartTotal + 60)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 px-4 rounded-xl border border-[#2a2e37] hover:bg-[#1c1f26] text-[#e8eaed] text-xs font-bold text-center transition-all"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-black/40"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[10px] text-center text-[#6b7280] pt-1 font-medium">
                🔒 100% Genuine Apple & Gadget Products • Official Warranty Included
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
