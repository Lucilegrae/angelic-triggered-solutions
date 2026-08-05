"use client";

import { useState, useEffect } from "react";

export function useAtsSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ats-search-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  function add(query: string) {
    if (!query || query.length < 2) return;

    const updated = [query, ...history.filter((h) => h !== query)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("ats-search-history", JSON.stringify(updated));
  }

  return { history, add };
}
