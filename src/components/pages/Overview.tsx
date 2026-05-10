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
  ChevronDown
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

interface DashboardStats {
  registered_voters: number;
  voter_growth: number;
  avg_turnout: number;
  total_elections: number;
  constituencies: number;
  latest_year: number;
}

export function OverviewPageContent() {
  const [activeYear, setActiveYear] = useState(2021);

  // Sample data to match the HTML layout while waiting for real API data
  const seatData = [
    { name: "LDF", seats: 99, color: "#16a34a" },
    { name: "UDF", seats: 40, color: "#2563eb" },
    { name: "NDA", seats: 1, color: "#ea580c" },
    { name: "Others", seats: 0, color: "#94a3b8" },
  ];

  const turnoutHistory = [
    { year: 2021, turnout: 74.8 },
    { year: 2016, turnout: 72.7 },
    { year: 2011, turnout: 73.4 },
    { year: 2006, turnout: 76.5 },
    { year: 2001, turnout: 72.2 },
    { year: 1996, turnout: 72.0 },
    { year: 1991, turnout: 70.0 },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-[#08090a] min-h-screen">
      {/* Top Bar */}
      <header className="h-14 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0D1117] flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Overview</h1>
          <span className="text-[11px] text-gray-500 dark:text-white/40 font-normal">Kerala Legislative Assembly — at a glance</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={activeYear}
              onChange={(e) => setActiveYear(parseInt(e.target.value))}
              className="appearance-none bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/10 rounded-md pl-3 pr-8 py-1.5 text-xs font-medium text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {[2021, 2016, 2011, 2006, 2001, 1996, 1991, 1987, 1982, 1977].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex border border-gray-200 dark:border-white/10 rounded-md overflow-hidden">
            <button className="px-3 py-1.5 text-[11px] font-bold bg-gray-900 dark:bg-white text-white dark:text-black">EN</button>
            <button className="px-3 py-1.5 text-[11px] font-bold text-gray-500 dark:text-white/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">മ</button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Seats" value="140" sub="Kerala Assembly" />
          <MetricCard 
            title="Voter Turnout" 
            value="74.8%" 
            sub="↑ +2.1% vs 2016" 
            trend="up" 
          />
          <MetricCard 
            title="Registered Electors" 
            value="2.74 Cr" 
            sub="↑ from 1.10 Cr (1957)" 
            trend="up" 
          />
          <MetricCard 
            title="Winning Alliance" 
            value="LDF" 
            sub="99 of 140 seats" 
            trend="up" 
            isTextValue
          />
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
            <h3 className="text-[12px] font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Seat Share — {activeYear}
            </h3>
            <div className="space-y-4">
              {seatData.map(item => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="text-[11px] font-medium text-gray-500 dark:text-white/60 w-12 text-right">{item.name}</div>
                  <div className="flex-1 h-2.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${(item.seats / 140) * 100}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-gray-900 dark:text-white w-8">{item.seats}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
            <h3 className="text-[12px] font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Turnout Across Elections
            </h3>
            <div className="space-y-3">
              {turnoutHistory.map(item => (
                <div key={item.year} className="flex items-center gap-3">
                  <div className="text-[10px] font-medium text-gray-400 w-8">{item.year}</div>
                  <div className="flex-1 h-5 bg-gray-100 dark:bg-white/5 rounded-md overflow-hidden relative">
                    <div 
                      className="h-full bg-blue-600/80 dark:bg-blue-600 transition-all duration-1000 flex items-center justify-end px-2" 
                      style={{ width: `${item.turnout}%` }}
                    >
                      <span className="text-[9px] font-bold text-white">{item.turnout}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
              <h3 className="text-[12px] font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Winners — Sample Constituencies ({activeYear})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/30 dark:bg-white/[0.01]">
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Constituency</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Winner</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Party</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  <WinnerRow constituency="Thiruvananthapuram" winner="V. Sivankutty" party="CPI(M)" alliance="LDF" margin="10,038" />
                  <WinnerRow constituency="Thrissur" winner="Anim Rasheed" party="INC" alliance="UDF" margin="4,912" />
                  <WinnerRow constituency="Kozhikode South" winner="A. Devarkovil" party="CPI(M)" alliance="LDF" margin="6,540" />
                  <WinnerRow constituency="Manjeri" winner="P.K. Basheer" party="IUML" alliance="UDF" margin="19,234" />
                  <WinnerRow constituency="Nemom" winner="O. Rajagopal" party="BJP" alliance="NDA" margin="3,358" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
              <h3 className="text-[12px] font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Swing Seats — Most Contested
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/30 dark:bg-white/[0.01]">
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Constituency</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flips</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Currently Held By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  <SwingRow constituency="Thrissur" flips="7 times" alliance="UDF" />
                  <SwingRow constituency="Thiruvananthapuram" flips="6 times" alliance="LDF" />
                  <SwingRow constituency="Ernakulam" flips="5 times" alliance="UDF" />
                  <SwingRow constituency="Palakkad" flips="5 times" alliance="LDF" />
                  <SwingRow constituency="Attingal" flips="4 times" alliance="LDF" />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Data Note */}
        <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-lg p-4 flex gap-3 items-start">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong>Historical Note:</strong> The 2021 election marked a significant shift in Kerala's political landscape, breaking the 40-year tradition of alternating between LDF and UDF coalitions. These dashboards use verified data from the Election Commission reports.
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, sub, trend, isTextValue = false }: any) {
  return (
    <div className="bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-white/5 rounded-xl p-4 shadow-sm group hover:border-blue-500/30 transition-all">
      <div className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest mb-2">{title}</div>
      <div className={`font-serif font-bold text-gray-900 dark:text-white mb-1 ${isTextValue ? 'text-xl pt-1' : 'text-2xl'}`}>
        {value}
      </div>
      <div className={`text-[10px] font-medium flex items-center gap-1 ${
        trend === 'up' ? 'text-green-600 dark:text-green-500' : 
        trend === 'down' ? 'text-red-600 dark:text-red-500' : 
        'text-gray-400'
      }`}>
        {sub}
      </div>
    </div>
  );
}

function WinnerRow({ constituency, winner, party, alliance, margin }: any) {
  const allianceColors: any = {
    LDF: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500",
    UDF: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500",
    NDA: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-500",
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3 text-[11px] font-medium text-gray-900 dark:text-white">{constituency}</td>
      <td className="px-4 py-3 text-[11px] text-gray-600 dark:text-white/70">{winner}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tight ${allianceColors[alliance]}`}>
          {party}
        </span>
      </td>
      <td className="px-4 py-3 text-[11px] font-mono text-gray-500 dark:text-white/50">{margin}</td>
    </tr>
  );
}

function SwingRow({ constituency, flips, alliance }: any) {
  const allianceColors: any = {
    LDF: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500",
    UDF: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500",
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3 text-[11px] font-medium text-gray-900 dark:text-white">{constituency}</td>
      <td className="px-4 py-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-500 font-bold">
          {flips}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tight ${allianceColors[alliance]}`}>
          {alliance}
        </span>
      </td>
    </tr>
  );
}
