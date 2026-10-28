"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CDN = "https://dazzle.sgp1.cdn.digitaloceanspaces.com";

const bannerSlides = [
  {
    id: 1,
    title: "iPhone 17 Pro Max — Cosmic Flagship",
    href: "/product/iphone-16-pro-max",
    image: `${CDN}/2026-10/iphone-duomain-banner-2406c727-c4d5-4d07-9ec3-31f10660df20.jpg`,
    alt: "iPhone flagship campaign banner",
  },
  {
    id: 2,
    title: "MacBook Air M5 — Supercharged Everyday",
    href: "/product/macbook-air-13-m3",
    image: `${CDN}/2026-09/main-banner-v2-1-f78f73f8-fbf2-47fe-b7a3-ef0a2543e272.jpg`,
    alt: "Laptop and gadgets campaign banner",
  },
  {
    id: 3,
    title: "Samsung Galaxy S26 Ultra",
    href: "/product/samsung-galaxy-s25-ultra",
    image: `${CDN}/2026-10/640px-350-iphone-duo-d80ea0ce-ad14-4fe8-835a-c8189082c4e0.jpg`,
    alt: "Premium phone offer banner",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative section-canvas overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2">
        <div className="group relative rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#1a1d23] border border-white/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.45)] aspect-[16/8] sm:aspect-[21/9] min-h-[180px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[420px]">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerSlides.map((slide) => (
              <Link
                key={slide.id}
                href={slide.href}
                className="min-w-full h-full relative block cursor-pointer"
                title={slide.title}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0c0e12]/75 hover:bg-[#14171c] text-[#e8eaed] border border-[#2a2e37]/60 flex items-center justify-center backdrop-blur-xs transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0c0e12]/75 hover:bg-[#14171c] text-[#e8eaed] border border-[#2a2e37]/60 flex items-center justify-center backdrop-blur-xs transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-20 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-[#0c0e12]/70 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-[#2a2e37]/50">
            {bannerSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? "w-6 bg-[#c45c5c]"
                    : "w-1.5 bg-[#3d4450] hover:bg-[#6b7280]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
