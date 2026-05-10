"use client";

import { cn } from "@/components/ui/Card";

interface TimeMachineProps {
  activeYear: number;
  setActiveYear: (year: number) => void;
}

export function TimeMachine({ activeYear, setActiveYear }: TimeMachineProps) {
  const years = [
    1957, 1960, 1967, 1970, 1977, 1980, 1987, 1991, 1996, 2001, 2006, 2011,
    2016, 2021, 2026,
  ];

  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto mt-24 px-8 hidden md:block">
      <div className="bg-[rgba(22,24,26,0.7)] backdrop-blur-xl border border-white/10 h-16 rounded-full flex items-center px-8 justify-between">
        <span className="font-label-sm text-[12px] font-semibold text-[#c4c7c8] uppercase tracking-widest">
          Time Machine
        </span>
        <div className="flex-1 mx-8 flex items-center justify-between relative px-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-white/10"></div>
          </div>
          {years.map((year) => {
            const isActive = year === activeYear;
            return (
              <div
                key={year}
                onClick={() => setActiveYear(year)}
                className={cn(
                  "relative z-10 rounded-full transition-colors cursor-pointer",
                  isActive
                    ? "w-4 h-4 bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                    : "w-2 h-2 bg-white/20 hover:bg-white"
                )}
                title={isActive ? `${year} (Active)` : `${year}`}
              ></div>
            );
          })}
        </div>
        <div className="font-headline-md text-[24px] font-bold text-white ml-4">
          {activeYear}
        </div>
      </div>
    </div>
  );
}
