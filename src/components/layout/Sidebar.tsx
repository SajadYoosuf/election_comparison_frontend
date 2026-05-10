"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/components/ui/Card";
import {
  LayoutDashboard,
  User,
  Map as MapIcon,
  BarChart3,
  GitCompare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard, section: "Main" },
  { name: "Candidates", href: "/candidates", icon: User, section: "Explore" },
  { name: "Constituencies", href: "/constituencies", icon: MapIcon, section: "Explore" },
  { name: "Demographics", href: "/demographics", icon: BarChart3, section: "Analysis" },
  { name: "Compare", href: "/compare", icon: GitCompare, section: "Analysis" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = router.pathname;

  // Group items by section
  const sections = ["Main", "Explore", "Analysis"];

  return (
    <aside
      className={cn(
        "h-screen bg-[#0D1117] border-r border-white/5 flex flex-col fixed left-0 top-0 z-30 transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className={cn("flex flex-col pt-6 pb-4 border-b border-white/5", isOpen ? "px-5" : "px-4 items-center")}>
        <div className="flex items-center justify-between">
          <div className={cn("font-bold text-white transition-all whitespace-nowrap", isOpen ? "text-sm" : "text-[0px] opacity-0")}>
            Kerala Election Comparison
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-[#8B949E] hover:text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
        {isOpen && (
          <div className="text-[#8B949E] text-[10px] tracking-widest uppercase mt-1 opacity-40">
            1957 — 2026 · Archive
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar">
        {sections.map(sectionName => (
          <div key={sectionName} className="space-y-1">
            {isOpen && (
              <div className="px-3 text-[9px] font-bold text-[#8B949E] uppercase tracking-widest mb-2 opacity-30">
                {sectionName}
              </div>
            )}
            {NAV_ITEMS.filter(item => item.section === sectionName).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg transition-all text-[12px] font-medium",
                    isOpen ? "gap-3 px-3 py-2" : "justify-center py-3",
                    isActive
                      ? "bg-[#3b82f6]/20 text-[#93c5fd]"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                  title={!isOpen ? item.name : undefined}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-white/5">
          <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg p-3 text-center">
            <div className="text-[9px] text-[#8B949E] uppercase tracking-widest mb-1">Active Year</div>
            <div className="text-xl font-serif font-bold text-white">2021</div>
          </div>
        </div>
      )}
    </aside>
  );
}
