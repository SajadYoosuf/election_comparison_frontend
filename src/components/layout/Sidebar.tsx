"use client";

import { useEffect, useState } from "react";
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
  ChevronRight,
  Flame,
  Info,
  History,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "Overview", ml: "അവലോകനം", href: "/overview", icon: LayoutDashboard, section: "Main" },
  { name: "Candidates", ml: "സ്ഥാനാർത്ഥികൾ", href: "/candidates", icon: User, section: "Main" },
  { name: "Constituencies", ml: "മണ്ഡലങ്ങൾ", href: "/constituencies", icon: MapIcon, section: "Explore" },
  { name: "Demographics", ml: "ജനവിഭാഗം", href: "/demographics", icon: BarChart3, section: "Explore" },
  { name: "Comparison", ml: "താരതമ്യം", href: "/compare", icon: GitCompare, section: "Explore" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const handleStorage = () => {
      setLang(localStorage.getItem('lang') || 'en');
    };
    handleStorage(); // initial load
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const sections = ["Main", "Explore"];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 88 }}
      className={cn(
        "h-screen bg-[#08090a] border-r border-white/[0.03] flex flex-col fixed left-0 top-0 z-[100] transition-all ease-in-out",
        "shadow-[10px_0_40px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
      )}
    >
      {/* Sidebar Header */}
      <div className={cn("flex flex-col pt-8 pb-6 border-b border-white/[0.03]", isOpen ? "px-6" : "px-4 items-center")}>
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4ae176] to-emerald-400 flex items-center justify-center shadow-lg shadow-[#4ae176]/20">
                  <Flame className="w-4 h-4 text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-white text-sm tracking-tighter leading-none">ELECTION</span>
                  <span className="font-bold text-[#4ae176] text-[10px] tracking-widest uppercase">Archive</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4ae176] to-emerald-400 flex items-center justify-center shadow-lg shadow-[#4ae176]/20"
              >
                <Flame className="w-5 h-5 text-black" />
              </motion.div>
            )}
          </AnimatePresence>

          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#8B949E] hover:text-white hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 mx-auto w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-[#8B949E] hover:text-white transition-all border border-white/5"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto custom-scrollbar">
        {sections.map(sectionName => (
          <div key={sectionName} className="space-y-2">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="px-3 text-[10px] font-black text-white uppercase tracking-[0.3em] mb-4"
              >
                {sectionName}
              </motion.div>
            )}
            <div className="space-y-1">
              {NAV_ITEMS.filter(item => item.section === sectionName).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center group relative rounded-2xl transition-all duration-300",
                      isOpen ? "px-4 py-3 gap-4" : "justify-center py-4",
                      isActive
                        ? "bg-gradient-to-r from-[#4ae176]/10 to-transparent text-[#4ae176]"
                        : "text-white/40 hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 w-1 h-6 bg-[#4ae176] rounded-r-full shadow-[0_0_15px_#4ae176]"
                      />
                    )}
                    <item.icon className={cn(
                      "transition-transform duration-500",
                      isActive ? "w-5 h-5" : "w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:scale-110"
                    )} />
                    
                    {isOpen && (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-bold text-[13px] tracking-tight">
                          {lang === 'ml' ? item.ml : item.name}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-[#4ae176]/10 text-[#4ae176] text-[9px] font-black rounded-full ring-1 ring-[#4ae176]/20">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-white/[0.03]">
        {isOpen ? (
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Guest User</span>
              <span className="text-[10px] text-white/40">Kerala Elections</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
