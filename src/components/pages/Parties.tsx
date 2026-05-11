"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  History,
  Award,
  Flame,
  LayoutGrid,
  Download,
  Bell,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Filter,
  BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

import { fetchPartiesSummary, fetchPartyPerformance, fetchPartyStrongholds } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";

export function PartiesPageContent() {
  const [parties, setParties] = useState<any[]>([]);
  const [selectedParty, setSelectedParty] = useState<string>("CPI(M)");
  const [performance, setPerformance] = useState<any>(null);
  const [strongholds, setStrongholds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      try {
        const res = await fetchPartiesSummary();
        setParties(res.data);
        if (res.data.length > 0) {
          setSelectedParty(res.data[0].name);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (!selectedParty) return;
      setLoading(true);
      try {
        const [perf, strong] = await Promise.all([
          fetchPartyPerformance(selectedParty),
          fetchPartyStrongholds(selectedParty)
        ]);
        setPerformance(perf.data);
        setStrongholds(strong.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [selectedParty]);

  return (
    <div className="flex-1 flex flex-col bg-[#08090a] text-white min-h-screen font-sans">
      {/* Header */}
      <header className="h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-12 flex-1">

        </div>

        <div className="flex items-center gap-6">
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 text-white/60" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#4ae176] rounded-full border-2 border-[#0D1117]" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ae176] to-emerald-600 flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(74,225,118,0.2)]">
            PV
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10 space-y-12 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumbs & Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
            <span>Parties</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#4ae176]">Analysis Hub</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight">Party Performance Dynamics</h1>
              <p className="text-sm text-white/40 max-w-2xl">
                Deep architectural analysis of party performance across the 140 constituencies of Kerala.
                Longitudinal data tracking from 1957 to 2021.
              </p>
            </div>

          </div>
        </div>

        {/* Major Entities Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black">Major Political Entities</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
            {loading && parties.length === 0 ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-[#161b22]/50 border border-white/5 rounded-[24px] p-6 h-32">
                  <Skeleton className="h-4 w-12 mb-4 rounded-full" />
                  <Skeleton className="h-8 w-2/3 mb-2" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))
            ) : (
              parties.map((party, idx) => (
                <PartyCard
                  key={idx}
                  party={party}
                  isActive={selectedParty === party.name}
                  onClick={() => setSelectedParty(party.name)}
                />
              ))
            )}
          </div>
        </div>

        {/* Main Analytics Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] h-[500px] p-10">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-4 w-48 mb-10" />
                <Skeleton className="h-[300px] w-full rounded-2xl" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-8 h-64">
                    <Skeleton className="h-4 w-24 mb-10" />
                    <Skeleton className="h-12 w-full mb-6" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Row 1: Full-Width History Chart */}
              <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] pt-10 px-10 pb-0 relative overflow-hidden flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">Historical Seats Over Time</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">
                      {selectedParty} Seat Share Performance (1957 – 2026)
                    </p>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-0 min-w-0">
                  {performance?.history && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performance.history} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSeats" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ae176" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4ae176" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                          dataKey="year"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                          itemStyle={{ color: '#4ae176', fontWeight: 900 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="seats"
                          stroke="#4ae176"
                          strokeWidth={5}
                          fillOpacity={1}
                          fill="url(#colorSeats)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Row 2: Milestone Cards in 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Peak Performance */}
                <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-8 group hover:border-[#4ae176]/30 transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Peak Performance</span>
                    <Award className="w-5 h-5 text-[#4ae176]" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tight mb-6">{performance?.peak?.year} Election</h2>
                    <div className="flex items-center gap-6 bg-white/5 p-6 rounded-3xl">
                      <div className="text-center">
                        <p className="text-4xl font-black text-[#4ae176]">{performance?.peak?.seats}</p>
                        <p className="text-[9px] font-black text-white/20 uppercase">Total Seats</p>
                      </div>
                      <div className="h-10 w-px bg-white/10" />
                      <p className="text-xs font-medium text-white/60 leading-relaxed">
                        {selectedParty} individual contribution: <span className="text-white font-black">{performance?.peak?.seats} Seats</span>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lowest Point */}
                <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-8 group hover:border-rose-500/30 transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Lowest Point</span>
                    <Flame className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tight mb-6">{performance?.lowest?.year} Election</h2>
                    <div className="flex items-center gap-6 bg-white/5 p-6 rounded-3xl">
                      <div className="text-center">
                        <p className="text-4xl font-black text-rose-500">{performance?.lowest?.seats}</p>
                        <p className="text-[9px] font-black text-white/20 uppercase">Total Seats</p>
                      </div>
                      <div className="h-10 w-px bg-white/10" />
                      <p className="text-xs font-medium text-white/60 leading-relaxed">
                        Historic wave against {selectedParty} resulting in <span className="text-white font-black">{performance?.lowest?.seats} Seats</span>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Retention Metric */}
                <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-8 group hover:border-[#4ae176]/30 transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Avg. Seat Retention</span>
                    <History className="w-4 h-4 text-[#4ae176]" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-5xl font-black">{performance?.avg_seat_retention}%</p>
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-2">2021 → 2026</p>
                      </div>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${performance?.avg_seat_retention || 0}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#4ae176] to-emerald-500 shadow-[0_0_15px_rgba(74,225,118,0.5)]"
                      />
                    </div>
                    <p className="text-xs text-white/40 font-medium leading-relaxed">
                      Calculated based on {selectedParty}'s ability to defend seats won in the 2021 assembly election during the 2026 cycle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strongholds Table */}
              <div className="space-y-8">
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black tracking-tight">Primary Strongholds</h3>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Calculated across all elections</span>
                </div>

                <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                        <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Constituency</th>
                        <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">District</th>
                        <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Win Count</th>
                        <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Current Streak</th>
                        <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Lead Margin (2026)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {strongholds.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-10 py-8">
                            <span className="text-lg font-black tracking-tight group-hover:text-[#4ae176] transition-colors">{row.constituency}</span>
                          </td>
                          <td className="px-10 py-8 text-sm font-bold text-white/40 uppercase tracking-widest">{row.district}</td>
                          <td className="px-10 py-8 font-black text-white/80">{row.win_count} / 14</td>
                          <td className="px-10 py-8">
                            <div className="flex gap-2">
                              {row.streak.map((win: boolean, i: number) => (
                                <div key={i} className={`w-6 h-2 rounded-full ${win ? 'bg-[#4ae176]' : 'bg-rose-500'} opacity-80`} />
                              ))}
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className="text-xl font-black text-[#4ae176]">{row.margin > 0 ? `+${row.margin.toLocaleString()}` : (row.margin === 0 ? "N/A" : row.margin.toLocaleString())}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function PartyCard({ party, isActive, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`p-6 rounded-[24px] border transition-all relative overflow-hidden group ${isActive
        ? 'bg-[#161b22] border-[#4ae176]/50 shadow-[0_0_40px_rgba(74,225,118,0.1)]'
        : 'bg-[#161b22]/50 border-white/5 hover:border-white/20'
        }`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest ${party.alliance === 'LDF' ? 'bg-[#4ae176]/10 text-[#4ae176]' : 'bg-blue-500/10 text-blue-500'
          }`}>
          {party.alliance}
        </span>
        <BarChart3 className={`w-3 h-3 ${isActive ? 'text-[#4ae176]' : 'text-white/10'}`} />
      </div>

      <h4 className="text-xl font-black tracking-tight">{party.name}</h4>
      <p className="text-[8px] font-bold text-white/20 uppercase tracking-tight mt-1">
        {party.name === 'CPI(M)' ? 'Communist Party of India (Marxist)' : 'National Political Entity'}
      </p>

      {isActive && (
        <div className="absolute top-0 right-0 w-1.5 h-full bg-[#4ae176]" />
      )}
    </motion.button>
  );
}
