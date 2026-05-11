const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchOverviewStats() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/overview`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch overview stats");
    const data = await res.json();
    console.log("API: fetchOverviewStats ->", data);
    return data;
  } catch (error) {
    console.error("API Error: fetchOverviewStats ->", error);
    throw new Error("Cannot connect to server. The API might be down.");
  }
}

export async function fetchElectionByYear(year: number) {
  const res = await fetch(`${API_BASE}/elections/${year}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch election data for ${year}`);
  const data = await res.json();
  console.log(`API: fetchElectionByYear(${year}) ->`, data);
  return data;
}

export async function searchCandidates(query: string) {
  const res = await fetch(`${API_BASE}/candidates/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search candidates");
  return await res.json();
}

export async function fetchFeaturedCandidates() {
  const res = await fetch(`${API_BASE}/candidates/featured`);
  if (!res.ok) throw new Error("Failed to fetch featured candidates");
  return await res.json();
}

export async function fetchCandidateTimeline(name: string) {
  const res = await fetch(`${API_BASE}/candidates/${encodeURIComponent(name)}/timeline`);
  if (!res.ok) throw new Error("Failed to fetch candidate timeline");
  return await res.json();
}

export async function fetchConstituencyCandidates(id: string) {
  const res = await fetch(`${API_BASE}/constituencies/${id}/candidates`);
  if (!res.ok) throw new Error("Failed to fetch constituency candidates");
  const data = await res.json();
  console.log(`API: fetchConstituencyCandidates(${id}) ->`, data);
  return data;
}

export async function fetchConstituencyHistory(name: string) {
  const res = await fetch(`${API_BASE}/history/constituency/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Failed to fetch constituency history");
  const data = await res.json();
  console.log(`API: fetchConstituencyHistory(${name}) ->`, data);
  return data;
}
export async function fetchSwingSeats() {
  const res = await fetch(`${API_BASE}/dashboard/switched-seats`);
  if (!res.ok) throw new Error("Failed to fetch switched seats");
  const data = await res.json();
  console.log("API: fetchSwitchedSeats ->", data);
  return data;
}

export async function fetchYearMetrics(year: number) {
  const res = await fetch(`${API_BASE}/dashboard/year-metrics/${year}`);
  if (!res.ok) throw new Error(`Failed to fetch metrics for ${year}`);
  const data = await res.json();
  console.log(`API: fetchYearMetrics(${year}) ->`, data);
  return data;
}

export async function fetchBiggestWins(year: number) {
  const res = await fetch(`${API_BASE}/dashboard/biggest-wins/${year}`);
  if (!res.ok) throw new Error(`Failed to fetch biggest wins for ${year}`);
  const data = await res.json();
  console.log(`API: fetchBiggestWins(${year}) ->`, data);
  return data;
}

export async function fetchTurnoutHistory() {
  const res = await fetch(`${API_BASE}/dashboard/turnout-history`);
  if (!res.ok) throw new Error("Failed to fetch turnout history");
  const data = await res.json();
  console.log("API: fetchTurnoutHistory ->", data);
  return data;
}

export async function fetchPartiesSummary() {
  const res = await fetch(`${API_BASE}/parties/summary`);
  if (!res.ok) throw new Error("Failed to fetch parties summary");
  return await res.json();
}

export async function fetchPartyPerformance(name: string) {
  const res = await fetch(`${API_BASE}/parties/${encodeURIComponent(name)}/performance`);
  if (!res.ok) throw new Error("Failed to fetch party performance");
  return await res.json();
}

export async function fetchPartyStrongholds(name: string) {
  const res = await fetch(`${API_BASE}/parties/${encodeURIComponent(name)}/strongholds`);
  if (!res.ok) throw new Error("Failed to fetch party strongholds");
  return await res.json();
}

export async function fetchAllConstituencies() {
  const res = await fetch(`${API_BASE}/constituencies/list`);
  if (!res.ok) throw new Error("Failed to fetch all constituencies");
  return await res.json();
}

export async function searchConstituencies(query: string) {
  const res = await fetch(`${API_BASE}/constituencies/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search constituencies");
  return await res.json();
}

export async function fetchConstituencyDashboard(name: string) {
  const res = await fetch(`${API_BASE}/constituencies/${encodeURIComponent(name)}/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch constituency dashboard");
  return await res.json();
}

export async function fetchGenderStats() {
  const res = await fetch(`${API_BASE}/demographics/gender-stats`);
  if (!res.ok) throw new Error("Failed to fetch gender stats");
  return await res.json();
}

export async function fetchElectorateGrowth() {
  const res = await fetch(`${API_BASE}/demographics/electorate-growth`);
  if (!res.ok) throw new Error("Failed to fetch electorate growth");
  return await res.json();
}

export async function fetchPartyGenderBreakdown() {
  const res = await fetch(`${API_BASE}/demographics/party-gender-breakdown`);
  if (!res.ok) throw new Error("Failed to fetch party gender breakdown");
  return await res.json();
}

export async function fetchAdvancedDemographicInsights() {
  const res = await fetch(`${API_BASE}/demographics/advanced-insights`);
  if (!res.ok) throw new Error("Failed to fetch advanced demographic insights");
  return await res.json();
}

export async function fetchCompareYears(y1: number, y2: number) {
  const res = await fetch(`${API_BASE}/compare/years?y1=${y1}&y2=${y2}`);
  if (!res.ok) throw new Error("Failed to fetch year comparison");
  return await res.json();
}

export async function fetchCompareConstituencies(c1: string, c2: string) {
  const res = await fetch(`${API_BASE}/compare/constituencies?c1=${encodeURIComponent(c1)}&c2=${encodeURIComponent(c2)}`);
  if (!res.ok) throw new Error("Failed to fetch constituency comparison");
  return await res.json();
}

export async function fetchCompareCandidates(n1: string, n2: string) {
  const res = await fetch(`${API_BASE}/compare/candidates?name1=${encodeURIComponent(n1)}&name2=${encodeURIComponent(n2)}`);
  if (!res.ok) throw new Error("Failed to fetch candidate comparison");
  return await res.json();
}
