const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchOverviewStats() {
  try {
    const res = await fetch(`${API_BASE}/overview`, { next: { revalidate: 3600 } });
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
  const res = await fetch(`${API_BASE}/search/candidates?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search candidates");
  const data = await res.json();
  console.log(`API: searchCandidates(${query}) ->`, data);
  return data;
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

export async function fetchTurnoutHistory() {
  const res = await fetch(`${API_BASE}/dashboard/turnout-history`);
  if (!res.ok) throw new Error("Failed to fetch turnout history");
  const data = await res.json();
  console.log("API: fetchTurnoutHistory ->", data);
  return data;
}
