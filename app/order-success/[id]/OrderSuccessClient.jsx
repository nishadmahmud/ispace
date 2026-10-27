"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatBDT } from "@/data/emi-banks";
import {
  CheckCircle2,
  Phone
} from "lucide-react";

export default function OrderSuccessClient({ orderId }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ispace_order_${orderId}`);
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {}
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Success Check Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Thank You! Your Order is Placed
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              We&apos;ve received your order. Our customer executive will call you shortly to verify your phone number and delivery location.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-700">
              Order ID: <strong className="text-gray-900">{orderId}</strong>
            </div>
          </div>

          {/* Timeline Tracking Progression */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Order Tracking Timeline
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                  ✓
                </div>
                <p className="font-bold text-gray-900 text-[11px]">Placed</p>
                <p className="text-[10px] text-gray-500">Just now</p>
              </div>
              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-red-100 text-[#ef233c] border border-red-300 font-bold flex items-center justify-center mx-auto text-xs">
                  2
                </div>
                <p className="font-bold text-gray-800 text-[11px]">Verification</p>
                <p className="text-[10px] text-gray-500">Within 30m</p>
              </div>
              <div className="space-y-1.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-xs font-bold">
                  3
                </div>
                <p className="font-medium text-gray-500 text-[11px]">Courier Pack</p>
                <p className="text-[10px] text-gray-400">Pending</p>
              </div>
              <div className="space-y-1.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-xs font-bold">
                  4
                </div>
                <p className="font-medium text-gray-500 text-[11px]">Delivery</p>
                <p className="text-[10px] text-gray-400">At Doorstep</p>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Summary */}
          {order && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
                <h4 className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">Delivery Address</h4>
                <p className="text-gray-900 font-bold">{order.customer.fullName}</p>
                <p className="text-gray-700">{order.customer.phone}</p>
                <p className="text-gray-600 leading-relaxed">{order.customer.address}, {order.customer.division}</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
                <h4 className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">Payment & Shipping</h4>
                <p className="text-gray-900">
                  Payment: <strong className="capitalize text-emerald-700 font-bold">{order.paymentMethod}</strong>
                </p>
                <p className="text-gray-600">
                  Shipping: {order.shippingMethod === "inside" ? "Inside Dhaka (৳60)" : "Outside Dhaka (৳120)"}
                </p>
                <p className="text-base font-black text-gray-900 pt-1">
                  Total: <span className="text-[#ef233c]">{formatBDT(order.total)}</span>
                </p>
              </div>
            </div>
          )}

          {/* Hotline Callout */}
          <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#ef233c]" />
              <span className="text-gray-700 font-medium">
                Have questions regarding your delivery? Call our dispatch hotline:
              </span>
            </div>
            <a
              href="tel:+8800000000000"
              className="font-bold text-gray-900 hover:text-red-600 transition-colors shrink-0"
            >
              +880 0000-000000
            </a>
          </div>

          {/* Navigation CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold text-center transition-all shadow-md shadow-red-500/25"
            >
              Return to Homepage
            </Link>
            <Link
              href="/track-order"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-xs font-bold text-center transition-all"
            >
              Track Order Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
