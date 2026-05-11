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
import { motion } from "framer-motion";
import { fetchOverviewStats, fetchElectionByYear } from "@/lib/api";

export function OverviewPageContent() {
  const [activeYear, setActiveYear] = useState(2021);
  const [stats, setStats] = useState<any>(null);
  const [electionData, setElectionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, e] = await Promise.all([
          fetchOverviewStats(),
          fetchElectionByYear(activeYear)
        ]);
        setStats(s.data);
        setElectionData(e.data);
      } catch (err) {
        console.error("Failed to load overview data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeYear]);

  const ldfSeats = electionData?.results?.filter((c: any) => c.alliance === 'LDF').length || 0;
  const udfSeats = electionData?.results?.filter((c: any) => c.alliance === 'UDF').length || 0;
  const ndaSeats = electionData?.results?.filter((c: any) => c.alliance === 'NDA').length || 0;

  return (
    <div className="flex-1 flex flex-col bg-[#08090a] min-h-screen text-white font-sans">
      {/* Top Navigation Bar */}
      <header className="h-20 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-6 flex-1">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#4ae176] transition-colors" />
            <input 
               type="text"
               placeholder="Search elections, candidates..."
               className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4ae176]/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <h2 className="text-xl font-black tracking-tight">Kerala Election Archive</h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-white/60" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4ae176] to-emerald-400 flex items-center justify-center shadow-lg shadow-[#4ae176]/20">
              <Users className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-10 space-y-10 max-w-[1600px] mx-auto w-full">
        {/* Page Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Election Overview</h1>
            <p className="text-sm text-white/40 font-medium">State-wide historical performance and key insights.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/10">
            {[2016, 2021, "2026(P)"].map((y: any) => (
              <button 
                key={y}
                onClick={() => typeof y === 'number' && setActiveYear(y)}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                  (activeYear === y || (y === "2026(P)" && activeYear === 2026)) 
                  ? "bg-white text-black shadow-xl" 
                  : "text-white/40 hover:text-white"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="TOTAL SEATS" 
            value="140" 
            trend="Stable" 
            icon={<LayoutGrid className="w-8 h-8 text-white/10" />}
          />
          <StatCard 
            title="VOTER TURNOUT" 
            value={activeYear === 2021 ? "74.06%" : "77.35%"} 
            trend={activeYear === 2021 ? "Down" : "Up"} 
            isDown={activeYear === 2021}
            icon={<TrendingDown className="w-8 h-8 text-white/10" />}
          />
          <StatCard 
            title="REGISTERED ELECTORS" 
            value="2.67Cr" 
            trend="+1.1%" 
            icon={<Users className="w-8 h-8 text-white/10" />}
          />
          <StatCard 
            title="WINNING ALLIANCE" 
            value="LDF" 
            trend={`${ldfSeats} Seats Secured`} 
            isHighlight
            icon={<Trophy className="w-8 h-8 text-white/10" />}
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Alliance Share & Trend */}
          <div className="lg:col-span-8 bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 space-y-12">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">Alliance Seat Share</h3>
              <button className="text-white/20 hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-10">
              <AllianceBar label="LDF (Left Democratic Front)" current={ldfSeats} total={140} color="#4ae176" />
              <AllianceBar label="UDF (United Democratic Front)" current={udfSeats} total={140} color="#3b82f6" />
              <AllianceBar label="NDA (National Democratic Alliance)" current={ndaSeats} total={140} color="#f97316" />
            </div>

            <div className="pt-10 border-t border-white/5 space-y-8">
               <h3 className="text-2xl font-black">Voter Turnout Trend (1957–2021)</h3>
               <div className="h-48 relative">
                  {/* Simplified Trend Line Visual */}
                  <svg className="w-full h-full" viewBox="0 0 1000 100">
                    <path 
                      d="M0,80 Q100,20 200,70 T400,30 T600,60 T800,40 T1000,10" 
                      fill="none" 
                      stroke="rgba(74,225,118,0.3)" 
                      strokeWidth="2" 
                    />
                    <circle cx="1000" cy="10" r="4" fill="#4ae176" />
                  </svg>
                  <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest px-2">
                    <span>1957</span>
                    <span>1967</span>
                    <span>1980</span>
                    <span>1991</span>
                    <span>2001</span>
                    <span>2011</span>
                    <span>2016</span>
                    <span className="text-white">2021</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Swing Seats & Highlights */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] p-8 flex-1 space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Swing Seats</h3>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full uppercase tracking-tighter">12 Seats Flipped</span>
               </div>
               
               <div className="space-y-6">
                  <SwingItem seat="Nemom" district="Thiruvananthapuram" from="NDA" to="LDF" margin="3,951" />
                  <SwingItem seat="Palakkad" district="Palakkad" from="LDF" to="UDF" margin="3,859" />
                  <SwingItem seat="Thrithala" district="Palakkad" from="UDF" to="LDF" margin="3,016" />
               </div>

               <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all">
                  View All Changes
               </button>
            </div>

            <div className="relative rounded-[40px] overflow-hidden group h-64 border border-white/5">
               <img 
                src="https://images.unsplash.com/photo-1541448554466-dd0ad08307c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" 
                alt="Kerala Assembly"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
               <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-white text-black text-[10px] font-black rounded-lg uppercase mb-2 inline-block">Archive Highlight</span>
                  <p className="text-sm font-bold text-white/80">Historical Assembly Hall Structure</p>
               </div>
            </div>
          </div>
        </div>

        {/* Timeline Journey */}
        <div className="bg-white/5 border border-white/5 rounded-[30px] p-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Timeline Journey:</span>
            <div className="flex gap-6 overflow-x-auto pb-2 custom-scrollbar">
              {[1957, 1967, 1980, 1991, 2001, 2011, 2016, 2021].map(y => (
                <button key={y} className={`text-[11px] font-black ${y === activeYear ? 'text-[#4ae176]' : 'text-white/40'}`}>
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <Play className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-[#4ae176] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#4ae176]/20">
              Predict 2026 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-[#161b22]/50 border border-white/5 rounded-[40px] overflow-hidden">
          <div className="p-10 flex items-center justify-between border-b border-white/5">
             <h3 className="text-3xl font-black tracking-tight">Top Margin Winners</h3>
             <div className="flex items-center gap-4">
                <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/5">
                  <Download className="w-4 h-4 text-white/60" />
                </button>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Constituency</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Winner</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Party</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Votes</th>
                  <th className="px-10 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {electionData?.results?.sort((a:any, b:any) => {
                  const marginA = parseInt(a.margin.replace(/[^0-9]/g, '')) || 0;
                  const marginB = parseInt(b.margin.replace(/[^0-9]/g, '')) || 0;
                  return marginB - marginA;
                }).slice(0, 5).map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-6 text-sm font-black text-white">{row.name}</td>
                    <td className="px-10 py-6 text-sm font-bold text-white/60">{row.winner}</td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${row.alliance === 'LDF' ? 'bg-[#4ae176]' : row.alliance === 'UDF' ? 'bg-[#3b82f6]' : 'bg-[#f97316]'}`} />
                        <span className="text-xs font-black text-white/80">{row.party}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm font-medium text-white/40">{row.votes}</td>
                    <td className="px-10 py-6">
                      <span className="text-sm font-black text-[#4ae176]">{row.margin}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full py-8 bg-white/5 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-all">
             Explore Detailed Results
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend, icon, isHighlight = false, isDown = false }: any) {
  return (
    <div className={`bg-[#161b22]/50 border border-white/5 rounded-[40px] p-10 relative overflow-hidden group hover:border-[#4ae176]/30 transition-all shadow-2xl ${isHighlight ? 'ring-1 ring-[#4ae176]/20' : ''}`}>
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

function SwingItem({ seat, district, from, to, margin }: any) {
  return (
    <div className="flex items-center justify-between group">
      <div>
        <h4 className="text-sm font-black text-white group-hover:text-[#4ae176] transition-colors">{seat}</h4>
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{district}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter mb-1">
          <span className={from === 'NDA' ? 'text-[#f97316]' : from === 'UDF' ? 'text-[#3b82f6]' : 'text-[#4ae176]'}>{from}</span>
          <ArrowRight className="w-2.5 h-2.5 text-white/20" />
          <span className={to === 'LDF' ? 'text-[#4ae176]' : to === 'UDF' ? 'text-[#3b82f6]' : 'text-[#f97316]'}>{to}</span>
        </div>
        <p className="text-[9px] font-medium text-white/40">Margin: {margin}</p>
      </div>
    </div>
  );
}
