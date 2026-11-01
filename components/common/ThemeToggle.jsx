"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({
  className = "",
  showLabel = false,
  size = "md",
}) {
  const { theme, toggleTheme, isMounted } = useTheme();

  const isDark = isMounted ? theme === "dark" : true;

  if (showLabel) {
    return (
      <button
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
          isDark
            ? "text-[#9aa3af] hover:text-[#e8eaed] hover:bg-[#1c1f26]"
            : "text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
        } ${className}`}
        aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
        type="button"
      >
        <span className="flex items-center gap-2.5">
          {isDark ? (
            <Moon className="w-4 h-4 text-amber-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <span>Appearance</span>
        </span>
        <span className="text-xs px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-white/[0.08] border border-white/[0.08]">
          {isDark ? "Dark" : "Light"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center cursor-pointer select-none group ${
        isDark
          ? "text-[#9aa3af] hover:text-[#e8eaed] bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "text-[#475569] hover:text-[#0f172a] bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.08] shadow-xs"
      } ${className}`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      type="button"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
