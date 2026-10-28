"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatBDT } from "@/data/emi-banks";
import { Search, Phone, Truck } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setSearched(true);
    try {
      const saved = localStorage.getItem(`ispace_order_${orderId.trim()}`);
      if (saved) {
        setFoundOrder(JSON.parse(saved));
      } else {
        setFoundOrder(null);
      }
    } catch (e) {
      setFoundOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-6 font-medium">
          <Link href="/" className="hover:text-[#e8eaed] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#e8eaed] font-bold">Track Order</span>
        </div>

        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-400 mx-auto mb-2">
              <Truck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#e8eaed]">
              Track Your Order Status
            </h1>
            <p className="text-xs text-[#6b7280] max-w-sm mx-auto">
              Enter your iSPACE BD Order ID (e.g. ISP-849201) and contact number to check your delivery status.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-xl mx-auto">
            <div className="sm:col-span-6">
              <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                Order Number
              </label>
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ISP-849201"
                className="w-full h-11 px-3.5 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
              />
            </div>
            <div className="sm:col-span-6">
              <label className="block text-xs font-bold text-[#9aa3af] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full h-11 px-3.5 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] placeholder-[#6b7280] focus:outline-none focus:bg-[#14171c] focus:border-[#c45c5c]"
              />
            </div>
            <div className="sm:col-span-12 pt-2">
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-black/40"
              >
                <Search className="w-4 h-4" /> Track Parcel Now
              </button>
            </div>
          </form>

          {/* Track Results */}
          {searched && (
            <div className="pt-6 border-t border-[#2a2e37]">
              {foundOrder ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#6b7280]">Order Found:</span>{" "}
                      <strong className="text-[#e8eaed] font-mono">{foundOrder.orderId}</strong>
                    </div>
                    <span className="text-emerald-400 font-black px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25">
                      Processing Dispatch
                    </span>
                  </div>

                  {/* Visual Steps */}
                  <div className="p-5 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="space-y-1">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                          ✓
                        </div>
                        <p className="font-bold text-[#e8eaed] text-[11px]">Placed</p>
                      </div>
                      <div className="space-y-1">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                          ✓
                        </div>
                        <p className="font-bold text-[#e8eaed] text-[11px]">Verified</p>
                      </div>
                      <div className="space-y-1">
                        <div className="w-7 h-7 rounded-full bg-[#c45c5c]/15 text-[#c45c5c] border border-[#c45c5c]/30 font-bold flex items-center justify-center mx-auto text-xs">
                          3
                        </div>
                        <p className="font-bold text-[#c45c5c] text-[11px]">Packing</p>
                      </div>
                      <div className="space-y-1 opacity-50">
                        <div className="w-7 h-7 rounded-full bg-[#2a2e37] text-[#9aa3af] flex items-center justify-center mx-auto text-xs font-bold">
                          4
                        </div>
                        <p className="font-medium text-[#6b7280] text-[11px]">Out for Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] text-xs space-y-2">
                    <div className="flex justify-between text-[#9aa3af]">
                      <span>Recipient:</span>
                      <span className="text-[#e8eaed] font-bold">{foundOrder.customer.fullName}</span>
                    </div>
                    <div className="flex justify-between text-[#9aa3af]">
                      <span>Address:</span>
                      <span className="text-[#e8eaed]">{foundOrder.customer.address}</span>
                    </div>
                    <div className="flex justify-between text-[#9aa3af]">
                      <span>Payment Method:</span>
                      <span className="text-[#e8eaed] capitalize font-bold">{foundOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-[#9aa3af] pt-2 border-t border-[#2a2e37]">
                      <span className="font-bold text-[#e8eaed]">Total Amount:</span>
                      <span className="font-black text-[#c45c5c]">{formatBDT(foundOrder.total)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] text-center space-y-2">
                  <p className="text-xs text-amber-400 font-bold">
                    No active parcel found for &quot;{orderId}&quot;.
                  </p>
                  <p className="text-[11px] text-[#6b7280] font-medium">
                    Please ensure you typed the order code correctly or reach our support hotline:
                  </p>
                  <a
                    href="tel:+8800000000000"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e8eaed] hover:text-[#c45c5c] mt-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c45c5c]" /> +880 0000-000000
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
