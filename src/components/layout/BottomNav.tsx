"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/Card";
import { LayoutDashboard, User, Map, GitCompare, Users } from "lucide-react";

const ITEMS = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Candidates", href: "/candidates", icon: User },
  { name: "Parties", href: "/parties", icon: Users },
  { name: "Constituencies", href: "/constituencies", icon: Map },
  { name: "Compare", href: "/compare", icon: GitCompare },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0D1117] border-t border-white/5 flex items-center justify-around px-4 z-50">
      {ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              isActive ? "text-[#4ae176]" : "text-[#8B949E]"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
