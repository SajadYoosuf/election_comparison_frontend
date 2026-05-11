"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Trophy,
  MapPin,
  TrendingUp,
  BarChart3,
  Flame,
  Info,
  ChevronDown,
  Download,
  Search,
  Bell,
  Play,
  ArrowRight,
  TrendingDown,
  LayoutGrid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/ui/Card";
import { fetchOverviewStats, fetchElectionByYear, fetchSwingSeats, fetchYearMetrics, fetchTurnoutHistory, fetchBiggestWins } from "@/lib/api";

const translations: any = {
  en: {
    title: "Election Summary",
    subtitle: "Check how parties did and see important facts.",
    selectElection: "Pick Year",
    election: "Year",
    totalSeats: "TOTAL SEATS",
    voterTurnout: "VOTER PERCENTAGE",
    electors: "TOTAL VOTERS",
    winningGroup: "WHO WON",
    seatShare: "Seats Won by Each Group",
    turnoutTrend: "Total Votes Polled",
    biggestWins: "Biggest Wins",
    viewAll: "View All Changes",
    prev: "Previous",
    next: "Next",
    swingSeats: "Areas where Party Changed",
    oldStory: "History",
    seeOtherYears: "Other Years:",
    results2026: "2026 Winners",
    topWinners: "Biggest Wins",
    area: "Area Name",
    winner: "Winner Name",
    party: "Party",
    votes: "Votes",
    winningGap: "Gap",
    exploreResults: "See Full List",
    gap: "Gap",
    seatsChanged: "Seats Changed Party",
    searchPlaceholder: "Search areas or people..."
  },
  ml: {
    title: "തിരഞ്ഞെടുപ്പ് ചുരുക്കം",
    subtitle: "പാർട്ടികളുടെ വിജയവും പ്രധാന വിവരങ്ങളും.",
    selectElection: "വർഷം തിരഞ്ഞെടുക്കുക",
    election: "വർഷം",
    totalSeats: "ആകെ സീറ്റുകൾ",
    voterTurnout: "വോട്ട് ശതമാനം",
    electors: "ആകെ വോട്ടർമാർ",
    winningGroup: "വിജയിച്ച മുന്നണി",
    seatShare: "സീറ്റുകളുടെ എണ്ണം",
    turnoutTrend: "ആകെ വോട്ടുകൾ",
    biggestWins: "ഏറ്റവും വലിയ വിജയം",
    viewAll: "എല്ലാ മാറ്റങ്ങളും കാണുക",
    prev: "മുൻപത്തെ",
    next: "അടുത്തത്",
    swingSeats: "പാർട്ടി മാറിയ സ്ഥലങ്ങൾ",
    oldStory: "പഴയ ചരിത്രം",
    seeOtherYears: "മറ്റു വർഷങ്ങൾ:",
    results2026: "2026 ഫലം",
    topWinners: "വലിയ വിജയങ്ങൾ",
    area: "സ്ഥലം",
    winner: "വിജയി",
    party: "പാർട്ടി",
    votes: "വോട്ടുകൾ",
    winningGap: "ഭൂരിപക്ഷം",
    exploreResults: "കൂടുതൽ കാണുക",
    gap: "വ്യത്യാസം",
    seatsChanged: "സീറ്റുകൾ മാറി",
    searchPlaceholder: "തിരയുക..."
  }
};

export function OverviewPageContent() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const [activeYear, setActiveYear] = useState(2026);
  const [stats, setStats] = useState<any>(null);
  const [electionData, setElectionData] = useState<any>(null);
  const [yearMetrics, setYearMetrics] = useState<any>(null);
  const [biggestWins, setBiggestWins] = useState<any[]>([]);
  const [bwPage, setBwPage] = useState(1);
  const bwPageSize = 5;
  const [showSwingModal, setShowSwingModal] = useState(false);
  const [turnoutHistory, setTurnoutHistory] = useState<any[]>([]);
  const [swingSeats, setSwingSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    window.dispatchEvent(new Event('storage'));
  }, [lang]);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, e, sw, m, th, bw] = await Promise.all([
          fetchOverviewStats(),
          fetchElectionByYear(activeYear),
          fetchSwingSeats(),
          fetchYearMetrics(activeYear),
          fetchTurnoutHistory(),
          fetchBiggestWins(activeYear)
        ]);
        setStats(s.data);
        setElectionData(e.data);
        setSwingSeats(sw.data);
        setYearMetrics(m.data);
        setTurnoutHistory(th.data);
        setBiggestWins(bw.data);
      } catch (err) {
        console.error("Failed to load overview data:", err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Add a small delay for a smoother "reveal"
      }
    }
    setLoading(true);
    loadData();
  }, [activeYear]);

  const ldfSeats = electionData?.results?.filter((c: any) => c.alliance === 'LDF').length || 0;
  const udfSeats = electionData?.results?.filter((c: any) => c.alliance === 'UDF').length || 0;
  const ndaSeats = electionData?.results?.filter((c: any) => c.alliance === 'NDA').length || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 border-4 border-[#4ae176]/20 border-t-[#4ae176] rounded-full animate-spin shadow-[0_0_20px_rgba(74,225,118,0.2)]" />
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-white text-lg font-black tracking-tighter uppercase">Loading Kerala Elections</span>
            <span className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">Updating {activeYear} Data</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#08090a] min-h-screen text-white font-sans overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#4ae176] transition-colors" />
            <input
              type="text"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4ae176]/50 transition-all"
              placeholder={t.searchPlaceholder}
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setLang(lang === 'en' ? 'ml' : 'en')}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#4ae176] hover:text-black transition-all"
          >
            {lang === 'en' ? 'മലയാളം' : 'English'}
          </button>
          <h2 className="text-xl font-black tracking-tight">Kerala Assemply ELection </h2>

        </div>
      </header>

      {/* Content Area */}
      <main className="p-10 space-y-10 max-w-[1600px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">{t.title}</h1>
            <p className="text-sm text-white/40 font-medium">{t.subtitle}</p>
          </div>

          <div className="relative group">
            <YearDropdown selected={activeYear} onSelect={setActiveYear} t={t} />
          </div>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title={t.totalSeats}
            value={yearMetrics?.total_seats || "140"}
            trend="Stable"
            loading={loading}
            icon={<LayoutGrid className="w-8 h-8 text-white/10" />}
          />
          <StatCard
            title={t.voterTurnout}
            value={yearMetrics?.voter_turnout || "74.06%"}
            trend={activeYear === 2021 ? "Down" : "Up"}
            isDown={activeYear === 2021}
            loading={loading}
            icon={<TrendingDown className="w-8 h-8 text-white/10" />}
          />
          <StatCard
            title={t.electors}
            value={yearMetrics?.total_votes_polled ? `${(yearMetrics.total_votes_polled / 10000000).toFixed(2)}Cr` : "2.67Cr"}
            trend="+1.1%"
            loading={loading}
            icon={<Users className="w-8 h-8 text-white/10" />}
          />
          <StatCard
            title={t.winningGroup}
            value={yearMetrics?.winning_alliance || "LDF"}
            trend={`${yearMetrics?.alliance_seats?.[yearMetrics.winning_alliance] || 0} Seats Secured`}
            isHighlight
            loading={loading}
            icon={<Trophy className="w-8 h-8 text-white/10" />}
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Alliance Share & Trend */}
          <div className="lg:col-span-8 bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-12">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">{t.seatShare}</h3>
              <button className="text-white/20 hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-10">
              <AllianceBar label="LDF (Left Democratic Front)" current={yearMetrics?.alliance_seats?.LDF || 0} total={yearMetrics?.total_seats || 140} color="#4ae176" />
              <AllianceBar label="UDF (United Democratic Front)" current={yearMetrics?.alliance_seats?.UDF || 0} total={yearMetrics?.total_seats || 140} color="#3b82f6" />
              <AllianceBar label="NDA (National Democratic Alliance)" current={yearMetrics?.alliance_seats?.NDA || 0} total={yearMetrics?.total_seats || 140} color="#f97316" />
            </div>

            <div className="pt-10 border-t border-white/5 space-y-6">
              <h3 className="text-2xl font-black">{t.turnoutTrend} ({activeYear})</h3>
              <div className="bg-white/[0.02] border border-white/5 rounded-[30px] p-8 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{t.electors}</p>
                  <h4 className="text-4xl font-black text-[#4ae176]">
                    {loading ? "---" : yearMetrics?.total_votes_polled?.toLocaleString() || "0"}
                  </h4>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{t.voterTurnout}</p>
                  <p className="text-2xl font-black text-white/80">{yearMetrics?.voter_turnout || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Swing Seats & Highlights */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-8 flex-1 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black">{t.swingSeats}</h3>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full uppercase tracking-tighter">{swingSeats.length} {t.seatsChanged}</span>
              </div>

              <div className="space-y-6">
                {swingSeats.slice(0, 5).map((s: any, idx: number) => (
                  <SwingItem
                    key={idx}
                    name={s.name}
                    from={s.from}
                    to={s.to}
                    votes={s.votes}
                    lang={lang}
                  />
                ))}
              </div>

              {swingSeats.length > 5 && (
                <button 
                  onClick={() => setShowSwingModal(true)}
                  className="w-full py-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white/5 hover:text-white transition-all mt-4"
                >
                  {t.viewAll}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Swing Modal */}
        <AnimatePresence>
          {showSwingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
              onClick={() => setShowSwingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0d1117] border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black">{t.swingSeats}</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">Full Report • {activeYear}</p>
                  </div>
                  <button 
                    onClick={() => setShowSwingModal(false)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                  {swingSeats.map((s: any, idx: number) => (
                    <SwingItem
                      key={idx}
                      name={s.name}
                      from={s.from}
                      to={s.to}
                      votes={s.votes}
                      lang={lang}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Section - Biggest Wins */}
        <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] overflow-hidden">
          <div className="p-10 flex items-center justify-between border-b border-white/5">
            <h3 className="text-3xl font-black tracking-tight">{t.biggestWins}</h3>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{activeYear} {t.election}</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{t.area}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{t.winner}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{t.party}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{t.votes}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{t.winningGap}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {biggestWins.slice((bwPage - 1) * bwPageSize, bwPage * bwPageSize).map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-6 text-sm font-black text-white">{row.area}</td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white/90">{row.winner}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase",
                        row.party === 'INC' || row.party === 'IUML' ? "bg-blue-500/10 text-blue-500" :
                        row.party === 'CPM' || row.party === 'CPI' || row.party === 'CPIM' ? "bg-emerald-500/10 text-emerald-500" :
                        "bg-white/5 text-white/40"
                      )}>
                        {row.party}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-sm font-black text-white/60">{row.votes?.toLocaleString()}</td>
                    <td className="px-10 py-6">
                      <span className="text-sm font-black text-[#4ae176]">+{row.margin?.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div className="p-8 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              Showing {(bwPage - 1) * bwPageSize + 1}-{Math.min(bwPage * bwPageSize, biggestWins.length)} of {biggestWins.length}
            </span>
            <div className="flex items-center gap-2">
              <button 
                disabled={bwPage === 1}
                onClick={() => setBwPage(p => p - 1)}
                className="px-6 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all"
              >
                {t.prev}
              </button>
              <button 
                disabled={bwPage * bwPageSize >= biggestWins.length}
                onClick={() => setBwPage(p => p + 1)}
                className="px-6 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all"
              >
                {t.next}
              </button>
            </div>
          </div>
        </div>
      </main >
    </div >
  );
}

function YearDropdown({ selected, onSelect, t }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const years = [2026, 2021, 2016, 2011, 2006, 2001, 1996, 1991, 1987, 1982, 1980, 1977, 1970, 1967, 1965, 1960, 1957];

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 bg-white/5 p-3 px-6 rounded-2xl border border-white/10 group hover:border-[#4ae176]/50 transition-all cursor-pointer min-w-[180px]"
      >
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{t.selectElection}</span>
          <span className="text-white font-black text-lg">{selected} {t.election}</span>
        </div>
        <ChevronDown className={cn("ml-auto w-5 h-5 text-white/20 group-hover:text-[#4ae176] transition-transform duration-300", isOpen && "rotate-180")} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-64 max-h-80 overflow-y-auto bg-[#161b22] border border-white/10 rounded-2xl shadow-2xl z-[100] custom-scrollbar p-2"
          >
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  onSelect(y);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between",
                  selected === y ? "bg-[#4ae176] text-black" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{y} {t.election}</span>
                {selected === y && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, trend, icon, isHighlight = false, isDown = false, loading = false }: any) {
  if (loading) {
    return (
      <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 relative overflow-hidden h-[180px]">
        <div className="space-y-4">
          <div className="h-3 w-20 bg-white/5 rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-3 w-16 bg-white/5 rounded-full animate-pulse" />
        </div>
        <div className="absolute top-10 right-10 w-12 h-12 bg-white/5 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 relative overflow-hidden group hover:border-[#4ae176]/30 transition-all shadow-2xl",
      isHighlight && "ring-1 ring-[#4ae176]/20 bg-gradient-to-br from-[#161b22]/50 to-[#4ae176]/5"
    )}>
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{title}</p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-5xl font-black tracking-tight">{value}</h4>
            <span className={`text-[10px] font-black uppercase ${isDown ? 'text-rose-500' : 'text-[#4ae176]'}`}>
              {isDown ? '↓' : '↑'} {trend}
            </span>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#4ae176]/10 group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>
      </div>
      {isHighlight && (
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#4ae176]/10 blur-3xl rounded-full" />
      )}
    </div>
  );
}

function AllianceBar({ label, current, total, color }: any) {
  const percentage = (current / total) * 100;
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/40">
        <span>{label}</span>
        <span className="text-white">{current} / {total}</span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full shadow-[0_0_20px_rgba(74,225,118,0.3)]"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function SwingItem({ name, from, to, votes, lang }: any) {
  return (
    <div className="flex items-center justify-between group py-2">
      <div>
        <h4 className="text-sm font-black text-white group-hover:text-[#4ae176] transition-colors">{name}</h4>
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Constituency</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter mb-1">
          <span className="text-white/40">{from}</span>
          <ArrowRight className="w-2.5 h-2.5 text-white/20" />
          <span className="text-[#4ae176]">{to}</span>
        </div>
        <p className="text-[9px] font-medium text-white/40">{translations[lang].votes}: {votes?.toLocaleString()}</p>
      </div>
    </div>
  );
}
