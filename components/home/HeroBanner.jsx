"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerSlides = [
  {
    id: 1,
    title: "iPhone 16 Pro Max - Titanium Strength & A18 Pro",
    href: "/product/iphone-16-pro-max",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2000&auto=format&fit=crop",
    alt: "Apple iPhone 16 Pro Max Campaign Banner"
  },
  {
    id: 2,
    title: "MacBook Pro 14 M4 Pro - Supercharged Performance",
    href: "/product/macbook-pro-14-m4-pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2000&auto=format&fit=crop",
    alt: "MacBook Pro M4 Pro Campaign Banner"
  },
  {
    id: 3,
    title: "Samsung Galaxy S25 Ultra - Galaxy AI is Here",
    href: "/product/samsung-galaxy-s25-ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2000&auto=format&fit=crop",
    alt: "Samsung Galaxy S25 Ultra Banner"
  },
  {
    id: 4,
    title: "Apple Watch Ultra 2 - Rugged Luxury",
    href: "/product/apple-watch-ultra-2",
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=2000&auto=format&fit=crop",
    alt: "Apple Watch Ultra 2 Banner"
  },
  {
    id: 5,
    title: "AirPods Pro 2 & Premium Audio Gear",
    href: "/category/audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop",
    alt: "Premium Audio & Acoustics Banner"
  },
  {
    id: 6,
    title: "PlayStation 5 Slim - Play Has No Limits",
    href: "/product/sony-playstation-5-slim",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2000&auto=format&fit=crop",
    alt: "PlayStation 5 Slim Gaming Banner"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Keyboard navigation
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

  // Touch handlers for mobile swipe
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
      className="relative bg-white border-b border-gray-200 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5">
        {/* Banner Viewport */}
        <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm bg-gray-100 aspect-[16/8] sm:aspect-[21/9] min-h-[170px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[440px]">
          {/* Slides Track */}
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

          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-gray-900 border border-gray-200/80 flex items-center justify-center shadow-md backdrop-blur-xs transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-gray-900 border border-gray-200/80 flex items-center justify-center shadow-md backdrop-blur-xs transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 z-20 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Dot Indicators */}
          <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 bg-white/80 backdrop-blur-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200 shadow-2xs">
            {bannerSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(idx);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? "w-6 sm:w-8 bg-[#ef233c]"
                    : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
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
