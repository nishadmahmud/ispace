import React from "react";
import Link from "next/link";

export default function Logo({ className = "h-5.5 sm:h-6" }) {
  return (
    <Link href="/" className="inline-flex items-center group select-none">
      <div className="bg-black px-2.5 py-1 rounded-xl border border-gray-900 shadow-2xs flex items-center transition-all duration-200 group-hover:border-gray-700">
        <img
          src="/images/logo.png"
          alt="iSPACE BD"
          className={`${className} w-auto object-contain`}
        />
      </div>
    </Link>
  );
}
