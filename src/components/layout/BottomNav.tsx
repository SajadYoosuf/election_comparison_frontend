"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Map, GitCompare, Users } from "lucide-react";
import { motion } from "framer-motion";

const ITEMS = [
  { name: "Dash", href: "/overview", icon: LayoutDashboard },
  { name: "Cands", href: "/candidates", icon: User },
  { name: "Parties", href: "/parties", icon: Users },
  { name: "Consts", href: "/constituencies", icon: Map },
  { name: "Compare", href: "/compare", icon: GitCompare },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 h-16 bg-[#0D1117]/80 backdrop-blur-2xl border border-white/5 rounded-2xl flex items-center justify-around px-2 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all"
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-x-1 inset-y-1 bg-white/5 rounded-xl border border-white/5"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? "text-[#4ae176]" : "text-white/40"}`} />
            <span className={`text-[8px] font-black uppercase tracking-[0.1em] relative z-10 transition-colors ${isActive ? "text-white" : "text-white/20"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
