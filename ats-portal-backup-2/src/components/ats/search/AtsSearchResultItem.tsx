"use client";

import { useRouter } from "next/navigation";
import type { AtsSearchResult } from "@/hooks/api/search/useAtsGlobalSearch";

export default function AtsSearchResultItem({ result }: { result: AtsSearchResult }) {
  const router = useRouter();

  function go() {
    router.push(`/portal/${result.type}?id=${result.id}`);
  }

  return (
    <div className="ats-search-item" onClick={go}>
      <span className="type">{result.type.toUpperCase()}</span>
      <span className="name">{result.name}</span>
    </div>
  );
}
