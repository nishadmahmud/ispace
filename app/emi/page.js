"use client";

import React, { useState } from "react";
import Link from "next/link";
import { emiBanks, calculateEMI, formatBDT } from "@/data/emi-banks";
import { products } from "@/data/products";
import { CreditCard, ArrowRight } from "lucide-react";

export default function EMIPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || "");
  const [customPrice, setCustomPrice] = useState(products[0]?.price || 169999);
  const [selectedBank, setSelectedBank] = useState(emiBanks[0]?.id || "");
  const [selectedMonths, setSelectedMonths] = useState(12);

  const activeBank = emiBanks.find((b) => b.id === selectedBank) || emiBanks[0];
  const monthlyInstallment = calculateEMI(customPrice, selectedMonths);

  const handleProductSelect = (e) => {
    const id = e.target.value;
    setSelectedProduct(id);
    const prod = products.find((p) => p.id === id);
    if (prod) {
      setCustomPrice(prod.price);
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
          <span className="text-[#e8eaed] font-bold">0% EMI Facility</span>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-10 mb-10 shadow-xs">
          <div className="max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#1c1f26] text-[#e8eaed] border border-[#2a2e37] text-[11px] font-black uppercase tracking-wider">
              24+ PARTNER BANKS IN BANGLADESH
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#e8eaed] tracking-tight">
              0% Interest EMI Facility
            </h1>
            <p className="text-xs sm:text-sm text-[#9aa3af] leading-relaxed">
              Own your dream iPhone, MacBook, or flagship device today with zero interest EMI for up to 36 months using credit cards from leading commercial banks.
            </p>
          </div>
        </div>

        {/* Calculator Widget */}
        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-[#e8eaed]">
              Instant Monthly Installment Calculator
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Device / Price */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#9aa3af]">
                1. Select Gadget or Enter Price (BDT)
              </label>
              <select
                value={selectedProduct}
                onChange={handleProductSelect}
                className="w-full bg-[#1c1f26] border border-[#2a2e37] rounded-xl px-3 py-2.5 text-xs text-[#e8eaed] font-bold"
              >
                <option value="">Custom Price</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({formatBDT(p.price)})
                  </option>
                ))}
              </select>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7280] text-xs">৳</span>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  placeholder="Enter custom amount"
                  className="w-full h-10 pl-8 pr-3 rounded-xl bg-[#1c1f26] border border-[#2a2e37] text-xs text-[#e8eaed] font-bold"
                />
              </div>
            </div>

            {/* Step 2: Bank */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#9aa3af]">
                2. Select Your Credit Card Bank
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full bg-[#1c1f26] border border-[#2a2e37] rounded-xl px-3 py-2.5 text-xs text-[#e8eaed] font-bold"
              >
                {emiBanks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} (0% EMI)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#6b7280] font-medium">
                Eligible on all Visa, Mastercard & Amex credit cards issued by this bank.
              </p>
            </div>

            {/* Step 3: Tenure Months */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#9aa3af]">
                3. Choose Installment Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(activeBank.tenures || [3, 6, 9, 12, 18, 24, 36]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMonths(m)}
                    className={`py-2 px-1 rounded-xl border text-xs font-black text-center transition-all ${
                      selectedMonths === m
                        ? "bg-amber-400 text-black border-amber-400 shadow-xs"
                        : "bg-[#1c1f26] border-[#2a2e37] text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
                    }`}
                  >
                    {m} Mo
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-emerald-400 font-bold">
                ✓ 0% Interest Rate Guarantee
              </p>
            </div>
          </div>

          {/* Results Display */}
          <div className="mt-8 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#6b7280] block mb-0.5 font-medium">Estimated Monthly Installment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-400">
                  {formatBDT(monthlyInstallment)}
                </span>
                <span className="text-xs text-[#9aa3af] font-bold">/ month for {selectedMonths} months</span>
              </div>
              <span className="text-xs text-[#9aa3af] mt-1 block font-medium">
                Total Payable: <strong className="text-[#e8eaed] font-black">{formatBDT(customPrice)}</strong> (Zero Extra Cost)
              </span>
            </div>

            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-2xl bg-[#c45c5c] hover:bg-[#a84848] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-black/40 shrink-0"
            >
              Browse Eligible Gadgets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Partner Banks Table */}
        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-lg font-black text-[#e8eaed]">
              Complete List of 0% EMI Partner Banks
            </h2>
            <p className="text-xs text-[#6b7280] mt-1 font-medium">
              EMI facilities are available both online through our website and in-person at all 5 iSPACE BD showrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emiBanks.map((bank) => (
              <div
                key={bank.id}
                className="p-4 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-[#e8eaed] text-xs">{bank.name}</h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    0% EMI
                  </span>
                </div>
                <div className="text-[11px] text-[#6b7280] space-y-0.5">
                  <p>Tenures: {bank.tenures.join(", ")} Months</p>
                  <p>Min. Amount: {formatBDT(bank.minAmount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
