import { MapPin } from "lucide-react";

export function GeospatialPreview({ activeYear }: { activeYear: number }) {
  return (
    <div className="w-full h-[200px] mt-6 flex flex-col items-center justify-center bg-[#1e2022]/30 rounded-lg relative overflow-hidden group">
      <div 
        className="absolute inset-0 opacity-40 grayscale invert group-hover:opacity-60 transition-opacity"
        style={{ 
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/c/cb/Kerala_locator_map.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <MapPin className="w-12 h-12 text-[#4ae176] mb-2 relative z-10" />
      <span className="text-[#8B949E] text-[12px] font-medium relative z-10">Interactive constituency heat-map preview</span>
      <span className="text-[#4ae176] text-[10px] font-bold mt-2 uppercase tracking-tighter relative z-10">Showing {activeYear} Data</span>
    </div>
  );
}
