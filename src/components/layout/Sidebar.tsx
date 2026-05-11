"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/components/ui/Card";
import {
  LayoutDashboard,
  User,
  Users,
  Map as MapIcon,
  BarChart3,
  GitCompare,
  Settings,
  HelpCircle,
  Flame
} from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Candidates", href: "/candidates", icon: User },
  { name: "Parties", href: "/parties", icon: Users },
  { name: "Constituencies", href: "/constituencies", icon: MapIcon },
  { name: "Demographics", href: "/demographics", icon: BarChart3 },
  { name: "Compare", href: "/compare", icon: GitCompare },
];



interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <aside className="w-64 h-screen bg-[#0D1117] border-r border-white/5 flex flex-col fixed left-0 top-0 z-[100]">
      {/* Sidebar Header */}
      <div className="p-8 pb-12">
        <div className="flex flex-col">
          <h2 className="text-xl font-black text-white tracking-tight leading-none">ElectionHub</h2>
          <h2 className="text-xl font-black text-white tracking-tight">Kerala</h2>
          <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-2">1957—2026 Analysis</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/overview");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group",
                isActive
                  ? "bg-white/5 text-white"
                  : "text-white/40 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-white" : "text-white/20 group-hover:text-white/40"
              )} />
              <span className="text-sm font-bold tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>


    </aside>
  );
}
