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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 text-gray-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#ef233c]" />
              <h2 className="text-lg font-black tracking-tight text-gray-900">Shopping Bag</h2>
              <span className="bg-red-50 text-[#ef233c] border border-red-200 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-gray-50/50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Your bag is empty</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Explore top Apple devices, flagship smartphones, and premium audio gadgets.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold transition-all shadow-md shadow-red-500/20"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartKey}
                  className="p-3.5 rounded-2xl bg-white border border-gray-200 flex gap-3.5 relative shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-gray-50 border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-gray-900 hover:text-red-600 line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartKey)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                        {item.options.storage && (
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-medium">
                            {item.options.storage}
                          </span>
                        )}
                        {item.options.color && (
                          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-medium">
                            {item.options.color}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty - 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.cartKey, item.qty + 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-gray-900">
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
            <div className="p-5 border-t border-gray-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{formatBDT(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Inside Dhaka</span>
                  <span className="text-emerald-700 font-bold">৳60</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-2 border-t border-gray-100 text-gray-900">
                  <span>Estimated Total</span>
                  <span className="text-[#ef233c]">{formatBDT(cartTotal + 60)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold text-center transition-all"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-500/25"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[10px] text-center text-gray-500 pt-1 font-medium">
                🔒 100% Genuine Apple & Gadget Products • Official Warranty Included
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
