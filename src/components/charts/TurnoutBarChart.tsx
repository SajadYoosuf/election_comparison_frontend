"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function TurnoutBarChart({ activeYear }: { activeYear: number }) {
  const data = [
    { year: 1957, turnout: 65.5, active: activeYear === 1957 },
    { year: 1960, turnout: 72.1, active: activeYear === 1960 },
    { year: 1967, turnout: 68.3, active: activeYear === 1967 },
    { year: 1970, turnout: 71.4, active: activeYear === 1970 },
    { year: 1977, turnout: 74.2, active: activeYear === 1977 },
    { year: 1980, turnout: 72.3, active: activeYear === 1980 },
    { year: 1987, turnout: 80.5, active: activeYear === 1987 },
    { year: 1991, turnout: 73.1, active: activeYear === 1991 },
    { year: 1996, turnout: 71.2, active: activeYear === 1996 },
    { year: 2001, turnout: 72.5, active: activeYear === 2001 },
    { year: 2006, turnout: 72.3, active: activeYear === 2006 },
    { year: 2011, turnout: 75.1, active: activeYear === 2011 },
    { year: 2016, turnout: 77.3, active: activeYear === 2016 },
    { year: 2021, turnout: 74.1, active: activeYear === 2021 },
  ];

  return (
    <div className="w-full h-[200px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#8B949E", fontSize: 10 }}
            dy={10}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{ backgroundColor: "#16181A", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
            itemStyle={{ color: "#fff" }}
          />
          <Bar dataKey="turnout" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.year === 1960 ? "#4ae176" : "#282a2c"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
