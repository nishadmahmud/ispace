import React from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { contactConfig } from "@/data/contact";
import {
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  MessengerIcon,
  WhatsAppIcon,
} from "@/components/common/SocialIcons";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  Clock,
  ArrowRight,
  MessageCircle
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
                href={`tel:${contactConfig.phoneRaw}`}
                className="flex items-center gap-2 text-[#e8eaed] hover:text-[#ef233c] transition-colors font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-[#ef233c]" /> Hotline: {contactConfig.phone}
              </a>
              <a
                href={contactConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#9aa3af] hover:text-emerald-400 transition-colors text-xs font-semibold"
              >
                <span className="text-emerald-400"><WhatsAppIcon className="w-4 h-4" /></span> WhatsApp: {contactConfig.whatsapp}
              </a>
              <a
                href={contactConfig.emailLink}
                className="flex items-center gap-2 text-[#9aa3af] hover:text-[#e8eaed] transition-colors text-xs"
              >
                <Mail className="w-4 h-4 text-[#6b7280]" /> {contactConfig.email}
              </a>
              <div className="flex items-center gap-2 text-[#9aa3af] text-xs">
                <Clock className="w-4 h-4 text-[#6b7280]" /> {contactConfig.hours}
              </div>
            </div>

            {/* Social Media Follow Buttons */}
            <div className="pt-3">
              <p className="text-[11px] font-bold text-[#e8eaed] mb-2 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={contactConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#14171c] hover:bg-[#ef233c] text-[#9aa3af] hover:text-white border border-[#2a2e37] hover:border-[#ef233c] flex items-center justify-center transition-all duration-200"
                  title="YouTube @ispacebd"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={contactConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#14171c] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-[#9aa3af] hover:text-white border border-[#2a2e37] hover:border-pink-500 flex items-center justify-center transition-all duration-200"
                  title="Instagram @ispacebd"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={contactConfig.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#14171c] hover:bg-black text-[#9aa3af] hover:text-cyan-400 border border-[#2a2e37] hover:border-cyan-400 flex items-center justify-center transition-all duration-200"
                  title="TikTok @ispacebd"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href={contactConfig.socials.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#14171c] hover:bg-[#0084ff] text-[#9aa3af] hover:text-white border border-[#2a2e37] hover:border-[#0084ff] flex items-center justify-center transition-all duration-200"
                  title="Messenger iSPACE BD"
                  aria-label="Messenger"
                >
                  <MessengerIcon className="w-4 h-4" />
                </a>
                <a
                  href={contactConfig.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-[#14171c] hover:bg-[#25D366] text-[#9aa3af] hover:text-white border border-[#2a2e37] hover:border-[#25D366] flex items-center justify-center transition-all duration-200"
                  title="WhatsApp +880 1958-434343"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
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
              Jamuna Future Park Outlets
            </h3>
            <ul className="space-y-3">
              <li className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef233c]" />
                  <strong className="text-[#e8eaed] block">Main Outlet — Block B</strong>
                </div>
                <p className="text-[11px] text-[#6b7280] pl-3">
                  Shop 4B-016C, Level 4, Jamuna Future Park, Pragati Sarani, Dhaka
                </p>
              </li>
              <li className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong className="text-[#e8eaed] block">Premium Outlet — Block A</strong>
                </div>
                <p className="text-[11px] text-[#6b7280] pl-3">
                  Shop 4A-049A, Level 4, Jamuna Future Park, Pragati Sarani, Dhaka
                </p>
              </li>
              <li className="pt-2">
                <Link
                  href="/outlets"
                  className="text-[#ef233c] hover:text-[#ef233c] font-bold flex items-center gap-1"
                >
                  View Outlets Details & Map <ArrowRight className="w-3 h-3" />
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
