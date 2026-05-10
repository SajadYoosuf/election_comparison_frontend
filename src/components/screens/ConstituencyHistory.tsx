"use client";

import { useState } from "react";
import { Search, MapPin, TrendingUp, History } from "lucide-react";
import { fetchConstituencyHistory } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function ConstituencyHistory() {
  const [name, setName] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 3) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchConstituencyHistory(name);
      setHistory(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch history");
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = [...history].reverse().map(h => ({
    year: h.election_year,
    margin: h.winner_margin
  }));

  return (
    <div className="w-full max-w-5xl mx-auto px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="font-display-xl text-[48px] font-extrabold tracking-[-0.02em] text-white mb-4">Constituency Time-Machine</h2>
        <p className="text-[#c4c7c8] text-lg">Analyze mandate shifts in any constituency from 1957 to 2021.</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-12 max-w-2xl mx-auto">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter constituency name (e.g., Dharmadam)"
          className="w-full h-16 bg-[#161B22] border border-[#21262D] rounded-xl px-14 text-white focus:outline-none focus:border-[#4ae176] transition-colors"
        />
        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B949E] w-6 h-6" />
        <button 
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#4ae176] text-black px-6 py-2 rounded-lg font-bold text-sm"
        >
          Analyze
        </button>
      </form>

      {isLoading && <Skeleton className="h-[400px] rounded-xl w-full" />}

      {history.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <TrendingUp className="text-[#4ae176]" /> Winning Margin Trend (%)
            </h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#8B949E", fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#8B949E", fontSize: 12 }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#161B22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    itemStyle={{ color: "#4ae176" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="margin" 
                    stroke="#4ae176" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "#4ae176" }} 
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((h, idx) => (
              <Card key={idx} className="p-6 border-l-4 border-l-[#4ae176]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-black text-white/10 font-mono">{h.election_year}</span>
                  <span className="px-3 py-1 bg-[#4ae176]/10 text-[#4ae176] rounded text-[10px] font-bold uppercase tracking-widest">Mandate</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{h.winner_name}</h4>
                <p className="text-[#4ae176] font-semibold text-sm mb-4">{h.winning_party}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase mb-1">Electorate</div>
                    <div className="text-white font-mono">{h.electorate.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase mb-1">Margin</div>
                    <div className="text-white font-mono">{h.winner_margin}%</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!isLoading && name.length >= 3 && history.length === 0 && (
        <div className="text-center py-12 text-[#8B949E]">
          No data found for constituency "{name}".
        </div>
      )}
    </div>
  );
}
