import React from "react";
import Link from "next/link";
import { outlets } from "@/data/outlets";
import { contactConfig } from "@/data/contact";
import {
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  MessengerIcon,
  WhatsAppIcon,
} from "@/components/common/SocialIcons";
import { Phone, Clock, ExternalLink, MapPin, Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Showroom Locations & Outlets in Jamuna Future Park | iSPACE BD",
  description: "Visit iSPACE BD outlets at Jamuna Future Park, Level 4 (Main Outlet in Block B & Premium Outlet in Block A), Dhaka. Authentic Apple devices & flagship tech.",
};

export default function OutletsPage() {
  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8eaed] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-6 font-medium">
          <Link href="/" className="hover:text-[#e8eaed] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#e8eaed] font-bold">Showrooms & Outlets</span>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-10 mb-8 shadow-xs">
          <div className="max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#c45c5c]/15 text-[#c45c5c] text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> 2 OUTLETS AT JAMUNA FUTURE PARK, LEVEL 4
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#e8eaed] tracking-tight">
              iSPACE BD Experience Stores
            </h1>
            <p className="text-xs sm:text-sm text-[#9aa3af] leading-relaxed">
              Step into our Main Outlet (Block B) or Premium Outlet (Block A) at Jamuna Future Park, Level 4 to experience the latest Apple devices and flagship tech in person. Our specialists provide device diagnostics, data transfer, and instant 0% EMI processing.
            </p>
          </div>

          {/* Quick Contact Bar */}
          <div className="mt-8 pt-6 border-t border-[#2a2e37] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href={`tel:${contactConfig.phoneRaw}`}
              className="p-3 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] hover:border-[#c45c5c]/40 flex items-center gap-3 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-[#c45c5c]/15 text-[#c45c5c] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#6b7280] font-semibold uppercase">Hotline</p>
                <p className="text-xs font-bold text-[#e8eaed] truncate">{contactConfig.phone}</p>
              </div>
            </a>

            <a
              href={contactConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] hover:border-emerald-500/40 flex items-center gap-3 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#6b7280] font-semibold uppercase">WhatsApp</p>
                <p className="text-xs font-bold text-[#e8eaed] truncate">{contactConfig.whatsapp}</p>
              </div>
            </a>

            <a
              href={contactConfig.messengerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] hover:border-blue-500/40 flex items-center gap-3 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                <MessengerIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#6b7280] font-semibold uppercase">Messenger</p>
                <p className="text-xs font-bold text-[#e8eaed] truncate">iSPACE BD</p>
              </div>
            </a>

            <a
              href={contactConfig.emailLink}
              className="p-3 rounded-2xl bg-[#1c1f26] border border-[#2a2e37] hover:border-white/20 flex items-center gap-3 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] text-[#9aa3af] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#6b7280] font-semibold uppercase">Email</p>
                <p className="text-xs font-bold text-[#e8eaed] truncate">{contactConfig.email}</p>
              </div>
            </a>
          </div>
        </div>

        {/* Showrooms Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {outlets.map((store) => (
            <div
              key={store.id}
              className="rounded-3xl bg-[#14171c] border border-[#2a2e37] overflow-hidden flex flex-col justify-between hover:border-[#c45c5c]/50 transition-all shadow-xs hover:shadow-xl group"
            >
              <div className="h-56 relative overflow-hidden bg-[#1c1f26]">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#14171c]/95 px-3 py-1 rounded-xl border border-[#2a2e37] text-[11px] font-black text-[#e8eaed] shadow-xs">
                  Jamuna Future Park • {store.level}
                </div>
                <div className="absolute top-3 right-3 bg-[#c45c5c]/90 px-3 py-1 rounded-xl text-[10px] font-black text-white uppercase tracking-wider shadow-xs">
                  {store.block} | {store.shopNo}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#c45c5c] uppercase tracking-wider">
                      {store.tagline}
                    </span>
                    <span className="text-[11px] text-[#6b7280] font-medium">
                      {store.city}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-[#e8eaed] leading-snug">
                    {store.name}
                  </h2>
                  <p className="text-xs text-[#9aa3af] leading-relaxed">
                    {store.address}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#2a2e37] text-xs">
                  <div className="flex items-center gap-2.5 text-[#e8eaed]">
                    <Phone className="w-4 h-4 text-[#c45c5c]" />
                    <span>Phone:</span>
                    <a href={`tel:${store.phone.replace(/[\s-]/g, "")}`} className="hover:text-[#c45c5c] font-bold">
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp:</span>
                    <a
                      href={`https://wa.me/${store.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-bold"
                    >
                      {store.whatsapp}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#6b7280] text-[11px]">
                    <Clock className="w-4 h-4 text-[#6b7280]" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#1c1f26] hover:bg-[#252a34] text-[#e8eaed] text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-[#2a2e37]"
                  >
                    Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${store.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-emerald-500/25"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Connect Section */}
        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-[#e8eaed]">
              Connect with iSPACE BD on Social Media
            </h3>
            <p className="text-xs text-[#9aa3af]">
              Follow our official channels for unboxings, gadget launches, and exclusive member deals.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={contactConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1c1f26] hover:bg-[#ef233c] text-[#e8eaed] hover:text-white border border-[#2a2e37] hover:border-[#ef233c] text-xs font-bold flex items-center gap-2 transition-all"
            >
              <YouTubeIcon className="w-4 h-4" /> YouTube
            </a>
            <a
              href={contactConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1c1f26] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-[#e8eaed] hover:text-white border border-[#2a2e37] hover:border-pink-500 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <InstagramIcon className="w-4 h-4" /> Instagram
            </a>
            <a
              href={contactConfig.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1c1f26] hover:bg-black text-[#e8eaed] hover:text-cyan-400 border border-[#2a2e37] hover:border-cyan-400 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <TikTokIcon className="w-4 h-4" /> TikTok
            </a>
            <a
              href={contactConfig.socials.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1c1f26] hover:bg-[#0084ff] text-[#e8eaed] hover:text-white border border-[#2a2e37] hover:border-[#0084ff] text-xs font-bold flex items-center gap-2 transition-all"
            >
              <MessengerIcon className="w-4 h-4" /> Messenger
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
