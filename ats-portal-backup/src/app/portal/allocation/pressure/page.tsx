"use client";

import { useState } from "react";
import BlockPressureHeatmap from "@/components/ats/allocation/BlockPressureHeatmap";

export default function BlockPressurePage() {
  const [pressure, setPressure] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadPressure() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/allocation/pressure");
    const json = await res.json();

    setLoading(false);

    if (!json.ok) {
      setError(json.error);
      return;
    }

    setPressure(json.pressure);
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">🔥 ATS Block Pressure Heatmap</h1>

      <button className="aura-button" onClick={loadPressure} disabled={loading}>
        {loading ? "Loading..." : "Load Heatmap"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {pressure.length > 0 && <BlockPressureHeatmap pressure={pressure} />}
    </div>
  );
}
