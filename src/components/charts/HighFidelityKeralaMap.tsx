import React from 'react';
import { motion } from 'framer-motion';
import { KERALA_SVG_PATHS } from './kerala_map_data';

interface HighFidelityKeralaMapProps {
  onSelect: (id: string) => void;
  selectedId?: string;
  results?: any[];
}

export const HighFidelityKeralaMap: React.FC<HighFidelityKeralaMapProps> = ({ onSelect, selectedId, results }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 263 345"
        className="w-full h-full max-h-[85vh] transition-all duration-500"
        style={{ filter: 'drop-shadow(0 0 25px rgba(0,0,0,0.4))' }}
      >
        <g id="kla_map_collection">
          {KERALA_SVG_PATHS.map((path, index) => {
            // We map the first 140 paths to our 140 constituencies
            if (index >= 140) return null;
            
            const item = results?.[index];
            if (!item) return null;

            const alliance = item.alliance;
            const isSelected = selectedId === item.id;
            
            const allianceColors: Record<string, string> = {
              'LDF': '#ef4444', // Red
              'UDF': '#3b82f6', // Blue
              'NDA': '#f97316', // Orange
            };

            const baseColor = allianceColors[alliance] || '#9ca3af';

            return (
              <motion.path
                key={item.id || index}
                d={path}
                fill={baseColor}
                fillOpacity={isSelected ? 1 : 0.7}
                stroke={isSelected ? '#fff' : '#111827'}
                strokeWidth={isSelected ? 1.5 : 0.3}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.003 }}
                whileHover={{ 
                  fillOpacity: 1, 
                  stroke: '#fff', 
                  strokeWidth: 1.2,
                  scale: 1.03,
                  zIndex: 50
                }}
                onClick={() => onSelect(item.id)}
                className="cursor-pointer outline-none transition-all duration-200"
              >
                <title>{`${item.name} (${item.party})`}</title>
              </motion.path>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
