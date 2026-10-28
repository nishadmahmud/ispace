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
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-10 shadow-sm space-y-8">
          {/* Success Check Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#e8eaed]">
              Thank You! Your Order is Placed
            </h1>
            <p className="text-xs sm:text-sm text-[#9aa3af] max-w-md mx-auto">
              We&apos;ve received your order. Our customer executive will call you shortly to verify your phone number and delivery location.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1c1f26] border border-[#2a2e37] text-xs font-mono text-[#9aa3af]">
              Order ID: <strong className="text-[#e8eaed]">{orderId}</strong>
            </div>
          </div>

          {/* Timeline Tracking Progression */}
          <div className="p-5 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] space-y-4">
            <h3 className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">
              Order Tracking Timeline
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                  ✓
                </div>
                <p className="font-bold text-[#e8eaed] text-[11px]">Placed</p>
                <p className="text-[10px] text-[#6b7280]">Just now</p>
              </div>
              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-[#c45c5c]/15 text-[#c45c5c] border border-[#c45c5c]/30 font-bold flex items-center justify-center mx-auto text-xs">
                  2
                </div>
                <p className="font-bold text-[#e8eaed] text-[11px]">Verification</p>
                <p className="text-[10px] text-[#6b7280]">Within 30m</p>
              </div>
              <div className="space-y-1.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-[#2a2e37] text-[#9aa3af] flex items-center justify-center mx-auto text-xs font-bold">
                  3
                </div>
                <p className="font-medium text-[#6b7280] text-[11px]">Courier Pack</p>
                <p className="text-[10px] text-[#6b7280]">Pending</p>
              </div>
              <div className="space-y-1.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-[#2a2e37] text-[#9aa3af] flex items-center justify-center mx-auto text-xs font-bold">
                  4
                </div>
                <p className="font-medium text-[#6b7280] text-[11px]">Delivery</p>
                <p className="text-[10px] text-[#6b7280]">At Doorstep</p>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Summary */}
          {order && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] space-y-1.5">
                <h4 className="font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Delivery Address</h4>
                <p className="text-[#e8eaed] font-bold">{order.customer.fullName}</p>
                <p className="text-[#9aa3af]">{order.customer.phone}</p>
                <p className="text-[#9aa3af] leading-relaxed">{order.customer.address}, {order.customer.division}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] space-y-1.5">
                <h4 className="font-bold text-[#6b7280] uppercase tracking-wider text-[11px]">Payment & Shipping</h4>
                <p className="text-[#e8eaed]">
                  Payment: <strong className="capitalize text-emerald-400 font-bold">{order.paymentMethod}</strong>
                </p>
                <p className="text-[#9aa3af]">
                  Shipping: {order.shippingMethod === "inside" ? "Inside Dhaka (৳60)" : "Outside Dhaka (৳120)"}
                </p>
                <p className="text-base font-black text-[#e8eaed] pt-1">
                  Total: <span className="text-[#c45c5c]">{formatBDT(order.total)}</span>
                </p>
              </div>
            </div>
          )}

          {/* Hotline Callout */}
          <div className="p-4 rounded-2xl bg-[#c45c5c]/10 border border-[#c45c5c]/25 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#c45c5c]" />
              <span className="text-[#9aa3af] font-medium">
                Have questions regarding your delivery? Call our dispatch hotline:
              </span>
            </div>
            <a
              href="tel:+8800000000000"
              className="font-bold text-[#e8eaed] hover:text-[#c45c5c] transition-colors shrink-0"
            >
              +880 0000-000000
            </a>
          </div>

          {/* Navigation CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold text-center transition-all shadow-md shadow-black/40"
            >
              Return to Homepage
            </Link>
            <Link
              href="/track-order"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#1c1f26] hover:bg-[#2a2e37] border border-[#2a2e37] text-[#e8eaed] text-xs font-bold text-center transition-all"
            >
              Track Order Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
