"use client";

import { useSectorInfluence } from "@/hooks/api/workflow/useSectorInfluence";
import SectorInfluenceGraph from "@/components/ats/workflow/SectorInfluenceGraph";

export default function SectorInfluencePage() {
  const { loading, data, error } = useSectorInfluence();

  return (
    <div className="ats-container">
      <h1 className="aura-title">🌟 Sector Influence Intelligence</h1>

      {loading && <p>Loading influence data...</p>}
      {error && <p className="error-text">{error}</p>}

      {data && <SectorInfluenceGraph sectors={data.influence} />}
    </div>
  );
}
