"use client";

import { Card } from "@/components/ui/Card";
import { PARTY_COLORS } from "@/lib/constants";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

export function PartyAnalysis() {
  const seatShare = [
    { name: "CPI(M)", seats: 62, color: PARTY_COLORS.CPM },
    { name: "INC", seats: 21, color: PARTY_COLORS.INC },
    { name: "CPI", seats: 17, color: "#D32F2F" },
    { name: "IUML", seats: 15, color: PARTY_COLORS.IUML },
    { name: "KC(M)", seats: 5, color: "#1B5E20" },
    { name: "BJP", seats: 0, color: PARTY_COLORS.BJP },
  ];

  const voteTrend = [
    { year: 2001, LDF: 43.7, UDF: 49.3 },
    { year: 2006, LDF: 48.6, UDF: 42.9 },
    { year: 2011, LDF: 44.9, UDF: 45.8 },
    { year: 2016, LDF: 43.5, UDF: 38.8 },
    { year: 2021, LDF: 45.4, UDF: 39.4 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h2 className="font-display-xl text-[48px] font-extrabold tracking-[-0.02em] text-white mb-4">Party Performance</h2>
        <p className="text-[#8B949E] text-lg">Detailed analysis of political parties and coalition strengths.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="lg:col-span-2 p-8">
          <h3 className="text-xl font-bold text-white mb-8">Vote Share Trend (%)</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={voteTrend}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#8B949E'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8B949E'}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: "#161B22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                />
                <Bar dataKey="LDF" fill={PARTY_COLORS.LDF} radius={[4, 4, 0, 0]} />
                <Bar dataKey="UDF" fill={PARTY_COLORS.UDF} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-bold text-white mb-8">Current Seat Split</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={seatShare}
                  dataKey="seats"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {seatShare.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {seatShare.map((party) => (
              <div key={party.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: party.color}}></div>
                  <span className="text-sm text-[#c4c7c8]">{party.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{party.seats}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {seatShare.map((party) => (
          <Card key={party.name} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-black" style={{backgroundColor: party.color}}>
                {party.name[0]}
              </div>
              <div>
                <h4 className="text-white font-bold">{party.name}</h4>
                <p className="text-[10px] text-[#8B949E] uppercase tracking-widest font-bold">Mainstream Party</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <div className="text-[10px] font-bold text-[#8B949E] uppercase mb-1">Seats</div>
                <div className="text-xl font-bold text-white">{party.seats}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#8B949E] uppercase mb-1">Status</div>
                <div className="text-[10px] font-bold text-[#4ae176]">{party.seats > 0 ? "REPRESENTED" : "UNREPRESENTED"}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
