const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export async function fetchOverviewStats() {
  try {
    const res = await fetch(`${API_BASE}/overview`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch overview stats");
    return await res.json();
  } catch (error) {
    throw new Error("Cannot connect to server. The API might be down.");
  }
}

export async function fetchElectionByYear(year: number) {
  const res = await fetch(`${API_BASE}/elections/${year}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch election data for ${year}`);
  return res.json();
}

export async function searchCandidates(query: string) {
  const res = await fetch(`${API_BASE}/search/candidates?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search candidates");
  return res.json();
}

export async function fetchConstituencyHistory(name: string) {
  const res = await fetch(`${API_BASE}/history/constituency/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Failed to fetch constituency history");
  return res.json();
}
