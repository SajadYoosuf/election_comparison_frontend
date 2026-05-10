"use client";

import { useState } from "react";
import { 
  User, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Award,
  History,
  Info,
  Calendar,
  ExternalLink
} from "lucide-react";

export function CandidatesPageContent() {
  const [query, setQuery] = useState("");

  const careerHighlights = [
    { year: 2021, event: "Won Dharmadam", party: "CPI(M)", margin: "50,123", role: "Chief Minister" },
    { year: 2016, event: "Won Dharmadam", party: "CPI(M)", margin: "36,905", role: "Chief Minister" },
    { year: 1996, event: "Won Payyannur", party: "CPI(M)", margin: "28,078", role: "MLA" },
    { year: 1977, event: "Won Koothuparamba", party: "CPI(M)", margin: "4,401", role: "MLA" },
    { year: 1970, event: "Won Koothuparamba", party: "CPI(M)", margin: "2,742", role: "MLA" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#08090a] min-h-screen">
      {/* Top Bar */}
      <header className="h-14 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0D1117] flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Candidates</h1>
          <span className="text-[11px] text-gray-500 dark:text-white/40 font-normal">Candidate history and career tracking</span>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Search Header */}
        <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-sm text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-2">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Candidate Time-Machine</h2>
            <p className="text-sm text-gray-500 dark:text-white/40">Search through 60,000+ historical candidate records to trace any representative's political journey from 1957 to 2021.</p>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl text-sm placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Search by name (e.g. Pinarayi Vijayan, Oommen Chandy...)"
              />
            </div>
          </div>
        </div>

        {/* Career Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Snapshot Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pinarayi Vijayan</h3>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">CPI(M) · LDF</p>
                </div>
              </div>

              <div className="space-y-4">
                <MetricSmall label="Total Contests" value="6 Elections" />
                <MetricSmall label="Victories" value="5 Wins" />
                <MetricSmall label="Avg Vote Share" value="54.2%" />
                <MetricSmall label="Active Since" value="1970" />
              </div>

              <button className="w-full mt-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-2 transition-all">
                View Full Dossier <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                <History className="w-4 h-4 text-blue-500" />
                Electoral Journey
              </h3>

              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-blue-500/20 before:to-transparent">
                {careerHighlights.map((item, index) => (
                  <div key={index} className="relative flex items-center group">
                    <div className="absolute left-0 w-10 h-10 rounded-full bg-white dark:bg-[#0D1117] border-2 border-blue-500 flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-lg">
                      <Calendar className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="ml-14 flex-1 bg-gray-50/50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/5 rounded-xl p-4 hover:border-blue-500/30 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{item.year} Assembly</span>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[9px] font-bold rounded uppercase tracking-tighter">Winner</span>
                      </div>
                      <div className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">{item.event}</div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-400 font-medium">Margin: <span className="text-blue-500 font-bold">{item.margin}</span></span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/10" />
                        <span className="text-[10px] text-gray-400 font-medium">{item.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricSmall({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5 last:border-0">
      <span className="text-[11px] text-gray-500 dark:text-white/40">{label}</span>
      <span className="text-[11px] font-bold text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}
