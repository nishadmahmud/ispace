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
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">Showrooms & Outlets</span>
        </div>

        {/* Hero */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 mb-10 shadow-xs">
          <div className="max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-red-100 text-[#ef233c] text-[11px] font-black uppercase tracking-wider">
              5 LOCATIONS IN DHAKA & CHATTOGRAM
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              iSPACE BD Experience Stores
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Step into any of our flagship showrooms to experience the latest Apple devices and flagship tech in person. Our specialists provide free phone diagnostics, data transfer, and instant 0% EMI processing.
            </p>
          </div>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outlets.map((store) => (
            <div
              key={store.id}
              className="rounded-3xl bg-white border border-gray-200 overflow-hidden flex flex-col justify-between hover:border-red-500/50 transition-all shadow-xs hover:shadow-md group"
            >
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-xl border border-gray-200 text-[11px] font-black text-gray-900 shadow-xs">
                  {store.city}
                </div>
                {store.featured && (
                  <div className="absolute top-3 right-3 bg-red-100 px-3 py-1 rounded-xl border border-red-200 text-[10px] font-black text-[#ef233c] uppercase shadow-xs">
                    Flagship Store
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-base font-black text-gray-900 leading-snug">
                    {store.name}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {store.address}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-2.5 text-gray-800">
                    <Phone className="w-4 h-4 text-[#ef233c]" />
                    <a href={`tel:${store.phone}`} className="hover:text-red-600 font-bold">
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-500 text-[11px]">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-gray-200"
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
