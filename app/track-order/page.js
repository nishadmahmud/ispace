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
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Track Order</span>
        </div>

        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 mx-auto mb-2">
              <Truck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Track Your Order Status
            </h1>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Enter your iSPACE BD Order ID (e.g. ISP-849201) and contact number to check your delivery status.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-xl mx-auto">
            <div className="sm:col-span-6">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Order Number
              </label>
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ISP-849201"
                className="w-full h-11 px-3.5 rounded-xl bg-gray-50 border border-gray-300 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#ef233c]"
              />
            </div>
            <div className="sm:col-span-6">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full h-11 px-3.5 rounded-xl bg-gray-50 border border-gray-300 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#ef233c]"
              />
            </div>
            <div className="sm:col-span-12 pt-2">
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/25"
              >
                <Search className="w-4 h-4" /> Track Parcel Now
              </button>
            </div>
          </form>

          {/* Track Results */}
          {searched && (
            <div className="pt-6 border-t border-gray-200">
              {foundOrder ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-500">Order Found:</span>{" "}
                      <strong className="text-gray-900 font-mono">{foundOrder.orderId}</strong>
                    </div>
                    <span className="text-emerald-800 font-black px-2 py-0.5 rounded bg-emerald-100 border border-emerald-200">
                      Processing Dispatch
                    </span>
                  </div>

                  {/* Visual Steps */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="space-y-1">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                          ✓
                        </div>
                        <p className="font-bold text-gray-900 text-[11px]">Placed</p>
                      </div>
                      <div className="space-y-1">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                          ✓
                        </div>
                        <p className="font-bold text-gray-900 text-[11px]">Verified</p>
                      </div>
                      <div className="space-y-1">
                        <div className="w-7 h-7 rounded-full bg-red-100 text-[#ef233c] border border-red-300 font-bold flex items-center justify-center mx-auto text-xs">
                          3
                        </div>
                        <p className="font-bold text-red-600 text-[11px]">Packing</p>
                      </div>
                      <div className="space-y-1 opacity-50">
                        <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-xs font-bold">
                          4
                        </div>
                        <p className="font-medium text-gray-500 text-[11px]">Out for Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Recipient:</span>
                      <span className="text-gray-900 font-bold">{foundOrder.customer.fullName}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Address:</span>
                      <span className="text-gray-900">{foundOrder.customer.address}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Payment Method:</span>
                      <span className="text-gray-900 capitalize font-bold">{foundOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 pt-2 border-t border-gray-200">
                      <span className="font-bold text-gray-900">Total Amount:</span>
                      <span className="font-black text-[#ef233c]">{formatBDT(foundOrder.total)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-center space-y-2">
                  <p className="text-xs text-amber-800 font-bold">
                    No active parcel found for &quot;{orderId}&quot;.
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Please ensure you typed the order code correctly or reach our support hotline:
                  </p>
                  <a
                    href="tel:+8800000000000"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-red-600 mt-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#ef233c]" /> +880 0000-000000
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
