"use client";

import { useState } from "react";
import { 
  Map as MapIcon, 
  Search, 
  Filter, 
  ChevronRight, 
  Trophy,
  History,
  Info,
  ChevronDown,
  Navigation
} from "lucide-react";

export function ConstituenciesPageContent() {
  const [district, setDistrict] = useState("Thiruvananthapuram");
  const [constituency, setConstituency] = useState("Vattiyoorkavu");

  const districts = ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"];
  
  const history = [
    { year: 2021, winner: "V.K. Prasanth", party: "CPI(M)", alliance: "LDF", margin: "21,515" },
    { year: 2019, winner: "V.K. Prasanth (By-election)", party: "CPI(M)", alliance: "LDF", margin: "14,465" },
    { year: 2016, winner: "K. Muraleedharan", party: "INC", alliance: "UDF", margin: "7,622" },
    { year: 2011, winner: "K. Muraleedharan", party: "INC", alliance: "UDF", margin: "16,167" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#08090a] min-h-screen">
      {/* Top Bar */}
      <header className="h-14 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0D1117] flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Constituencies</h1>
          <span className="text-[11px] text-gray-500 dark:text-white/40 font-normal">Micro-level electoral results and mapping</span>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Navigation & Selectors */}
        <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">District</label>
              <div className="relative">
                <select 
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Constituency</label>
              <div className="relative">
                <select 
                  value={constituency}
                  onChange={(e) => setConstituency(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>Vattiyoorkavu</option>
                  <option>Nemom</option>
                  <option>Kazhakkoottam</option>
                  <option>Thiruvananthapuram</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-2 flex items-end gap-3">
               <div className="relative flex-1">
                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                   <Search className="h-3.5 w-3.5 text-gray-400" />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Search by code or name..." 
                   className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                 />
               </div>
               <button className="h-[42px] px-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-all">
                 <Navigation className="w-3.5 h-3.5" /> Locate
               </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 bg-blue-500/10 rounded-lg">
                      <MapIcon className="w-5 h-5 text-blue-500" />
                   </div>
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">{constituency} — <span className="text-gray-400 font-medium">{district}</span></h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                   <StatBox label="Total Electors" value="1,97,345" />
                   <StatBox label="Voter Turnout" value="70.1%" />
                   <StatBox label="Winner '21" value="LDF" trend="gain" />
                   <StatBox label="Margin '21" value="21,515" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <History className="w-3.5 h-3.5" /> Electoral Control (2001 — 2021)
                  </h3>
                  <div className="flex items-center gap-1.5 h-12">
                     {[2001, 2006, 2011, 2016, 2021].map((year, i) => (
                       <div key={year} className="flex-1 flex flex-col items-center gap-2 group relative">
                          <div className={`w-3 h-3 rounded-full transition-all group-hover:scale-150 ${i < 2 ? 'bg-green-500' : 'bg-blue-500'}`} />
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{year}</span>
                       </div>
                     ))}
                  </div>
                </div>
             </div>

             <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Historical Performance Table
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/30 dark:bg-white/[0.01]">
                        <th className="px-4 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Year</th>
                        <th className="px-4 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Winner</th>
                        <th className="px-4 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Party</th>
                        <th className="px-4 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Margin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {history.map(row => (
                        <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 text-[11px] font-bold text-gray-900 dark:text-white">{row.year}</td>
                          <td className="px-4 py-3 text-[11px] text-gray-600 dark:text-white/70">{row.winner}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-tight ${row.alliance === 'LDF' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500'}`}>
                              {row.party}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[11px] font-mono text-gray-500 dark:text-white/50">{row.margin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          </div>

          {/* Sidebar Analytics */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Demographic Profile</h3>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-gray-900 dark:text-white">
                         <span>Urban Population</span>
                         <span>84%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500" style={{ width: '84%' }} />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-gray-900 dark:text-white">
                         <span>Literacy Rate</span>
                         <span>96.2%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500" style={{ width: '96.2%' }} />
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-blue-600 rounded-2xl p-6 text-white">
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Analysis Insight</h4>
                <p className="text-sm font-medium leading-relaxed">
                  Vattiyoorkavu has transitioned from a traditional UDF stronghold to an LDF-leaning constituency since the 2019 by-election.
                </p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatBox({ label, value, trend }: any) {
  return (
    <div className="p-4 bg-gray-50/50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/5 rounded-xl">
       <div className="text-[9px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest mb-1">{label}</div>
       <div className="text-[15px] font-bold text-gray-900 dark:text-white">{value}</div>
       {trend && (
         <div className="text-[8px] font-bold text-green-500 uppercase mt-1">↑ {trend}</div>
       )}
    </div>
  );
}
