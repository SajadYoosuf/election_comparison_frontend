export function CoalitionSplitChart({ activeYear }: { activeYear: number }) {
  return (
    <div className="w-full mt-6">
      <div className="space-y-6">
        {/* LDF */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase">LDF</span>
            <span className="text-[14px] font-mono font-bold text-white">99 Seats</span>
          </div>
          <div className="h-2 w-full bg-[#1e2022] rounded-full overflow-hidden">
            <div className="h-full bg-[#4ae176] w-[70%]"></div>
          </div>
        </div>

        {/* UDF */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase">UDF</span>
            <span className="text-[14px] font-mono font-bold text-white">41 Seats</span>
          </div>
          <div className="h-2 w-full bg-[#1e2022] rounded-full overflow-hidden">
            <div className="h-full bg-white/20 w-[30%]"></div>
          </div>
        </div>

        {/* OTHERS */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase">OTHERS</span>
            <span className="text-[14px] font-mono font-bold text-white">0 Seats</span>
          </div>
          <div className="h-2 w-full bg-[#1e2022] rounded-full overflow-hidden">
            <div className="h-full bg-white/5 w-[0%]"></div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 text-center">
        <span className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase italic">{activeYear} Assembly Data</span>
      </div>
    </div>
  );
}
