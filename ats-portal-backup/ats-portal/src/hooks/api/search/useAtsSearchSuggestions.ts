"use client";

import { useState } from "react";

export function useAtsSearchSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const dictionary = [
    "workflow",
    "ministry",
    "procurement",
    "cosmic",
    "member",
    "compliance",
    "payment",
    "federation",
    "glyph",
  ];

  function suggest(query: string) {
    if (!query || query.length < 1) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = dictionary.filter((d) => d.startsWith(q));
    setSuggestions(matches.slice(0, 5));
  }

  return { suggestions, suggest };
}
