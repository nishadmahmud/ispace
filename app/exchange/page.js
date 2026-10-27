"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { formatBDT } from "@/data/emi-banks";
import { RotateCcw, ArrowRight } from "lucide-react";

const tradeInDevices = [
  { id: "ip15pm", name: "iPhone 15 Pro Max", baseValuation: 105000 },
  { id: "ip15p", name: "iPhone 15 Pro", baseValuation: 88000 },
  { id: "ip15", name: "iPhone 15", baseValuation: 62000 },
  { id: "ip14pm", name: "iPhone 14 Pro Max", baseValuation: 82000 },
  { id: "ip14p", name: "iPhone 14 Pro", baseValuation: 72000 },
  { id: "ip14", name: "iPhone 14", baseValuation: 50000 },
  { id: "ip13pm", name: "iPhone 13 Pro Max", baseValuation: 64000 },
  { id: "ip13p", name: "iPhone 13 Pro", baseValuation: 54000 },
  { id: "ip13", name: "iPhone 13", baseValuation: 42000 },
  { id: "s24u", name: "Samsung Galaxy S24 Ultra", baseValuation: 86000 },
  { id: "s23u", name: "Samsung Galaxy S23 Ultra", baseValuation: 62000 },
  { id: "px8p", name: "Google Pixel 8 Pro", baseValuation: 48000 }
];

const conditions = [
  { id: "flawless", name: "Flawless (Grade A+)", multiplier: 1.0, desc: "Like new, no scratches, battery health 85%+" },
  { id: "good", name: "Good Condition", multiplier: 0.9, desc: "Minor normal signs of use, no cracks" },
  { id: "fair", name: "Fair Condition", multiplier: 0.75, desc: "Visible scratches, minor dents, fully functional" }
];

export default function ExchangePage() {
  const [selectedDevice, setSelectedDevice] = useState(tradeInDevices[0].id);
  const [selectedCondition, setSelectedCondition] = useState("flawless");
  const [targetDevice, setTargetDevice] = useState(products[0]?.id || "");

  const device = tradeInDevices.find((d) => d.id === selectedDevice) || tradeInDevices[0];
  const condition = conditions.find((c) => c.id === selectedCondition) || conditions[0];
  const newProduct = products.find((p) => p.id === targetDevice) || products[0];

  const estimatedValue = Math.round(device.baseValuation * condition.multiplier);
  const differenceToPay = Math.max(0, newProduct.price - estimatedValue);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Device Trade-in & Exchange</span>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 mb-10 shadow-xs">
          <div className="max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <RotateCcw className="w-3.5 h-3.5 text-[#ef233c]" /> iSPACE RECELL PROGRAM
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Trade-in Your Old Phone
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Get maximum market valuation for your old smartphone. Exchange it instantly towards any brand new iPhone, MacBook, or flagship device with zero waiting.
            </p>
          </div>
        </div>

        {/* Interactive Estimator Form */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 mb-12 shadow-xs">
          <h2 className="text-lg font-black text-gray-900 mb-6">
            Calculate Your Trade-in Credit & Cash Difference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Select Old Device */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700">
                1. What phone are you exchanging?
              </label>
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-bold"
              >
                {tradeInDevices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Condition */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700">
                2. Device Physical Condition
              </label>
              <div className="space-y-2">
                {conditions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCondition(c.id)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedCondition === c.id
                        ? "bg-white border-[#ef233c] text-gray-900 font-bold shadow-2xs ring-1 ring-red-500/20"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:text-black hover:bg-gray-100"
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-900">{c.name}</p>
                    <p className="text-[10px] text-gray-500">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Desired Target Device */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700">
                3. Upgrade To Which Device?
              </label>
              <select
                value={targetDevice}
                onChange={(e) => setTargetDevice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-bold"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({formatBDT(p.price)})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-gray-500 font-medium">
                New device includes full 1 Year Official Warranty and 7 Days Replacement.
              </p>
            </div>
          </div>

          {/* Results Comparison Box */}
          <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs text-gray-600">
                Estimated Trade-in Credit for your <strong className="text-gray-900 font-bold">{device.name}</strong>:
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gray-900">
                {formatBDT(estimatedValue)}
              </div>
              <div className="text-xs text-gray-600 pt-1 font-medium">
                New Device: <strong className="text-gray-900 font-bold">{newProduct.name}</strong> ({formatBDT(newProduct.price)})
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center sm:text-right space-y-1 shadow-2xs">
              <span className="text-xs text-gray-500 block font-medium">Remaining Cash to Pay</span>
              <span className="text-3xl font-black text-gray-900 block">
                {formatBDT(differenceToPay)}
              </span>
              <span className="text-[10px] text-gray-500 font-bold block">
                Or 0% EMI from {formatBDT(Math.ceil(differenceToPay / 12))}/mo
              </span>
            </div>

            <Link
              href={`/product/${newProduct.slug}`}
              className="px-6 py-3.5 rounded-2xl bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-red-500/20 shrink-0"
            >
              Exchange & Buy Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Steps How Trade-In Works */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-lg font-black text-gray-900">How Device Exchange Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white font-black flex items-center justify-center text-xs">
                1
              </span>
              <h3 className="font-bold text-gray-900">Check Online Quote</h3>
              <p className="text-gray-500">Use this calculator to get an initial estimate of your device value.</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white font-black flex items-center justify-center text-xs">
                2
              </span>
              <h3 className="font-bold text-gray-900">Visit Any Showroom</h3>
              <p className="text-gray-500">Bring your old device to Gulshan, Dhanmondi, Uttara, Mirpur, or Chattogram.</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white font-black flex items-center justify-center text-xs">
                3
              </span>
              <h3 className="font-bold text-gray-900">5-Min Diagnostic</h3>
              <p className="text-gray-500">Our hardware technician tests screen, cameras, and battery health on the spot.</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-gray-900 text-white font-black flex items-center justify-center text-xs">
                4
              </span>
              <h3 className="font-bold text-gray-900">Walk Out Upgraded</h3>
              <p className="text-gray-500">We transfer all your photos and data to your brand new device for free!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
