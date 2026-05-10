"use client";

import { useState } from "react";
import { Search, User, Award, Calendar, MapPin } from "lucide-react";
import { searchCandidates } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function CandidateSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length < 3) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await searchCandidates(query);
      setResults(response.data);
    } catch (err: any) {
      setError(err.message || "Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="font-display-xl text-[48px] font-extrabold tracking-[-0.02em] text-white mb-4">Search Candidates</h2>
        <p className="text-[#c4c7c8] text-lg">Track the historical performance of any politician in Kerala.</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter candidate name (e.g., Pinarayi Vijayan)"
          className="w-full h-16 bg-[#161B22] border border-[#21262D] rounded-xl px-14 text-white focus:outline-none focus:border-[#4ae176] transition-colors"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B949E] w-6 h-6" />
        <button 
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#4ae176] text-black px-6 py-2 rounded-lg font-bold text-sm"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <Card className="p-8 text-center text-red-400 border-red-900/50">
          {error}
        </Card>
      )}

      <div className="space-y-6">
        {results.map((candidate, idx) => (
          <Card key={idx} className="p-6 hover:border-[#4ae176]/50 transition-colors group cursor-pointer">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1e2022] flex items-center justify-center text-[#4ae176]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#4ae176] transition-colors">{candidate.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-[#8B949E] mt-1">
                    <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {candidate.party}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {candidate.constituency_name}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase mb-1">Election Year</div>
                  <div className="flex items-center gap-1 text-white font-mono">
                    <Calendar className="w-4 h-4 text-[#4ae176]" /> {candidate.election_year}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase mb-1">Result</div>
                  <div className={candidate.rank === 1 ? "text-[#4ae176] font-bold" : "text-[#c4c7c8]"}>
                    {candidate.rank === 1 ? "WINNER" : `Rank ${candidate.rank}`}
                  </div>
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="text-[10px] font-bold tracking-widest text-[#8B949E] uppercase mb-1">Vote %</div>
                  <div className="text-white font-mono font-bold">{candidate.vote_percentage}%</div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {!isLoading && query.length >= 3 && results.length === 0 && (
          <div className="text-center py-12 text-[#8B949E]">
            No results found for "{query}". Try a different name.
          </div>
        )}
      </div>
    </div>
  );
}
