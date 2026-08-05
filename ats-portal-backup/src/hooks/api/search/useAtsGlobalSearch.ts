"use client";

import { useState } from "react";

export type AtsSearchResult =
  | { type: "workflow"; id: string; name: string }
  | { type: "ministry"; id: string; name: string }
  | { type: "procurement"; id: string; name: string }
  | { type: "member"; id: string; name: string }
  | { type: "compliance"; id: string; name: string }
  | { type: "payment"; id: string; name: string }
  | { type: "federation"; id: string; name: string }
  | { type: "glyph"; id: string; name: string };

export function useAtsGlobalSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AtsSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function search(query: string) {
    if (!query || query.trim().length < 2) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/search/global?q=" + encodeURIComponent(query));
      const json = await res.json();

      if (!json.ok) throw new Error(json.error);

      setResults(json.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { search, loading, results, error };
}
