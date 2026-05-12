"use client";

import { useState, useEffect } from "react";
import {
  User,
  Search,
  ChevronRight,
  TrendingUp,
  Award,
  History,
  Info,
  Calendar,
  ExternalLink,
  Download,
  Bell,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { fetchCandidateTimeline, searchCandidates, fetchFeaturedCandidates } from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";

export function CandidatesPageContent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<any[]>([]);
  const [view, setView] = useState<'selection' | 'detail'>('selection');
  const [currentPage, setCurrentPage] = useState(1);
  const [timelinePage, setTimelinePage] = useState(1);
  const itemsPerPage = 8;
  const timelineItemsPerPage = 5;

  useEffect(() => {
    // Load featured candidates on mount
    const loadFeatured = async () => {
      setLoading(true);
      try {
        const res = await fetchFeaturedCandidates();
        setFeatured(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      return;
    }
    
    // Debounce is handled by the UI or we can add it here
    const res = await searchCandidates(val);
    setResults(res.data);
  };

  const selectCandidate = async (cand: any) => {
    setLoading(true);
    setSelectedCandidate(cand);
    setResults([]);
    setQuery("");
    setView('detail');
    setTimelinePage(1);
    try {
      const res = await fetchCandidateTimeline(cand.name);
      setTimeline(res.data);
      setSummary(res.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentStats = {
    elections: summary?.elections || 0,
    wins: summary?.wins || 0,
    gender: timeline[0]?.sex || "Male",
    winRate: summary?.win_rate || "0%"
  };

  const totalTimelinePages = Math.ceil(timeline.length / timelineItemsPerPage);
  const paginatedTimeline = timeline.slice(
    (timelinePage - 1) * timelineItemsPerPage,
    timelinePage * timelineItemsPerPage
  );

  const totalPages = Math.ceil(featured.length / itemsPerPage);
  const paginatedFeatured = featured.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const chartData = [40, 55, 62, 45, 70, 85, 95, 110];

  return (
    <div className="flex-1 flex flex-col bg-[#0D1117] text-white min-h-screen">
      {/* Top Bar - Exact UI */}
      <header className="h-auto py-4 md:h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between px-4 md:px-8 sticky top-0 z-20 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 flex-1 w-full">
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white/80">Kerala Polls Archive</h1>

          <div className="relative flex-1 w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search candidate..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            />
            {results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#161b22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                {results.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => selectCandidate(r)}
                    className="w-full text-left px-4 md:px-6 py-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{r.name}</span>
                      <span className="text-[10px] text-white/40 uppercase font-black">{r.party}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0">
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 text-white/60" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0D1117]" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-sm">
            PV
          </div>
        </div>
      </header>

      {/* Sub Header / Breadcrumbs */}
      <div className="px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.1em] md:tracking-[0.2em]">
          <span className="hidden sm:inline">Database</span>
          <ChevronRight className="w-3 h-3 hidden sm:inline" />
          <span className={view === 'selection' ? "text-white" : ""}>Candidates</span>
          {view === 'detail' && (
            <>
              <ChevronRight className="w-3 h-3 text-white" />
              <span className="text-white truncate max-w-[100px] md:max-w-none">{selectedCandidate?.name}</span>
            </>
          )}
        </div>

        {view === 'detail' && (
          <button
            onClick={() => setView('selection')}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <ChevronLeft className="w-3 h-3" />
            Back
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {view === 'selection' ? (
          <motion.main
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 md:px-8 pb-12"
          >
            <div className="mb-6 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">Featured Candidates</h2>
              <p className="text-xs md:text-sm text-white/40 mt-2">Select a prominent representative to view their electoral history</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading && featured.length === 0 ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="bg-[#161b22]/50 border border-white/5 rounded-[32px] p-8 flex flex-col items-center h-[280px]">
                    <Skeleton className="w-20 h-20 rounded-2xl mb-6" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-2 w-1/2" />
                  </div>
                ))
              ) : (
                  paginatedFeatured.map((cand, i) => (
                  <button
                    key={i}
                    onClick={() => selectCandidate(cand)}
                    className="bg-[#161b22]/50 border border-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col items-center text-center hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6 md:w-8 md:h-8 text-white/20" />
                    </div>
                    <h4 className="text-base md:text-lg font-black tracking-tight leading-tight mb-2">{cand.name}</h4>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{cand.party}</span>

                    <div className="mt-6 md:mt-8 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Timeline <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 md:gap-2 py-10">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {(() => {
                    const rangeWithDots: (number | string)[] = [];
                    const delta = 1;
                    const left = currentPage - delta;
                    const right = currentPage + delta + 1;
                    let l: number | undefined;

                    for (let i = 1; i <= totalPages; i++) {
                      if (i === 1 || i === totalPages || (i >= left && i < right)) {
                        if (l) {
                          if (i - l === 2) rangeWithDots.push(l + 1);
                          else if (i - l !== 1) rangeWithDots.push('...');
                        }
                        rangeWithDots.push(i);
                        l = i;
                      }
                    }

                    return rangeWithDots.map((page, i) => (
                      <button
                        key={i}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        disabled={typeof page !== 'number'}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs transition-all ${currentPage === page ? 'bg-blue-600 text-white' : (typeof page === 'number' ? 'bg-white/5 border border-white/10 text-white/40 hover:text-white' : 'text-white/20 cursor-default')}`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            )}
          </motion.main>
        ) : (
          <motion.main
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-4 md:px-8 pb-12 flex flex-col lg:flex-row gap-6 md:gap-8"
          >
            {/* Left Column - Profile & Growth */}
            <div className="lg:w-[400px] flex flex-col gap-6">
              {loading ? (
                <>
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 flex flex-col items-center">
                    <Skeleton className="w-32 h-32 rounded-3xl mb-8" />
                    <Skeleton className="h-10 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-10" />
                    <div className="grid grid-cols-2 w-full gap-10 border-t border-white/5 pt-10">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  </div>
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 h-64">
                    <Skeleton className="h-4 w-24 mb-10" />
                    <Skeleton className="h-32 w-full rounded-2xl" />
                  </div>
                </>
              ) : (
                <>
                  {/* Profile Card */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 border border-white/10 overflow-hidden">
                      <User className="w-10 h-10 md:w-12 md:h-12 text-white/20" />
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black mb-2 tracking-tight leading-tight whitespace-pre-line">
                      {selectedCandidate?.name?.split(' ').join('\n')}
                    </h2>

                    <div className="flex items-center gap-2 mb-8 md:mb-10">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-full uppercase">
                        {summary?.status || 'Representative'}
                      </span>
                      <span className="text-white/40 text-[10px] font-bold">• {selectedCandidate?.party || "Independent"}</span>
                    </div>

                    <div className="grid grid-cols-2 w-full gap-y-6 md:gap-y-10 text-left border-t border-white/5 pt-8 md:pt-10">
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Elections</p>
                        <p className="text-2xl font-black">{currentStats.elections}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Wins</p>
                        <p className="text-2xl font-black text-emerald-500">{currentStats.wins}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Gender</p>
                        <p className="text-2xl font-black">{currentStats.gender}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Win Rate</p>
                        <p className="text-2xl font-black">{currentStats.winRate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Growth Chart Card */}
                  <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-10">
                    <div className="flex items-center justify-between mb-8 md:mb-10">
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Performance</p>
                        <h4 className="text-xs font-black uppercase tracking-widest">Growth</h4>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-500">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-black">+12.4%</span>
                      </div>
                    </div>

                    <div className="h-40 flex items-end gap-2 px-2">
                      {chartData.map((val, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${val}%` }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-500 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-black text-white/20">
                      <span>1970</span>
                      <span>2021</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Timeline */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-[#161b22]/50 border border-white/5 rounded-[32px] md:rounded-[40px] flex flex-col min-h-screen">
                <div className="p-6 md:p-10 space-y-8 md:space-y-12">
                  {loading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex gap-10">
                        <div className="w-16 flex flex-col items-center gap-4">
                          <Skeleton className="w-4 h-4 rounded-full" />
                          <Skeleton className="h-4 w-10" />
                          <div className="flex-1 w-0.5 bg-white/5" />
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[32px] p-8">
                          <Skeleton className="h-8 w-1/2 mb-4" />
                          <Skeleton className="h-4 w-1/4 mb-10" />
                          <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : timeline.length > 0 ? (
                    <>
                      {paginatedTimeline.map((item, idx) => (
                        <div key={idx} className="flex gap-4 md:gap-10 group">
                          <div className="w-10 md:w-16 flex flex-col items-center gap-2 md:gap-4">
                            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] md:text-sm font-black text-white/40">{item.year}</span>
                            <div className="flex-1 w-0.5 bg-white/5 group-last:hidden" />
                          </div>

                          <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[24px] md:rounded-[32px] p-5 md:p-8 hover:bg-white/5 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                              <div>
                                <h4 className="text-xl md:text-2xl font-black tracking-tight">{item.constituency}</h4>
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Party: {item.party}</p>
                              </div>
                              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start">
                                <span className={`px-3 py-1 ${item.rank === 1 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'} text-[8px] font-black rounded uppercase tracking-tighter md:mb-2`}>
                                  {item.rank === 1 ? 'Elected' : 'Lost'}
                                </span>
                                <p className="text-base md:text-lg font-black tracking-tight">Votes: {item.votes?.toLocaleString()}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 border-t border-white/5 pt-6">
                              <div>
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Rank</p>
                                <p className="text-sm font-black">{item.rank}</p>
                              </div>
                              <div>
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Alliance</p>
                                <p className={`text-sm font-black ${item.alliance === 'LDF' ? 'text-emerald-500' : 'text-blue-500'}`}>{item.alliance}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Timeline Pagination */}
                      {totalTimelinePages > 1 && (
                        <div className="flex items-center justify-center gap-1 md:gap-2 pt-10">
                          <button
                            onClick={() => setTimelinePage(prev => Math.max(prev - 1, 1))}
                            disabled={timelinePage === 1}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/10 transition-colors"
                          >
                            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                          </button>

                          <div className="flex items-center gap-1">
                            {(() => {
                              const rangeWithDots: (number | string)[] = [];
                              const delta = 1;
                              const left = timelinePage - delta;
                              const right = timelinePage + delta + 1;
                              let l: number | undefined;

                              for (let i = 1; i <= totalTimelinePages; i++) {
                                if (i === 1 || i === totalTimelinePages || (i >= left && i < right)) {
                                  if (l) {
                                    if (i - l === 2) rangeWithDots.push(l + 1);
                                    else if (i - l !== 1) rangeWithDots.push('...');
                                  }
                                  rangeWithDots.push(i);
                                  l = i;
                                }
                              }

                              return rangeWithDots.map((page, i) => (
                                <button
                                  key={i}
                                  onClick={() => typeof page === 'number' && setTimelinePage(page)}
                                  disabled={typeof page !== 'number'}
                                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs transition-all ${timelinePage === page ? 'bg-blue-600 text-white' : (typeof page === 'number' ? 'bg-white/5 border border-white/10 text-white/40 hover:text-white' : 'text-white/20 cursor-default')}`}
                                >
                                  {page}
                                </button>
                              ));
                            })()}
                          </div>

                          <button
                            onClick={() => setTimelinePage(prev => Math.min(prev + 1, totalTimelinePages))}
                            disabled={timelinePage === totalTimelinePages}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/10 transition-colors"
                          >
                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-8 h-8 text-white/20" />
                      </div>
                      <h4 className="text-xl font-black text-white/60">No history found</h4>
                      <p className="text-sm text-white/20 mt-2">Search for a candidate to see their career timeline</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

    </div>
  );
}
