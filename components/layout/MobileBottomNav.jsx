"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { Home, Grid, Flame, Heart, ShoppingBag } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useStore();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      href: "/shop",
      icon: Grid,
      isActive: pathname.startsWith("/shop") || pathname.startsWith("/category"),
    },
    {
      label: "Deals",
      href: "/shop?deal=flash",
      icon: Flame,
      isActive: pathname.includes("deal=flash"),
      isHot: true,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      isActive: pathname === "/wishlist",
      badgeCount: wishlist.length,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-4 left-0 right-0 z-40 pointer-events-none px-4">
      <nav className="pointer-events-auto max-w-md mx-auto h-16 flex items-center justify-around rounded-full bg-[#14171c]/95 backdrop-blur-md border border-[#2a2e37] shadow-[0_8px_32px_rgba(0,0,0,0.45)] px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex-1 py-1.5 flex flex-col items-center justify-center relative transition-colors ${
                item.isActive
                  ? "text-[#e8eaed] font-black"
                  : "text-[#6b7280] hover:text-[#e8eaed] font-semibold"
              }`}
            >
              <div
                className={`relative p-1.5 rounded-2xl transition-colors ${
                  item.isActive ? "bg-[#c45c5c]/20 text-[#c45c5c]" : ""
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    item.isActive ? "scale-105" : ""
                  } ${item.isHot && !item.isActive ? "text-[#c45c5c]" : ""}`}
                />
                {item.badgeCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#c45c5c] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badgeCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 leading-tight tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-1.5 flex flex-col items-center justify-center relative text-[#6b7280] hover:text-[#e8eaed] font-semibold cursor-pointer"
          aria-label="Open shopping bag"
        >
          <div className="relative p-1.5">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#c45c5c] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 leading-tight tracking-tight">Bag</span>
        </button>
      </nav>
    </div>
  );
}
