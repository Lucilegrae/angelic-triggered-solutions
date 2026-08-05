"use client";

import { useEffect, useState } from "react";
import {
  listCommunityDevelopment,
  listConstructionProjects,
  listLandAllocations,
  listStakeholderAlignment,
  listCommunityUpliftment
} from "./supabaseClient";

export default function NationalEconomicSimulator() {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const dev = (await listCommunityDevelopment()).data || [];
      const cons = (await listConstructionProjects()).data || [];
      const land = (await listLandAllocations()).data || [];
      const align = (await listStakeholderAlignment()).data || [];
      const uplift = (await listCommunityUpliftment()).data || [];

      setState({ dev, cons, land, align, uplift });
    })();
  }, []);

  function simulateGrowth() {
    if (!state) return {};

    const growth =
      state.dev.length * 0.3 +
      state.cons.length * 0.5 +
      state.land.length * 0.2 +
      state.align.length * 0.4 +
      state.uplift.length * 0.3;

    return Math.round(growth);
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Economic Simulator ✦</h2>

      {state && (
        <div className="pdf-card">
          <h3 className="pdf-title">Projected National Growth</h3>
          <p>{simulateGrowth()}%</p>
        </div>
      )}
    </div>
  );
}
