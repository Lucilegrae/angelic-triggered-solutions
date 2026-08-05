"use client";

import { useMultiMinistryHeatmap } from "@/hooks/api/workflow/useMultiMinistryHeatmap";
import MultiMinistryHeatmapRenderer from "@/components/ats/workflow/MultiMinistryHeatmapRenderer";

export default function MultiMinistryHeatmapPage() {
  const { loading, data, error } = useMultiMinistryHeatmap();

  return (
    <div className="ats-container">
      <h1 className="aura-title">🔥 Multi‑Ministry Workflow Heatmap</h1>

      {loading && <p>Loading heatmap...</p>}
      {error && <p className="error-text">{error}</p>}

      {data && <MultiMinistryHeatmapRenderer heatmap={data.heatmap} />}
    </div>
  );
}
