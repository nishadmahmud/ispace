import React from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  Clock,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1c1f26] border-t border-[#2a2e37] text-[#9aa3af] text-xs pb-16 lg:pb-0">
      {/* Top Value Badges Bar */}
      <div className="bg-[#14171c] border-b border-[#2a2e37] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/25 flex items-center justify-center text-[#ef233c] shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[#e8eaed] font-bold text-xs truncate">100% Genuine</h4>
                <p className="text-[10px] sm:text-[11px] text-[#6b7280] truncate">Brand Warranty</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[#e8eaed] font-bold text-xs truncate">0% EMI Facility</h4>
                <p className="text-[10px] sm:text-[11px] text-[#6b7280] truncate">Up to 36 Months</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shrink-0">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[#e8eaed] font-bold text-xs truncate">Fast Delivery</h4>
                <p className="text-[10px] sm:text-[11px] text-[#6b7280] truncate">Nationwide Service</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] shadow-xs">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[#e8eaed] font-bold text-xs truncate">7 Days Return</h4>
                <p className="text-[10px] sm:text-[11px] text-[#6b7280] truncate">Hassle-Free Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo className="h-6 sm:h-7" />
            <p className="text-[#9aa3af] text-xs leading-relaxed max-w-sm pt-1">
              <strong className="text-[#e8eaed]">iSPACE BD</strong> is your premier tech destination in Bangladesh for official Apple devices, flagship smartphones, pro laptops, wearables, and premium lifestyle gadgets. Authenticity guaranteed with dedicated service lab support.
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="tel:+8800000000000"
                className="flex items-center gap-2 text-[#e8eaed] hover:text-[#ef233c] transition-colors font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-[#ef233c]" /> +880 0000-000000 (Demo Hotline)
              </a>
              <a
                href="mailto:demo@ispacebd.example.com"
                className="flex items-center gap-2 text-[#9aa3af] hover:text-[#e8eaed] transition-colors text-xs"
              >
                <Mail className="w-4 h-4 text-[#6b7280]" /> demo@ispacebd.example.com
              </a>
              <div className="flex items-center gap-2 text-[#9aa3af] text-xs">
                <Clock className="w-4 h-4 text-[#6b7280]" /> Everyday 10:00 AM - 9:00 PM
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#e8eaed] font-bold text-xs tracking-wider uppercase mb-4">
              Top Categories
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/category/phones" className="hover:text-[#ef233c] transition-colors">
                  Phones & Tablets
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="hover:text-[#ef233c] transition-colors">
                  MacBook & Laptops
                </Link>
              </li>
              <li>
                <Link href="/category/wearables" className="hover:text-[#ef233c] transition-colors">
                  Apple Watch & Wearables
                </Link>
              </li>
              <li>
                <Link href="/category/audio" className="hover:text-[#ef233c] transition-colors">
                  AirPods & Audio Gear
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-[#ef233c] transition-colors">
                  MagSafe & GaN Chargers
                </Link>
              </li>
              <li>
                <Link href="/category/gaming" className="hover:text-[#ef233c] transition-colors">
                  Gaming & Drones
                </Link>
              </li>
              <li>
                <Link href="/category/pre-owned" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                  iSPACE Recell Pre-Owned
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h3 className="text-[#e8eaed] font-bold text-xs tracking-wider uppercase mb-4">
              Customer Care
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/emi" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  0% EMI Policy & Calculator
                </Link>
              </li>
              <li>
                <Link href="/exchange" className="hover:text-[#ef233c] transition-colors">
                  Device Trade-in Program
                </Link>
              </li>
              <li>
                <Link href="/outlets" className="hover:text-[#ef233c] transition-colors">
                  Our Showroom Outlets
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#ef233c] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#ef233c] transition-colors">
                  Warranty & Replacement Policy
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#ef233c] transition-colors">
                  Payment & Delivery Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom Outlets Quick View */}
          <div>
            <h3 className="text-[#e8eaed] font-bold text-xs tracking-wider uppercase mb-4">
              Demo Experience Stores
            </h3>
            <ul className="space-y-3">
              <li className="space-y-0.5">
                <strong className="text-[#e8eaed] block">Gulshan Tech Tower</strong>
                <p className="text-[11px] text-[#6b7280]">Suite 404, Level 4, Silicon Avenue, Gulshan-1</p>
              </li>
              <li className="space-y-0.5">
                <strong className="text-[#e8eaed] block">Dhanmondi Horizon Studio</strong>
                <p className="text-[11px] text-[#6b7280]">Holding 77, Level 3, Nova Horizon Plaza, Satmasjid Rd</p>
              </li>
              <li className="space-y-0.5">
                <strong className="text-[#e8eaed] block">Uttara Zenith Arcade</strong>
                <p className="text-[11px] text-[#6b7280]">Plot 12, Level 2, Sector 7, Uttara Model Town</p>
              </li>
              <li className="space-y-0.5">
                <strong className="text-[#e8eaed] block">Chattogram Marina Center</strong>
                <p className="text-[11px] text-[#6b7280]">Suite 305, Level 3, Marina Complex, Agrabad C/A</p>
              </li>
              <li className="pt-1">
                <Link
                  href="/outlets"
                  className="text-[#ef233c] hover:text-[#ef233c] font-bold flex items-center gap-1"
                >
                  View All Outlets & Maps <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Gateways & Badges */}
        <div className="mt-12 pt-8 border-t border-[#2a2e37] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#6b7280] mr-2 font-medium">We Accept:</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#14171c] border border-[#2a2e37] text-[11px] font-bold text-pink-400 shadow-xs">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#14171c] border border-[#2a2e37] text-[11px] font-bold text-orange-400 shadow-xs">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#14171c] border border-[#2a2e37] text-[11px] font-bold text-blue-400 shadow-xs">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#14171c] border border-[#2a2e37] text-[11px] font-bold text-[#ef233c] shadow-xs">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#14171c] border border-[#2a2e37] text-[11px] font-bold text-sky-400 shadow-xs">
              AMEX
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#14171c] border border-[#2a2e37] text-[11px] font-bold text-emerald-400 shadow-xs">
              Cash on Delivery
            </span>
          </div>

          <div className="text-[11px] text-[#6b7280] text-center md:text-right">
            © {new Date().getFullYear()} <strong className="text-[#e8eaed]">iSPACE BD</strong>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
