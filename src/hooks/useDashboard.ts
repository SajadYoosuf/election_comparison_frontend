import { useState, useEffect, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export function useDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [alliances, setAlliances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsRes, allianceRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/stats`),
        fetch(`${API_BASE}/dashboard/alliances`)
      ]);

      if (!statsRes.ok || !allianceRes.ok) throw new Error("Failed to fetch dashboard data");

      const statsData = await statsRes.json();
      const allianceData = await allianceRes.json();

      setStats(statsData.data);
      setAlliances(allianceData.data);
    } catch (err: any) {
      setError(err.message || "Connection failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { stats, alliances, isLoading, error, refresh: loadData };
}
