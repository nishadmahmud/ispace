import React from "react";
import Link from "next/link";
import { outlets } from "@/data/outlets";
import { Phone, Clock, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Showroom Locations & Outlets in Bangladesh | iSPACE BD",
  description: "Explore iSPACE BD experience stores located across Gulshan, Dhanmondi, Uttara, Mirpur, and Chattogram. Experience genuine Apple and tech gadgets.",
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
        <div className="rounded-3xl bg-[#14171c] border border-[#2a2e37] p-6 sm:p-10 mb-10 shadow-xs">
          <div className="max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#c45c5c]/15 text-[#c45c5c] text-[11px] font-black uppercase tracking-wider">
              5 LOCATIONS IN DHAKA & CHATTOGRAM
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#e8eaed] tracking-tight">
              iSPACE BD Experience Stores
            </h1>
            <p className="text-xs sm:text-sm text-[#9aa3af] leading-relaxed">
              Step into any of our flagship showrooms to experience the latest Apple devices and flagship tech in person. Our specialists provide free phone diagnostics, data transfer, and instant 0% EMI processing.
            </p>
          </div>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlets.map((store) => (
            <div
              key={store.id}
              className="rounded-3xl bg-[#14171c] border border-[#2a2e37] overflow-hidden flex flex-col justify-between hover:border-red-500/50 transition-all shadow-xs hover:shadow-md group"
            >
              <div className="h-48 relative overflow-hidden bg-[#1c1f26]">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#14171c]/95 px-3 py-1 rounded-xl border border-[#2a2e37] text-[11px] font-black text-[#e8eaed] shadow-xs">
                  {store.city}
                </div>
                {store.featured && (
                  <div className="absolute top-3 right-3 bg-[#c45c5c]/15 px-3 py-1 rounded-xl border border-[#c45c5c]/25 text-[10px] font-black text-[#c45c5c] uppercase shadow-xs">
                    Flagship Store
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-base font-black text-[#e8eaed] leading-snug">
                    {store.name}
                  </h2>
                  <p className="text-xs text-[#9aa3af] leading-relaxed">
                    {store.address}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#2a2e37] text-xs">
                  <div className="flex items-center gap-2.5 text-[#e8eaed]">
                    <Phone className="w-4 h-4 text-[#c45c5c]" />
                    <a href={`tel:${store.phone}`} className="hover:text-[#c45c5c] font-bold">
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#6b7280] text-[11px]">
                    <Clock className="w-4 h-4 text-[#6b7280]" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#1c1f26] hover:bg-[#1c1f26] text-[#e8eaed] text-xs font-bold flex items-center justify-center gap-2 transition-all border border-[#2a2e37]"
                >
                  View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
