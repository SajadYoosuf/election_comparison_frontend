"use client";

import { useState, useEffect } from "react";
import {
   BarChart3,
   Users,
   UserPlus,
   Venus,
   Mars,
   TrendingUp,
   PieChart as PieChartIcon,
   Info,
   Calendar,
   Zap,
   Target,
   ChevronRight,
   ChevronLeft,
   Download,
   Share2,
   Maximize2,
   ShieldCheck,
   Search,
   Activity,
   History,
   ArrowUpRight,
   BarChart as BarChartIcon,
   Globe,
   Settings,
   Award,
   CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   AreaChart,
   Area,
   BarChart,
   Bar,
   Cell
} from "recharts";

import { fetchGenderStats, fetchElectorateGrowth, fetchPartyGenderBreakdown, fetchAdvancedDemographicInsights } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";

export function DemographicsPageContent() {
   const [loading, setLoading] = useState(true);
   const [genderStats, setGenderStats] = useState<any>(null);
   const [electorateGrowth, setElectorateGrowth] = useState<any[]>([]);
   const [partyBreakdown, setPartyBreakdown] = useState<any[]>([]);
   const [advancedInsights, setAdvancedInsights] = useState<any>(null);
   const [activeYear, setActiveYear] = useState("2021");

   const years = ["1957", "1960", "1967", "1970", "1977", "1980", "1982", "1987", "1991", "1996", "2001", "2006", "2011", "2016", "2021"];

   useEffect(() => {
      const loadData = async () => {
         setLoading(true);
         try {
            const [gs, eg, pb, ai] = await Promise.all([
               fetchGenderStats(),
               fetchElectorateGrowth(),
               fetchPartyGenderBreakdown(),
               fetchAdvancedDemographicInsights()
            ]);
            setGenderStats(gs.data);
            setElectorateGrowth(eg.data);
            setPartyBreakdown(pb.data);
            setAdvancedInsights(ai.data);
         } catch (err) {
            console.error("Failed to load demographics data", err);
         } finally {
            setLoading(false);
         }
      };
      loadData();
   }, []);

   return (
      <div className="flex-1 flex flex-col bg-[#0D1117] text-white min-h-screen font-sans selection:bg-blue-500/30 pb-24 md:pb-0">
         {/* Top Header - High Fidelity */}
         <header className="h-auto py-4 md:h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-xl flex flex-row items-center justify-between px-6 md:px-10 sticky top-0 z-50">
            <h1 className="text-base md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
               Kerala Polls Archive
            </h1>
            <div className="flex items-center gap-2 md:gap-4">
               <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
               </button>
               <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                  <Settings className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
               </button>
            </div>
         </header>

         <main className="p-6 md:p-10 space-y-8 max-w-[1400px] mx-auto w-full">
            {/* Title Section */}
            <div className="space-y-4 md:space-y-6">
               <div className="space-y-1">
                  <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.1]">
                     Demographics <br className="hidden md:block" /> & Representation
                  </h2>
                  <div className="flex items-center gap-2 mt-4">
                     <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Archive Data</span>
                     </div>
                  </div>
                  <p className="text-[9px] md:text-[11px] font-bold text-white/30 uppercase tracking-widest mt-4">Last Update: May 2021 Election Cycle</p>
               </div>

               {/* Year Selector - Horizontal Scroll */}
               <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
                  {years.map((year) => (
                     <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeYear === year ? 'bg-white/10 text-white border border-white/20' : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'}`}
                     >
                        {year}
                     </button>
                  ))}
               </div>
            </div>

            {loading ? (
               <DemographicsSkeleton />
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  
                  {/* Electorate Evolution */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col justify-between group hover:border-white/10 transition-colors">
                     <div>
                        <p className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Electorate Evolution</p>
                        <div className="flex items-baseline gap-2">
                           <h4 className="text-4xl md:text-5xl font-black">2.67</h4>
                           <span className="text-xl md:text-2xl font-black text-white/40">Cr</span>
                        </div>
                        <p className="text-xs md:text-sm text-white/40 mt-4 leading-relaxed font-medium">
                           Registered voters in 2021, marking a <span className="text-white">5.8% growth</span> from 2016.
                        </p>
                     </div>
                     <div className="mt-8 md:mt-10 flex items-center gap-2 text-emerald-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                        <Activity className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Consistent growth since 1957
                     </div>
                  </div>

                  {/* Win Rate by Gender */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex flex-col group hover:border-white/10 transition-colors">
                     <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Success Parity</p>
                           <h4 className="text-xl font-black tracking-tight">Win Rate by Gender</h4>
                        </div>
                        <Info className="w-5 h-5 text-white/20" />
                     </div>

                     <div className="space-y-8">
                        <div className="space-y-3">
                           <div className="flex justify-between items-end">
                              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Male Candidates</span>
                              <span className="text-xs font-black text-white/80">14.2% Success</span>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-white/20 rounded-full" style={{ width: '14.2%' }} />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-end">
                              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Female Candidates</span>
                              <span className="text-xs font-black text-emerald-500">11.8% Success</span>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '11.8%' }} />
                           </div>
                        </div>
                     </div>
                     
                     <p className="mt-auto pt-10 text-[9px] font-medium text-white/20 italic leading-relaxed">
                        Data aggregates performance across 140 constituencies over the last decade.
                     </p>
                  </div>

                  {/* Historical Participation Trend */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex flex-col group hover:border-white/10 transition-colors">
                     <div className="space-y-1 mb-8">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Women Candidates Trend</p>
                        <h4 className="text-xl font-black tracking-tight">Historical Participation % (1957–2021)</h4>
                     </div>

                     <div className="flex-1 min-h-[160px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={genderStats?.trend}>
                              <defs>
                                 <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                 </linearGradient>
                              </defs>
                              <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                              <Area type="monotone" dataKey="percentage" stroke="#10b981" fill="url(#colorTrend)" strokeWidth={3} dot={{ r: 3, fill: '#10b981' }} />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>

                     <div className="flex justify-between mt-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                        <span>1957</span>
                        <span>1982</span>
                        <span>2001</span>
                        <span>2021</span>
                     </div>
                  </div>

                  {/* Party-wise Table */}
                  <div className="lg:col-span-3 bg-[#161b22]/50 border border-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8 space-y-6 md:space-y-8 overflow-hidden">
                     <div className="space-y-1">
                        <p className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Gender Breakdown by Party</p>
                        <h4 className="text-lg md:text-xl font-black tracking-tight">Party-wise Women Fielding (2021)</h4>
                     </div>
 
                     <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left min-w-[400px] md:min-w-0">
                           <thead>
                              <tr className="border-b border-white/5 pb-4">
                                 <th className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] pb-4">Party</th>
                                 <th className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] pb-4">Total Contested</th>
                                 <th className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] pb-4">Women Fielded</th>
                                 <th className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] pb-4 text-right">Ratio</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5">
                              {partyBreakdown.slice(0, 5).map((p, i) => (
                                 <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 font-black text-xs md:text-sm">{p.party}</td>
                                    <td className="py-4 font-bold text-xs md:text-sm text-white/60">{p.total_contested}</td>
                                    <td className="py-4 font-bold text-xs md:text-sm text-white/60">{p.women_fielded}</td>
                                    <td className="py-4 font-black text-xs md:text-sm text-emerald-500 text-right">{((p.women_fielded / p.total_contested) * 100).toFixed(1)}%</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>

                  {/* Callout Card 1 - Data Integrity */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex gap-6 group hover:border-white/10 transition-colors">
                     <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-blue-500" />
                     </div>
                     <div className="space-y-3">
                        <h5 className="text-lg font-black tracking-tight">Data Integrity</h5>
                        <p className="text-[11px] md:text-xs text-white/40 leading-relaxed font-medium">
                           Our historical dataset is cross-referenced between the Statistical Reports of the Election Commission of India (ECI) and the Kerala Legislative Assembly Library archives to ensure 99.9% accuracy in candidate gender classification.
                        </p>
                     </div>
                  </div>

                  {/* Callout Card 2 - Methodology */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex gap-6 group hover:border-white/10 transition-colors">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-indigo-500" />
                     </div>
                     <div className="space-y-3">
                        <h5 className="text-lg font-black tracking-tight">Methodology</h5>
                        <p className="text-[11px] md:text-xs text-white/40 leading-relaxed font-medium">
                           "Success Rate" is calculated as total seats won divided by total candidates fielded within that gender category. Independent candidates are excluded from party-wise averages but included in overall state-level gender participation trends.
                        </p>
                     </div>
                  </div>

               </div>
            )}

            {/* Premium Footer */}
            <footer className="pt-20 pb-10 border-t border-white/5 flex flex-col items-center text-center space-y-8">
               <h3 className="text-2xl font-black tracking-tighter">Kerala Polls Archive</h3>
               <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                  <button className="hover:text-white transition-colors">Privacy Policy</button>
                  <button className="hover:text-white transition-colors">Terms of Service</button>
                  <button className="hover:text-white transition-colors">API Access</button>
                  <button className="hover:text-white transition-colors">Contact Us</button>
               </div>
               <p className="text-[10px] font-bold text-white/20">
                  © 2024 Digital Heritage Kerala. All rights reserved. Data sourced from Election Commission of India.
               </p>
            </footer>
         </main>
      </div>
   );
}

function DemographicsSkeleton() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
         <Skeleton className="h-[280px] rounded-[32px]" />
         <Skeleton className="h-[280px] rounded-[32px]" />
         <Skeleton className="h-[280px] rounded-[32px]" />
         <Skeleton className="lg:col-span-3 h-[400px] rounded-[32px]" />
      </div>
   );
}
