"use client";

import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Venus, 
  Mars, 
  TrendingUp,
  PieChart as PieChartIcon,
  Info,
  Calendar
} from "lucide-react";

export function DemographicsPageContent() {
  const genderData = [
    { label: "Male Candidates", value: 894, total: 1000, color: "bg-blue-500" },
    { label: "Female Candidates", value: 106, total: 1000, color: "bg-pink-500" },
  ];

  const electorateGrowth = [
    { year: 1957, count: "1.10 Cr" },
    { year: 1980, count: "1.45 Cr" },
    { year: 2001, count: "2.12 Cr" },
    { year: 2021, count: "2.74 Cr" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#08090a] min-h-screen">
      {/* Top Bar */}
      <header className="h-14 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0D1117] flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Demographics</h1>
          <span className="text-[11px] text-gray-500 dark:text-white/40 font-normal">Representation trends and participation analysis</span>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Metric Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-pink-500/10 rounded-lg">
                    <Venus className="w-5 h-5 text-pink-500" />
                 </div>
                 <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Female Representation</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">11 MLAs</div>
              <div className="text-[10px] text-gray-400 font-medium">In the current 2021 Assembly</div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
                 <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                 <span className="text-[10px] font-bold text-green-500">Highest ever recorded</span>
              </div>
           </div>

           <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                 </div>
                 <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Electorate Density</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,94,200</div>
              <div className="text-[10px] text-gray-400 font-medium">Avg electors per constituency</div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-gray-400">
                 <Info className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold">Based on 2021 rolls</span>
              </div>
           </div>

           <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-purple-500/10 rounded-lg">
                    <UserPlus className="w-5 h-5 text-purple-500" />
                 </div>
                 <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">New Voters</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5.8 Lakhs</div>
              <div className="text-[10px] text-gray-400 font-medium">First-time voters in 2021</div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-gray-400">
                 <Calendar className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold">18-19 age bracket</span>
              </div>
           </div>
        </div>

        {/* Charts & Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                 <PieChartIcon className="w-4 h-4 text-blue-500" />
                 Gender Split in Candidacy (2021)
              </h3>
              <div className="space-y-8">
                 {genderData.map(item => (
                   <div key={item.label} className="space-y-2">
                      <div className="flex justify-between items-end">
                         <div className="text-[11px] font-bold text-gray-900 dark:text-white">{item.label}</div>
                         <div className="text-xs font-bold text-gray-900 dark:text-white">{item.value} / {item.total}</div>
                      </div>
                      <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.value / item.total) * 100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 p-4 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl">
                 <p className="text-[11px] text-gray-500 dark:text-white/40 leading-relaxed italic text-center">
                    "Despite being a state with a high female-to-male ratio, political representation in the assembly remains predominantly male."
                 </p>
              </div>
           </div>

           <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 text-green-500" />
                 Electorate Growth (1957 — 2021)
              </h3>
              <div className="space-y-6">
                 {electorateGrowth.map((item, i) => (
                   <div key={item.year} className="flex items-center gap-4 group">
                      <div className="text-[10px] font-bold text-gray-400 w-10">{item.year}</div>
                      <div className="flex-1 h-10 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-lg flex items-center px-4 relative overflow-hidden">
                         <div className="absolute inset-y-0 left-0 bg-blue-500/10 transition-all duration-1000" style={{ width: `${(i + 1) * 25}%` }} />
                         <span className="relative z-10 text-xs font-bold text-gray-900 dark:text-white">{item.count}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
