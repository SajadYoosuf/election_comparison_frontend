"use client";

import Link from "next/link";
import { Globe, Settings } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0D1117]/80 backdrop-blur-md border-b border-white/5 flex items-center px-8 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#4ae176] rounded-lg flex items-center justify-center">
          <span className="text-black font-black text-xl">K</span>
        </div>
        <Link href="/" className="font-headline-sm text-[18px] font-bold tracking-tight text-white">
          Kerala Assembly Election Comparison Engine
        </Link>
      </div>
    </header>
  );
}
