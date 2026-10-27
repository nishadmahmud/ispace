import React from "react";
import Link from "next/link";
import { outlets } from "@/data/outlets";
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from "lucide-react";

export default function ShowroomsSection() {
  return (
    <section className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>EXPERIENCE STORES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Visit Our Retail Outlets
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-xl">
              Experience the latest devices in person. Our specialists are ready to help with testing, data transfer, and 0% EMI processing.
            </p>
          </div>
          <Link
            href="/outlets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-red-600 transition-colors"
          >
            All 5 Locations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {outlets.slice(0, 3).map((store) => (
            <div
              key={store.id}
              className="rounded-2xl bg-white border border-gray-200 p-5 flex flex-col justify-between space-y-4 hover:border-red-500/50 transition-all shadow-xs hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-black text-gray-900 text-base leading-snug">
                    {store.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 shrink-0">
                    {store.city}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {store.address}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center gap-2 text-gray-800">
                  <Phone className="w-3.5 h-3.5 text-[#ef233c]" />
                  <a href={`tel:${store.phone}`} className="hover:text-red-600 font-bold">
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <a
                href={store.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-gray-200"
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
