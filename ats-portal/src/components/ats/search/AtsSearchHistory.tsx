"use client";

export default function AtsSearchHistory({ history }: { history: string[] }) {
  if (history.length === 0) return null;

  return (
    <div className="ats-search-history">
      <h4>Recent Searches</h4>
      {history.map((h) => (
        <div key={h} className="ats-search-history-item">
          {h}
        </div>
      ))}
    </div>
  );
}
