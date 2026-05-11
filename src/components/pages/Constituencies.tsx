"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronRight,
  Trophy,
  History,
  Info,
  ChevronDown,
  Navigation,
  TrendingUp,
  Users,
  Layout,
  Zap,
  Download,
  Bell,
  Calendar,
  ExternalLink,
  ArrowLeft,
  MapPin,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

import { searchConstituencies, fetchConstituencyDashboard, fetchAllConstituencies } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";

type ViewType = "list" | "detail";

export function ConstituenciesPageContent() {
  const [view, setView] = useState<ViewType>("list");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [data, setData] = useState<any>(null);
  const [allConsts, setAllConsts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDistrict, setFilterDistrict] = useState("All Districts");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Load all constituencies for the list view
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const res = await fetchAllConstituencies();
        setAllConsts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, filterDistrict]);

  // Load detailed data when a constituency is selected
  useEffect(() => {
    if (view === "detail" && selectedConstituency) {
      const loadDetail = async () => {
        setLoading(true);
        try {
          const res = await fetchConstituencyDashboard(selectedConstituency);
          setData(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadDetail();
    }
  }, [selectedConstituency, view]);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (val.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await searchConstituencies(val);
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openDetail = (name: string) => {
    setSelectedConstituency(name);
    setView("detail");
    setQuery("");
    setSearchResults([]);
  };

  const districts = ["All Districts", ...new Set(allConsts.map(c => c.district))];
  const filteredConsts = allConsts.filter(c =>
    (filterDistrict === "All Districts" || c.district === filterDistrict) &&
    (c.name.toLowerCase().includes(query.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredConsts.length / itemsPerPage);
  const paginatedConsts = filteredConsts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col bg-[#08090a] text-white min-h-screen font-sans overflow-x-hidden">
      {/* Header */}
      <header className="h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-6 flex-1">
          {view === "detail" && (
            <button
              onClick={() => setView("list")}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="relative flex-1 max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search constituency..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs focus:outline-none focus:border-blue-500/50 transition-all"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#161b22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                {searchResults.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => openDetail(name)}
                    className="w-full text-left px-5 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors flex items-center justify-between"
                  >
                    <span className="text-xs font-bold">{name}</span>
                    <ChevronRight className="w-3 h-3 text-white/20" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="p-10 max-w-[1600px] mx-auto w-full">
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight">Constituencies</h1>
                <p className="text-white/40 text-sm font-medium">Explore detailed electoral data for all 140 constituencies of Kerala.</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded-[32px]" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedConsts.map((c, i) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                        onClick={() => openDetail(c.name)}
                        className="group bg-[#161b22]/40 border border-white/5 rounded-[32px] p-8 hover:bg-[#161b22]/80 hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{c.district}</p>
                            <h3 className="text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors">{c.name}</h3>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${c.alliance === 'LDF' ? 'bg-red-500' : 'bg-blue-500'}`} />
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{c.party} ({c.alliance})</span>
                          </div>

                          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Latest Winner</p>
                              <p className="text-xs font-bold text-white/80">{c.winner}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 py-10">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/10 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => {
                          const page = i + 1;
                          // Only show nearby pages if there are many
                          if (totalPages > 7) {
                            if (page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1) {
                              if (page === 2 || page === totalPages - 1) return <span key={page} className="px-2 text-white/20">...</span>;
                              return null;
                            }
                          }
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'}`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/10 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-10"
            >
              {loading ? (
                <ConstituencySkeleton />
              ) : data && (
                <div className="space-y-10">
                  {/* Summary Section */}
                  <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
                    <div className="space-y-4 max-w-3xl">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-[#4ae176]/10 text-[#4ae176] text-[10px] font-black rounded-full uppercase tracking-widest">
                          Swing Seat
                        </span>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                          District: {data.summary.district}
                        </span>
                      </div>
                      <h1 className="text-7xl font-black tracking-tighter text-white">
                        {data.summary.name}
                      </h1>
                      <p className="text-lg text-white/60 leading-relaxed font-medium">
                        {data.summary.description}
                      </p>
                    </div>

                    <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 min-w-[350px] relative overflow-hidden group hover:border-blue-500/30 transition-all">
                      <div className="relative z-10">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-2">Total Electorate</p>
                        <h2 className="text-5xl font-black tracking-tight mb-6">
                          {data.summary.total_electorate.toLocaleString()}
                        </h2>
                        <div className="space-y-2">
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: data.summary.turnout }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            />
                          </div>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest text-right">
                            {data.summary.turnout} Historical Turnout
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alliance Timeline */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-8">
                    <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Alliance Control Timeline (1977 — 2021)</h3>
                    <div className="relative h-12 w-full flex rounded-2xl overflow-hidden shadow-2xl">
                      {data.alliance_timeline.map((item: any, i: number) => (
                        <div
                          key={i}
                          className={`flex-1 ${item.alliance === 'LDF' ? 'bg-[#E11D48]' : (item.alliance === 'UDF' ? 'bg-[#2563EB]' : 'bg-gray-600')} relative group`}
                          title={`${item.year}: ${item.alliance}`}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest px-2">
                      <span>1977</span>
                      <span>1991</span>
                      <span>2006</span>
                      <span>2021</span>
                    </div>
                  </div>

                  {/* Grid: Charts & History */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Margin Trend Chart */}
                    <div className="lg:col-span-2 bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 flex flex-col">
                      <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black tracking-tight">Victory Margin Trend</h3>
                        <TrendingUp className="w-6 h-6 text-emerald-500" />
                      </div>

                      <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data.margin_trend}>
                            <XAxis
                              dataKey="year"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }}
                            />
                            <Tooltip
                              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                              contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                              itemStyle={{ color: '#4ae176', fontWeight: 900 }}
                            />
                            <Bar dataKey="margin_perc" radius={[4, 4, 0, 0]}>
                              {data.margin_trend.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.margin_perc > 15 ? '#10b981' : '#059669'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-10 grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Average Margin</p>
                          <p className="text-xl font-black">17.8%</p>
                        </div>
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Highest Margin</p>
                          <p className="text-xl font-black text-emerald-500">26.8% (2016)</p>
                        </div>
                      </div>
                    </div>

                    {/* History Table */}
                    <div className="lg:col-span-3 bg-[#161b22]/50 border border-white/5 rounded-[40px] flex flex-col overflow-hidden">
                      <div className="p-10 flex items-center justify-between border-b border-white/5">
                        <h3 className="text-2xl font-black tracking-tight">Full Election History</h3>
                        <button className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors">
                          Export Data <Download className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/5 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                              <th className="px-10 py-6">Year</th>
                              <th className="px-10 py-6">Winner</th>
                              <th className="px-10 py-6">Party</th>
                              <th className="px-10 py-6 text-right">Votes</th>
                              <th className="px-10 py-6">Runner-up</th>
                              <th className="px-10 py-6 text-right">Margin</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {data.election_history.map((row: any, i: number) => (
                              <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                                <td className="px-10 py-8 text-sm font-black text-white">{row.year}</td>
                                <td className="px-10 py-8 text-sm font-bold text-white/80">{row.winner}</td>
                                <td className="px-10 py-8">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${row.alliance === 'LDF' ? 'bg-[#E11D48]' : 'bg-[#2563EB]'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{row.party}</span>
                                  </div>
                                </td>
                                <td className="px-10 py-8 text-right font-mono text-xs">{row.votes.toLocaleString()}</td>
                                <td className="px-10 py-8 text-[11px] text-white/40 font-medium">{row.runner_up}</td>
                                <td className="px-10 py-8 text-right">
                                  <span className="text-sm font-black text-emerald-500">+{row.margin.toLocaleString()}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Insight Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
                    <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex items-center gap-6 group hover:border-blue-500/30 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Dominant Group</p>
                        <p className="text-xl font-black">{data.stats.dominant_group}</p>
                      </div>
                    </div>
                    <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex items-center gap-6 group hover:border-blue-500/30 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Layout className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Legislative Stint</p>
                        <p className="text-xl font-black">{data.stats.assemblies} Assemblies</p>
                      </div>
                    </div>
                    <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex items-center gap-6 group hover:border-blue-500/30 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Swing Propensity</p>
                        <p className="text-xl font-black">{data.stats.swing_propensity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ConstituencySkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
        <div className="space-y-4 flex-1">
          <Skeleton className="h-4 w-48 rounded-full" />
          <Skeleton className="h-20 w-3/4 rounded-2xl" />
          <Skeleton className="h-10 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-48 w-[350px] rounded-[40px]" />
      </div>
      <Skeleton className="h-32 w-full rounded-[40px]" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Skeleton className="lg:col-span-2 h-[500px] rounded-[40px]" />
        <Skeleton className="lg:col-span-3 h-[500px] rounded-[40px]" />
      </div>
    </div>
  );
}
