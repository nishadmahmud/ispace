import React from "react";
import Link from "next/link";

const items = [
  { label: "Welcome to iSPACE BD", href: "/" },
  { label: "Mega Sale — Up to 40% OFF on Selected Products", href: "/shop?deal=flash" },
  { label: "Free Delivery on Orders Across Dhaka", href: "/outlets" },
  { label: "0% EMI up to 36 Months", href: "/emi" },
  { label: "Secure Payment with bKash, Nagad & Cards", href: "/checkout" },
  { label: "100% Genuine Devices with Official Warranty", href: "/shop" },
];

export default function AnnouncementMarquee() {
  const loop = [...items, ...items];

  return (
    <div className="section-marquee overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-2.5">
        {loop.map((item, i) => (
          <Link
            key={`${item.label}-${i}`}
            href={item.href}
            className="mx-6 text-[11px] sm:text-xs font-semibold text-[#9aa3af] hover:text-[#e8eaed] transition-colors inline-flex items-center gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-[#c45c5c] shrink-0" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
