"use client";

import { useAtsGlobalSearch } from "@/hooks/api/search/useAtsGlobalSearch";
import { useAtsSearchSuggestions } from "@/hooks/api/search/useAtsSearchSuggestions";
import { useAtsSearchHistory } from "@/hooks/api/search/useAtsSearchHistory";

import AtsSearchResultItem from "./AtsSearchResultItem";
import AtsSearchSuggestions from "./AtsSearchSuggestions";
import AtsSearchHistory from "./AtsSearchHistory";

export default function AtsGlobalSearch() {
  const { search, loading, results, error } = useAtsGlobalSearch();
  const { suggestions, suggest } = useAtsSearchSuggestions();
  const { history, add } = useAtsSearchHistory();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    suggest(q);
    search(q);
    add(q);
  }

  return (
    <div className="ats-search-container">
      <input
        type="text"
        placeholder="Search ATS Universe..."
        className="ats-search-input"
        onChange={handleChange}
      />

      <AtsSearchSuggestions suggestions={suggestions} />
      <AtsSearchHistory history={history} />

      {loading && <div className="ats-search-loading">Searching...</div>}
      {error && <div className="ats-search-error">{error}</div>}

      {results.length > 0 && (
        <div className="ats-search-results">
          {results.map((r) => (
            <AtsSearchResultItem key={r.id} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}
