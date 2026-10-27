"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  Home,
  Grid,
  Flame,
  Heart,
  ShoppingBag
} from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen } = useStore();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/"
    },
    {
      label: "Shop",
      href: "/shop",
      icon: Grid,
      isActive: pathname.startsWith("/shop") || pathname.startsWith("/category")
    },
    {
      label: "Hot Deals",
      href: "/shop?deal=flash",
      icon: Flame,
      isActive: pathname.includes("deal=flash"),
      isHot: true
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      isActive: pathname === "/wishlist",
      badgeCount: wishlist.length
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <nav className="max-w-md mx-auto px-3 h-15 flex items-center justify-around select-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex-1 py-1 flex flex-col items-center justify-center relative transition-colors ${
                item.isActive
                  ? "text-[#ef233c] font-black"
                  : "text-gray-500 hover:text-gray-900 font-semibold"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    item.isActive ? "scale-110" : ""
                  } ${item.isHot && !item.isActive ? "text-[#ef233c]" : ""}`}
                />
                {item.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#ef233c] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
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

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-1 flex flex-col items-center justify-center relative text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
          aria-label="Open shopping bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#ef233c] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 leading-tight tracking-tight">
            Bag
          </span>
        </button>
      </nav>
    </div>
  );
}
