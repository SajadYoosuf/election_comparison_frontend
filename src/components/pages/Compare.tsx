"use client";

import { useState, useEffect } from "react";
import { 
  GitCompare, 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  Search,
  Users,
  MapPin,
  User,
  Zap,
  ArrowLeftRight,
  Download,
  Info,
  ShieldCheck,
  Award,
  Activity,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  fetchCompareYears, 
  fetchCompareConstituencies, 
  fetchCompareCandidates,
  searchConstituencies,
  searchCandidates
} from "@/lib/api";
import { Skeleton } from "@/components/ui/Skeleton";

type CompareMode = 'year-vs-year' | 'constituency-vs-constituency' | 'candidate-vs-candidate';

export function ComparePageContent() {
  const [mode, setMode] = useState<CompareMode>('year-vs-year');
  const [loading, setLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState<any>(null);
  
  // Params
  const [yearA, setYearA] = useState(2016);
  const [yearB, setYearB] = useState(2021);
  const [constA, setConstA] = useState("Dharmadam");
  const [constB, setConstB] = useState("Puthuppally");
  const [candA, setCandA] = useState("Pinarayi Vijayan");
  const [candB, setCandB] = useState("Oommen Chandy");

  const years = [2021, 2016, 2011, 2006, 2001, 1996, 1991, 1987, 1982, 1977, 1970, 1967, 1965, 1960, 1957];

  const handleCompare = async () => {
    setLoading(true);
    try {
      let data;
      if (mode === 'year-vs-year') {
        data = await fetchCompareYears(yearA, yearB);
      } else if (mode === 'constituency-vs-constituency') {
        data = await fetchCompareConstituencies(constA, constB);
      } else {
        data = await fetchCompareCandidates(candA, candB);
      }
      setComparisonData(data);
    } catch (err) {
      console.error("Comparison failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCompare();
  }, [mode]);

  return (
    <div className="flex-1 flex flex-col bg-[#0D1117] text-white min-h-screen font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="h-auto py-4 md:h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between px-4 md:px-10 sticky top-0 z-50 gap-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">Compare & Benchmark</h1>
          <p className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-widest">Advanced Electoral Benchmarking Engine</p>
        </div>
        
        <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar">
          <ModeTab active={mode === 'year-vs-year'} onClick={() => setMode('year-vs-year')} label="Years" />
          <ModeTab active={mode === 'constituency-vs-constituency'} onClick={() => setMode('constituency-vs-constituency')} label="Constituencies" />
          <ModeTab active={mode === 'candidate-vs-candidate'} onClick={() => setMode('candidate-vs-candidate')} label="Candidates" />
        </div>
      </header>

      <main className="p-4 md:p-10 space-y-8 md:space-y-10 max-w-[1400px] mx-auto w-full">
        {/* Selector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-center bg-[#161b22]/50 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-2xl">
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
               <Zap className="w-3.5 h-3.5" /> Baseline Selection
            </div>
            {mode === 'year-vs-year' && (
              <SelectBox value={yearA} onChange={(val: number) => { setYearA(val); setTimeout(handleCompare, 0); }} options={years.map(y => ({ label: `${y} Assembly`, value: y }))} icon={<Calendar />} />
            )}
            {mode === 'constituency-vs-constituency' && (
              <SearchableInput 
                value={constA} 
                onChange={(val: string) => { setConstA(val); setTimeout(handleCompare, 0); }} 
                placeholder="Search Constituency..." 
                type="constituency"
                icon={<MapPin />} 
              />
            )}
            {mode === 'candidate-vs-candidate' && (
              <SearchableInput 
                value={candA} 
                onChange={(val: string) => { setCandA(val); setTimeout(handleCompare, 0); }} 
                placeholder="Search Candidate..." 
                type="candidate"
                icon={<User />} 
              />
            )}
          </div>

          <div className="flex items-center justify-center">
            <button 
              onClick={handleCompare}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center border-4 border-[#0D1117] shadow-xl hover:scale-110 transition-all active:scale-95 group"
            >
              <GitCompare className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">
               <Zap className="w-3.5 h-3.5" /> Comparison Selection
            </div>
            {mode === 'year-vs-year' && (
              <SelectBox value={yearB} onChange={(val: number) => { setYearB(val); setTimeout(handleCompare, 0); }} options={years.map(y => ({ label: `${y} Assembly`, value: y }))} icon={<Calendar />} />
            )}
            {mode === 'constituency-vs-constituency' && (
              <SearchableInput 
                value={constB} 
                onChange={(val: string) => { setConstB(val); setTimeout(handleCompare, 0); }} 
                placeholder="Search Constituency..." 
                type="constituency"
                icon={<MapPin />} 
              />
            )}
            {mode === 'candidate-vs-candidate' && (
              <SearchableInput 
                value={candB} 
                onChange={(val: string) => { setCandB(val); setTimeout(handleCompare, 0); }} 
                placeholder="Search Candidate..." 
                type="candidate"
                icon={<User />} 
              />
            )}
          </div>
        </div>

        {loading ? (
          <ComparisonSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${mode}-${yearA}-${yearB}-${constA}-${constB}-${candA}-${candB}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {comparisonData && <ComparisonContent mode={mode} data={comparisonData} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

function ModeTab({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
        active ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}

function SearchableInput({ value, onChange, placeholder, type, icon }: any) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = type === 'constituency' 
          ? await searchConstituencies(query)
          : await searchCandidates(query);
        
        const data = res.data || res;
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, type]);

  return (
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors z-10">
        {icon}
      </div>
      <input 
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShow(true);
        }}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 200)}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-[16px] md:rounded-[20px] pl-14 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 text-lg md:text-xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 transition-all relative z-0"
      />
      
      {show && (suggestions.length > 0 || loading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0D1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] max-h-60 overflow-y-auto">
          {loading ? (
             <div className="p-4 text-xs font-bold text-white/20 animate-pulse uppercase tracking-widest text-center">Searching Hub...</div>
          ) : (
            suggestions.map((s: any, i) => {
              const displayName = typeof s === 'string' ? s : s.name;
              const subText = typeof s === 'string' ? null : s.party;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(displayName);
                    onChange(displayName);
                    setShow(false);
                  }}
                  className="w-full text-left px-6 py-4 text-sm font-bold hover:bg-white/5 transition-colors border-b border-white/5 last:border-none"
                >
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-white/80 group-hover:text-white transition-colors">{displayName}</span>
                    {subText && (
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{subText}</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function SelectBox({ value, onChange, options, icon }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
      <select 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full appearance-none bg-white/[0.03] border border-white/10 rounded-[16px] md:rounded-[20px] pl-14 md:pl-16 pr-10 py-4 md:py-5 text-lg md:text-xl font-black text-white focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer"
      >
        {options.map((o: any) => <option key={o.value} value={o.value} className="bg-[#0D1117]">{o.label}</option>)}
      </select>
      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 pointer-events-none" />
    </div>
  );
}

function InputBox({ value, onChange, placeholder, icon }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-[20px] pl-16 pr-6 py-5 text-xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 transition-all"
      />
    </div>
  );
}

function ComparisonContent({ mode, data }: any) {
  const { baseline, comparison } = data;
  
  const getMetrics = () => {
    if (mode === 'year-vs-year') {
      return [
        { label: "Voter Turnout (%)", key: "turnout", suffix: "%", icon: <Activity /> },
        { label: "LDF Seats won", key: "ldf_seats", suffix: "/ 140", icon: <Award /> },
        { label: "Registered Electors", key: "total_electorate", suffix: "", icon: <Users />, format: (v: number) => v ? (v/10000000).toFixed(2) + " Cr" : "0.00 Cr" },
        { label: "Total Votes Polled", key: "total_votes", suffix: "", icon: <Zap />, format: (v: number) => v ? (v/10000000).toFixed(2) + " Cr" : "0.00 Cr" },
        { label: "Contesting Candidates", key: "total_candidates", suffix: "", icon: <User /> },
        { label: "Average Victory Margin", key: "avg_margin", suffix: " votes", icon: <ChevronRight /> },
        { label: "Women Candidates %", key: "women_perc", suffix: "%", icon: <Venus /> },
        { label: "Women Elected", key: "women_elected", suffix: " seats", icon: <ShieldCheck /> },
        { label: "NOTA Votes", key: "nota_total", suffix: "", icon: <Info />, format: (v: number) => v?.toLocaleString() ?? "0" },
        { label: "Deposits Forfeited", key: "forfeited", suffix: "", icon: <TrendingDown /> },
        { label: "Independents Elected", key: "ind_seats", suffix: "", icon: <User /> }
      ];
    } else if (mode === 'constituency-vs-constituency') {
      return [
        { label: "All-time Win Count", key: "win_count", suffix: " elections", icon: <Award /> },
        { label: "Avg Victory Margin", key: "avg_margin", suffix: " votes", icon: <ChevronRight /> },
        { label: "Times Flipped", key: "flips", suffix: " times", icon: <ArrowLeftRight /> },
        { label: "Highest ever Turnout", key: "highest_turnout", suffix: "%", icon: <TrendingUp /> },
        { label: "Lowest ever Turnout", key: "lowest_turnout", suffix: "%", icon: <TrendingDown /> },
        { label: "Current Electorate", key: "current_electorate", suffix: "", icon: <Users />, format: (v: number) => v?.toLocaleString() ?? "0" },
        { label: "Electorate Growth", key: "electorate_growth", suffix: "", icon: <TrendingUp />, format: (v: number) => v ? (v > 0 ? "+" : "") + v.toLocaleString() : "0" },
        { label: "Total Candidates ever", key: "total_candidates", suffix: "", icon: <Users /> },
        { label: "Avg Cands per Election", key: "avg_candidates", suffix: "", icon: <User /> },
        { label: "Closest ever Race", key: "closest_race", suffix: " votes", icon: <Target /> },
        { label: "Biggest ever Landslide", key: "biggest_landslide", suffix: " votes", icon: <Zap /> },
        { label: "Women won (total)", key: "women_won", suffix: "", icon: <Venus /> },
        { label: "NOTA % (2016-21 avg)", key: "nota_avg", suffix: "%", icon: <Info /> }
      ];
    } else {
      return [
        { label: "Total Contested", key: "contested", suffix: " times", icon: <History /> },
        { label: "Total Wins", key: "wins", suffix: "", icon: <Award /> },
        { label: "Win Rate %", key: "win_rate", suffix: "%", icon: <Activity /> },
        { label: "Total Votes received", key: "total_votes", suffix: "", icon: <Zap />, format: (v: number) => v?.toLocaleString() ?? "0" },
        { label: "Best ever Vote Count", key: "best_votes", suffix: "", icon: <TrendingUp />, format: (v: number) => v?.toLocaleString() ?? "0" },
        { label: "Best Vote Share", key: "best_share", suffix: "%", icon: <Zap /> },
        { label: "Avg Vote Share", key: "avg_share", suffix: "%", icon: <Activity /> },
        { label: "Seats Contested", key: "seats", suffix: "", icon: <MapPin />, format: (v: string[]) => v?.length ?? 0 },
        { label: "Parties representing", key: "parties", suffix: "", icon: <ShieldCheck />, format: (v: string[]) => v?.length ?? 0 },
        { label: "First Election Year", key: "first_year", suffix: "", icon: <Calendar /> },
        { label: "Last Election Year", key: "last_year", suffix: "", icon: <Calendar /> },
        { label: "Career Span", key: "span", suffix: " years", icon: <History /> },
        { label: "Biggest Win Margin", key: "max_margin", suffix: " votes", icon: <TrendingUp /> },
        { label: "Closest Win/Loss", key: "min_margin", suffix: " votes", icon: <Target /> }
      ];
    }
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-10">
      <div className="bg-[#161b22]/30 border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Metric Analysis</th>
              <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{baseline.year || baseline.name} Results</th>
              <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{comparison.year || comparison.name} Results</th>
              <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Delta (Δ)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {metrics.map((m: any, i: number) => {
              const v1 = baseline[m.key];
              const v2 = comparison[m.key];
              const delta = (typeof v1 === 'number' && typeof v2 === 'number') ? (v2 - v1) : null;
              
              return (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 md:px-10 py-6 md:py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-blue-500 transition-colors">
                        {m.icon}
                      </div>
                      <span className="text-sm font-black tracking-tight">{m.label}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-10 py-6 md:py-8 text-lg md:text-xl font-black">
                    {m.format ? m.format(v1) : v1}{m.suffix}
                  </td>
                  <td className="px-6 md:px-10 py-6 md:py-8 text-lg md:text-xl font-black">
                    {m.format ? m.format(v2) : v2}{m.suffix}
                  </td>
                  <td className="px-6 md:px-10 py-6 md:py-8">
                    <DeltaBadge value={delta} isPerc={m.suffix === '%'} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Footer Insight */}
      <div className="bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/10 rounded-[32px] md:rounded-[40px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="space-y-3 md:space-y-4 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black tracking-tight">Electoral Benchmarking Insights</h3>
            <p className="text-white/40 text-xs md:text-sm max-w-2xl leading-relaxed">
               This side-by-side analysis highlights the critical performance shifts in {mode.replace(/-/g, ' ')}. 
               The comparative delta between the selected items provides a data-driven overview of historical trends and success patterns.
            </p>
         </div>
         <Download className="w-10 h-10 md:w-12 md:h-12 text-white/10 hover:text-white transition-all cursor-pointer" />
      </div>
    </div>
  );
}

function DeltaBadge({ value, isPerc }: { value: number | null, isPerc?: boolean }) {
  if (value === null) return <span className="text-white/10">—</span>;
  
  const isPos = value > 0;
  const isZero = value === 0;
  
  return (
    <div className={`px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 w-fit ${
      isZero ? 'bg-white/5 text-white/40' : (isPos ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500')
    }`}>
      {isZero ? null : (isPos ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />)}
      {isZero ? 'NO CHANGE' : `${isPos ? '+' : ''}${value.toLocaleString()}${isPerc ? '%' : ''}`}
    </div>
  );
}

function ComparisonSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="h-[600px] bg-white/5 rounded-[40px]" />
      <div className="h-[200px] bg-white/5 rounded-[40px]" />
    </div>
  );
}

function Venus(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 15V22"></path><path d="M9 19H15"></path><circle cx="12" cy="9" r="6"></circle></svg>
  )
}

function Target(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
  )
}

function ChevronRight(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"></path></svg>
  )
}
