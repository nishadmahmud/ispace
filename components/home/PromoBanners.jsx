import React from "react";
import Link from "next/link";

const CDN = "https://dazzle.sgp1.cdn.digitaloceanspaces.com";

const banners = [
  {
    href: "/product/iphone-16-pro-max",
    image: `${CDN}/2026-10/640px-350-iphone-duo-d80ea0ce-ad14-4fe8-835a-c8189082c4e0.jpg`,
    alt: "Flagship iPhone promotional banner",
  },
  {
    href: "/shop?deal=flash",
    image: `${CDN}/2026-10/22922-837f425c-5e40-4fdd-81b9-33d29a87ff2f.jpg`,
    alt: "Hot deals promotional banner",
  },
];

export default function PromoBanners() {
  return (
    <section className="py-6 section-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {banners.map((b) => (
            <Link
              key={b.href + b.image}
              href={b.href}
              className="group relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.35)] aspect-[16/7] sm:aspect-[2.2/1] bg-[#141820]"
            >
              <img
                src={b.image}
                alt={b.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
