import React from "react";
import Link from "next/link";
import { outlets } from "@/data/outlets";
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from "lucide-react";

export default function ShowroomsSection() {
  return (
    <section className="py-14 section-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#c45c5c] uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>EXPERIENCE STORES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#e8eaed] tracking-tight">
              Visit Our Retail Outlets
            </h2>
            <p className="text-xs text-[#9aa3af] mt-1 max-w-xl">
              Experience the latest devices in person. Our specialists are ready to help with testing, data transfer, and 0% EMI processing.
            </p>
          </div>
          <Link
            href="/outlets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e8eaed] hover:text-[#c45c5c] transition-colors"
          >
            All 5 Locations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {outlets.slice(0, 3).map((store) => (
            <div
              key={store.id}
              className="rounded-2xl bg-gradient-to-b from-[#1a1f28] to-[#141820] border border-white/[0.07] hover:border-white/15 p-5 flex flex-col justify-between space-y-4 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-black text-[#e8eaed] text-base leading-snug">
                    {store.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1c1f26] text-[#9aa3af] shrink-0">
                    {store.city}
                  </span>
                </div>
                <p className="text-xs text-[#9aa3af] leading-relaxed">
                  {store.address}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#2a2e37] text-xs">
                <div className="flex items-center gap-2 text-[#e8eaed]">
                  <Phone className="w-3.5 h-3.5 text-[#c45c5c]" />
                  <a href={`tel:${store.phone}`} className="hover:text-[#c45c5c] font-bold">
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#6b7280] text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#6b7280]" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <a
                href={store.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#1c1f26] hover:bg-[#1c1f26] text-[#e8eaed] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#2a2e37]"
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
