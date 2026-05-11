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
   BarChart as BarChartIcon
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
   const [activeDecade, setActiveDecade] = useState("2020s");

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
      <div className="flex-1 flex flex-col bg-[#0D1117] text-white min-h-screen font-sans selection:bg-blue-500/30">
         {/* Top Header */}
         <header className="h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
            <div className="relative flex-1 max-w-xl group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
               <input
                  type="text"
                  placeholder="Search demographics..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
               />
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Election Hub</p>
                  <p className="text-sm font-bold text-white tracking-tight">Kerala Election Archive</p>
               </div>

            </div>
         </header>

         <main className="p-10 space-y-12 max-w-[1600px] mx-auto w-full">
            {/* Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-4">
                  <h1 className="text-5xl font-black tracking-tighter text-white">Demographics Analyzer</h1>
                  <p className="text-lg text-white/40 font-medium max-w-3xl leading-relaxed">
                     A comprehensive 70-year retrospective on gender participation, success rates, and electorate expansion in Kerala's legislative history.
                  </p>
               </div>
            </div>

            {loading ? (
               <DemographicsSkeleton />
            ) : (
               <div className="space-y-16">

                  {/* 1. Women Candidate Share & 3. Women Elected Count */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* Candidate Share (Bar Chart) */}
                     <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-8">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-black tracking-tight">1. Women Candidate Share</h3>
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Candidacy Percentage (1957 — 2021)</p>
                        </div>
                        <div className="h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={genderStats?.trend}>
                                 <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} />
                                 <YAxis hide />
                                 <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)' }} />
                                 <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                              </BarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     {/* Elected Count (Line Chart) */}
                     <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-8">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-black tracking-tight">3. Women Elected (Absolute Count)</h3>
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Total Seats Won by Women</p>
                        </div>
                        <div className="h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={genderStats?.trend}>
                                 <defs>
                                    <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                 </defs>
                                 <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} />
                                 <YAxis hide />
                                 <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)' }} />
                                 <Area type="monotone" dataKey="women_winners" stroke="#10b981" fill="url(#colorWon)" strokeWidth={4} />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  </div>

                  {/* 2. Win Rate Comparison & 4. Party Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Win Rate (Gauge-like) */}
                     <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-8">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-black tracking-tight">2. Win Rate Parity</h3>
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Contested vs Won Success Rate (%)</p>
                        </div>
                        <div className="space-y-10 py-4">
                           <div className="space-y-4">
                              <div className="flex justify-between items-end">
                                 <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Men Win Rate</span>
                                 <span className="text-2xl font-black">{genderStats?.parity?.men_win_rate}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500/20" style={{ width: `${genderStats?.parity?.men_win_rate}%` }} />
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div className="flex justify-between items-end">
                                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Women Win Rate</span>
                                 <span className="text-2xl font-black text-emerald-500">{genderStats?.parity?.women_win_rate}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500" style={{ width: `${genderStats?.parity?.women_win_rate}%` }} />
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Party Breakdown (Donut/Leaderboard) */}
                     <div className="lg:col-span-2 bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-8">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-black tracking-tight">4. Women Candidates by Party</h3>
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Party-wise nomination and success audit</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              {partyBreakdown.slice(0, 4).map((p: any, i: number) => (
                                 <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                                    <div>
                                       <p className="text-sm font-black">{p.party}</p>
                                       <p className="text-[10px] font-bold text-white/20 uppercase">{p.total_contested} Contested</p>
                                    </div>
                                    <div className="text-right">
                                       <p className="text-sm font-black text-emerald-500">{p.women_fielded} Fielded</p>
                                       <p className="text-[10px] font-bold text-emerald-500/40 uppercase">{p.seats_won} Won</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <div className="h-full flex items-center justify-center">
                              <ResponsiveContainer width="100%" height={200}>
                                 <BarChart layout="vertical" data={partyBreakdown.slice(0, 5)}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="party" type="category" axisLine={false} tickLine={false} tick={{ fill: 'white', fontSize: 10, fontWeight: 900 }} width={80} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: 'none' }} />
                                    <Bar dataKey="women_fielded" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                 </BarChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* 5. Electorate Growth & 6. Total Votes Polled */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-10">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-black tracking-tight">5. Electorate vs 6. Total Votes Polled</h3>
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Growth Comparison over Seven Decades (In Crores)</p>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Electorate</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-emerald-500" />
                              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Votes Cast</span>
                           </div>
                        </div>
                     </div>

                     <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <LineChart data={electorateGrowth}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }} />
                              <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)' }} />
                              <Line type="monotone" dataKey="electorate_crores" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="Electorate (Cr)" />
                              <Line type="monotone" dataKey="votes_crores" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} name="Votes Cast (Cr)" />
                           </LineChart>
                        </ResponsiveContainer>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Latest Electorate</p>
                           <p className="text-2xl font-black">2.67 Cr</p>
                        </div>
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Latest Votes Cast</p>
                           <p className="text-2xl font-black text-emerald-500">2.03 Cr</p>
                        </div>
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                           <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Average Turnout</p>
                           <p className="text-2xl font-black">74.2%</p>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </main>
      </div>
   );
}

function DemographicsSkeleton() {
   return (
      <div className="space-y-10 animate-pulse">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="lg:col-span-2 h-[500px] rounded-[40px]" />
            <Skeleton className="h-[500px] rounded-[40px]" />
         </div>
         <Skeleton className="h-[200px] rounded-[40px]" />
         <Skeleton className="h-[600px] rounded-[40px]" />
      </div>
   );
}
