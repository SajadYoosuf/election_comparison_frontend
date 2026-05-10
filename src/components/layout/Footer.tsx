"use client";

import Link from "next/link";
import { Globe, Code, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0D1117] border-t border-white/5 pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#4ae176] rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xl">K</span>
            </div>
            <span className="font-headline-sm text-[20px] font-bold text-white">
              Kerala Assembly Election Comparison Engine
            </span>
          </div>
          <p className="text-[#8B949E] text-sm max-w-sm leading-relaxed">
            Preserving the democratic narrative of Kerala through transparent data and rigorous analysis.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6">RESOURCES</h4>
          <ul className="space-y-4 text-sm text-[#8B949E]">
            <li><Link href="/api" className="hover:text-white transition-colors">API Access</Link></li>
            <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6">LEGAL</h4>
          <ul className="space-y-4 text-sm text-[#8B949E]">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] text-[#8B949E] uppercase tracking-widest font-bold">
          Developed By Sajad Yoosuf. Supported by the open-source community in Kerala.
        </p>
        <div className="flex items-center gap-6 text-[#8B949E]">
          <Link href="#" className="hover:text-white transition-colors"><Globe className="w-5 h-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Code className="w-5 h-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><MessageSquare className="w-5 h-5" /></Link>
        </div>
      </div>
    </footer>
  );
}
