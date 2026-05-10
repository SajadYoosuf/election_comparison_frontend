"use client";

import { useState } from "react";
import { 
  GitCompare, 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight
} from "lucide-react";

export function ComparePageContent() {
  const [yearA, setYearA] = useState(2021);
  const [yearB, setYearB] = useState(2016);

  const years = [2021, 2016, 2011, 2006, 2001, 1996, 1991, 1987, 1982, 1977, 1970, 1967, 1965, 1960, 1957];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#08090a] min-h-screen">
      {/* Top Bar */}
      <header className="h-14 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0D1117] flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Side-by-Side Comparison</h1>
          <span className="text-[11px] text-gray-500 dark:text-white/40 font-normal">Benchmarking electoral cycles across decades</span>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Comparison Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-sm">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                 <Calendar className="w-3.5 h-3.5" /> Base Year
              </div>
              <div className="relative">
                <select 
                  value={yearA}
                  onChange={(e) => setYearA(parseInt(e.target.value))}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl px-6 py-4 text-xl font-serif font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
           </div>

           <div className="hidden md:flex items-center justify-center pt-8">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-inner">
                 <GitCompare className="w-5 h-5 text-gray-400" />
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-purple-500 uppercase tracking-widest">
                 <Calendar className="w-3.5 h-3.5" /> Comparison Year
              </div>
              <div className="relative">
                <select 
                  value={yearB}
                  onChange={(e) => setYearB(parseInt(e.target.value))}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl px-6 py-4 text-xl font-serif font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
           </div>
        </div>

        {/* Comparison Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Year A Snapshot */}
           <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Metrics: {yearA}</h3>
              <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-6">
                 <MetricLine label="Winning Front" value="LDF" color="text-green-500" />
                 <MetricLine label="Voter Turnout" value="74.8%" />
                 <MetricLine label="Incumbent Status" value="Returned" />
                 <MetricLine label="Largest Party" value="CPI(M) (62)" />
              </div>
           </div>

           {/* Year B Snapshot */}
           <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Metrics: {yearB}</h3>
              <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-6">
                 <MetricLine label="Winning Front" value="LDF" color="text-green-500" />
                 <MetricLine label="Voter Turnout" value="72.7%" />
                 <MetricLine label="Incumbent Status" value="Defeated" />
                 <MetricLine label="Largest Party" value="CPI(M) (58)" />
              </div>
           </div>
        </div>

        {/* Differentials / Highlights */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
              <Layers className="w-32 h-32 text-white" />
           </div>
           
           <div className="relative z-10">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                 <ArrowUpRight className="w-4 h-4 text-blue-500" />
                 Performance Differential
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Turnout Shift</div>
                    <div className="flex items-center gap-2 text-2xl font-bold text-white">
                       <TrendingUp className="w-6 h-6 text-green-500" /> +2.1%
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">Increased participation in 2021 compared to 2016 cycle.</p>
                 </div>

                 <div className="space-y-2">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seat Swing</div>
                    <div className="flex items-center gap-2 text-2xl font-bold text-white">
                       <TrendingUp className="w-6 h-6 text-blue-500" /> +8 Seats
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">The LDF increased its majority in the 2021 election.</p>
                 </div>

                 <div className="space-y-2">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Third Front Impact</div>
                    <div className="flex items-center gap-2 text-2xl font-bold text-white">
                       <TrendingDown className="w-6 h-6 text-red-500" /> -1 Seat
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">NDA lost its only seat in the assembly in the latest cycle.</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function MetricLine({ label, value, color }: any) {
  return (
    <div className="flex justify-between items-center py-1">
       <span className="text-[11px] text-gray-500 dark:text-white/40 font-medium">{label}</span>
       <span className={`text-[12px] font-bold ${color || 'text-gray-900 dark:text-white'}`}>{value}</span>
    </div>
  );
}
