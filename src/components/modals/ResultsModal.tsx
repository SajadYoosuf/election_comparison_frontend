import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, MapPin, Search, Filter, Loader2, AlertCircle, ChevronRight, User, TrendingUp } from 'lucide-react';
import { fetchElectionByYear, fetchConstituencyCandidates } from '@/lib/api';
import { HighFidelityKeralaMap } from '../charts/HighFidelityKeralaMap';

interface ResultsModalProps {
   isOpen: boolean;
   onClose: () => void;
   year: number;
}

export function ResultsModal({ isOpen, onClose, year }: ResultsModalProps) {
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState<any>(null);
   const [selectedId, setSelectedId] = useState<string | null>(null);
   const [allCandidates, setAllCandidates] = useState<any[]>([]);
   const [loadingCandidates, setLoadingCandidates] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (isOpen) {
         setLoading(true);
         fetchElectionByYear(year)
            .then(res => {
               console.log("Backend Data Received:", res);
               const results = res.data || [];
               setData({ results });
               if (results.length > 0) setSelectedId(results[0].id);
               setError(null);
            })
            .catch(err => {
               setError("Backend connection failed. Displaying simulated 2026 data.");
               const mockResults = [
                  { id: 1, name: "Thiruvananthapuram", winner: "Antony Raju", party: "LDF", votes: "48,200", margin: "+2.1%", alliance: "LDF", lead: 4200, runners: [{ name: "S. Suresh", party: "NDA", votes: "44,000" }] },
                  { id: 2, name: "Nemom", winner: "V. Sivankutty", party: "LDF", votes: "52,400", margin: "+1.8%", alliance: "LDF", lead: 3800, runners: [{ name: "Kummanam Rajasekharan", party: "NDA", votes: "48,600" }] },
                  { id: 3, name: "Vattiyoorkavu", winner: "V.K. Prasanth", party: "LDF", votes: "46,900", margin: "+3.4%", alliance: "LDF", lead: 7100, runners: [{ name: "Veena S. Nair", party: "UDF", votes: "39,800" }] },
                  { id: 4, name: "Kazhakoottam", winner: "Kadakampally Surendran", party: "LDF", votes: "50,100", margin: "+1.2%", alliance: "LDF", lead: 2300, runners: [{ name: "Shobha Surendran", party: "NDA", votes: "47,800" }] },
                  { id: 5, name: "Kovalam", winner: "M. Vincent", party: "UDF", votes: "47,300", margin: "+0.9%", alliance: "UDF", lead: 1200, runners: [{ name: "Neelalohithadasan Nadar", party: "LDF", votes: "46,100" }] },
                  { id: 6, name: "Neyyattinkara", winner: "K. Ansalan", party: "LDF", votes: "49,800", margin: "+4.1%", alliance: "LDF", lead: 8500, runners: [{ name: "Ansajitha Ressal", party: "UDF", votes: "41,300" }] },
                  { id: 7, name: "Aruvikkara", winner: "G. Stephen", party: "LDF", votes: "45,200", margin: "+1.5%", alliance: "LDF", lead: 3100, runners: [{ name: "K.S. Sabarinadhan", party: "UDF", votes: "42,100" }] },
                  { id: 8, name: "Parassala", winner: "C.K. Hareendran", party: "LDF", votes: "51,600", margin: "+2.8%", alliance: "LDF", lead: 6200, runners: [{ name: "Ansajitha Ressal", party: "UDF", votes: "45,400" }] },
                  { id: 9, name: "Kattakada", winner: "I.B. Satheesh", party: "LDF", votes: "48,900", margin: "+2.3%", alliance: "LDF", lead: 5400, runners: [{ name: "Malayinkeezhu Venugopal", party: "UDF", votes: "43,500" }] },
                  { id: 10, name: "Chirayinkeezhu", winner: "V. Sasi", party: "LDF", votes: "44,100", margin: "+3.7%", alliance: "LDF", lead: 9200, runners: [{ name: "B.S. Anoop", party: "UDF", votes: "34,900" }] }
               ];
               setData({ results: mockResults });
               setSelectedId(1);
            })
            .finally(() => setLoading(false));
      }
   }, [isOpen, year]);

   useEffect(() => {
    async function loadCandidates() {
      if (!selectedId) return;
      setLoadingCandidates(true);
      try {
        const response = await fetchConstituencyCandidates(selectedId);
        setAllCandidates(response.data || []);
      } catch (err) {
        console.error("Failed to load candidates:", err);
      } finally {
        setLoadingCandidates(false);
      }
    }
    loadCandidates();
  }, [selectedId]);

  const selectedConstituency = data?.results?.find((c: any) => c.id === selectedId);

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[100]"
               />
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-4 md:inset-8 bg-[#0D1117] border border-white/10 rounded-[2.5rem] z-[101] shadow-2xl overflow-hidden flex flex-col"
               >
                  {/* Header */}
                  <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#4ae176] to-[#2ecc71] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4ae176]/20">
                           <Trophy className="w-7 h-7 text-black" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black tracking-tight">{year} Results Explorer</h2>
                           <p className="text-[10px] text-[#4ae176] font-bold tracking-[0.3em] uppercase mt-0.5">Live Projection Map</p>
                        </div>
                     </div>
                     <button
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all group border border-white/5"
                     >
                        <X className="w-6 h-6 text-white/40 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
                     </button>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-black/20">

                     {/* LEFT SIDE: Visual Map */}
                     <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,225,118,0.03)_0%,transparent_70%)]" />

                        {loading ? (
                           <div className="flex flex-col items-center gap-4">
                              <Loader2 className="w-10 h-10 text-[#4ae176] animate-spin" />
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Constructing Map Data...</span>
                           </div>
                        ) : (
                           <HighFidelityKeralaMap
                              results={data?.results}
                              selectedId={selectedId || undefined}
                              onSelect={(id) => setSelectedId(id)}
                           />
                        )}

                        {/* Floating Map Legend */}
                        <div className="absolute bottom-10 left-10 flex flex-col gap-4 p-6 bg-[#161b22]/80 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl z-10">
                           <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-lg shadow-red-500/50" />
                              <span className="text-xs font-black text-white/80">LDF Alliance</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-lg shadow-blue-500/50" />
                              <span className="text-xs font-black text-white/80">UDF Alliance</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full bg-[#f97316] shadow-lg shadow-orange-500/50" />
                              <span className="text-xs font-black text-white/80">NDA Alliance</span>
                           </div>
                        </div>
                     </div>

                     {/* RIGHT SIDE: Constituency Details */}
                     <div className="w-full lg:w-[450px] bg-[#0D1117] border-l border-white/5 flex flex-col">
                        {selectedConstituency ? (
                           <div className="flex-1 flex flex-col">
                              {/* Summary Card */}
                              <div className="p-8 space-y-8 flex-1">
                                 <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-[#4ae176] uppercase tracking-widest">Selected Constituency</span>
                                    <h3 className="text-4xl font-black text-white leading-none">{selectedConstituency.name}</h3>
                                 </div>

                                 {/* Winner Banner */}
                                 <div className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] p-8 space-y-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all">
                                       <Trophy className="w-32 h-32" />
                                    </div>

                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                                             <User className="w-5 h-5 text-green-500" />
                                          </div>
                                          <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Winner (Projected)</span>
                                       </div>
                                       <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                          <TrendingUp className="w-3 h-3 text-[#4ae176]" />
                                          <span className="text-[10px] font-black text-white">{selectedConstituency.margin}</span>
                                       </div>
                                    </div>

                                    <div className="space-y-1">
                                       <h4 className="text-2xl font-black text-white">{selectedConstituency.winner}</h4>
                                       <div className="flex items-center gap-2">
                                          <span className="text-[11px] font-bold text-white/40">{selectedConstituency.party}</span>
                                          <div className="w-1 h-1 rounded-full bg-white/20" />
                                          <span className="text-[11px] font-bold text-white/40">{selectedConstituency.votes} Votes</span>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Full Candidate List */}
                                 <div className="space-y-4">
                                     <div className="flex items-center justify-between px-2">
                                        <h5 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">All Candidates</h5>
                                        {loadingCandidates && <Loader2 className="w-3 h-3 text-white/20 animate-spin" />}
                                     </div>
                                     <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                        {(allCandidates.length > 0 ? allCandidates : selectedConstituency.runners)?.map((c: any, i: number) => {
                                           const isWinner = c.rank === 1 || i === -1; // Fallback logic
                                           if (isWinner && allCandidates.length > 0) return null; // Don't show winner again in list if we have full list
                                           
                                           return (
                                              <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                key={i} 
                                                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors"
                                              >
                                                 <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold bg-white/5 text-white/60`}>
                                                       {c.party?.substring(0, 3)}
                                                    </div>
                                                    <div>
                                                       <div className="text-xs font-bold text-white">{c.name}</div>
                                                       <div className="text-[10px] text-white/40 font-medium">
                                                          {c.party} • {typeof c.votes === 'number' ? c.votes.toLocaleString() : c.votes} votes
                                                       </div>
                                                    </div>
                                                 </div>
                                                 {c.rank === 2 && (
                                                   <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[8px] font-black text-blue-400 uppercase tracking-tighter">
                                                      Runner Up
                                                   </div>
                                                 )}
                                              </motion.div>
                                           );
                                        })}
                                     </div>
                                  </div>
                              </div>

                              {/* Bottom Action */}
                              <div className="p-8 border-t border-white/5 bg-black/20">

                              </div>
                           </div>
                        ) : (
                           <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4 opacity-40">
                              <MapPin className="w-12 h-12" />
                              <p className="text-sm font-medium">Select a constituency on the map <br /> to view detailed results.</p>
                           </div>
                        )}
                     </div>

                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
}
