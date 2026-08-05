"use client";

import { useEffect, useState } from "react";
import {
  listCommunityDevelopment,
  listConstructionProjects,
  listCommunityUpliftment,
  listLandAllocations,
  listStakeholderAlignment
} from "./supabaseClient";

export default function EconomicForecastEngine() {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const dev = (await listCommunityDevelopment()).data || [];
      const cons = (await listConstructionProjects()).data || [];
      const uplift = (await listCommunityUpliftment()).data || [];
      const land = (await listLandAllocations()).data || [];
      const align = (await listStakeholderAlignment()).data || [];

      setState({ dev, cons, uplift, land, align });
    })();
  }, []);

  function forecast() {
    if (!state) return {};

    const baseGrowth =
      state.dev.length * 0.3 +
      state.cons.length * 0.4 +
      state.uplift.length * 0.2 +
      state.land.length * 0.1 +
      state.align.length * 0.3;

    return {
      gdp_10yr: Math.round(baseGrowth * 12),
      mining_output: Math.round(baseGrowth * 8),
      agriculture_yield: Math.round(baseGrowth * 6),
      export_growth: Math.round(baseGrowth * 10),
      inflation_projection: Math.round(5 + (100 - baseGrowth) * 0.1)
    };
  }

  const f = forecast();

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ 10‑Year Economic Forecast Engine ✦</h2>

      {state && (
        <div className="pdf-dashboard-grid">
          <div className="pdf-card"><h3 className="pdf-title">GDP Growth</h3><p>{f.gdp_10yr}%</p></div>
          <div className="pdf-card"><h3 className="pdf-title">Mining Output</h3><p>{f.mining_output}%</p></div>
          <div className="pdf-card"><h3 className="pdf-title">Agriculture Yield</h3><p>{f.agriculture_yield}%</p></div>
          <div className="pdf-card"><h3 className="pdf-title">Export Growth</h3><p>{f.export_growth}%</p></div>
          <div className="pdf-card"><h3 className="pdf-title">Inflation Projection</h3><p>{f.inflation_projection}%</p></div>
        </div>
      )}
    </div>
  );
}
