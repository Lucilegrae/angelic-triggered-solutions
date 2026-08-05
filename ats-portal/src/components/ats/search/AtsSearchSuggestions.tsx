"use client";

export default function AtsSearchSuggestions({ suggestions }: { suggestions: string[] }) {
  if (suggestions.length === 0) return null;

  return (
    <div className="ats-search-suggestions">
      {suggestions.map((s) => (
        <div key={s} className="ats-search-suggestion">
          {s}
        </div>
      ))}
    </div>
  );
}
