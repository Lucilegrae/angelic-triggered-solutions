"use client";

import { useEffect, useState } from "react";
import {
  listCommunityDevelopment,
  listConstructionProjects,
  listCommunityUpliftment,
  listLandAllocations,
  listStakeholderAlignment
} from "./supabaseClient";

export default function NationalDigitalTwin() {
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

  function twinStatus() {
    if (!state) return "Loading…";

    const score =
      state.dev.length +
      state.cons.length +
      state.uplift.length +
      state.land.length +
      state.align.length;

    return score > 50
      ? "Digital Twin Active"
      : "Digital Twin Initializing";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS National Digital Twin ✦</h2>

      <div className="pdf-card">
        <h3 className="pdf-title">Status</h3>
        <p>{twinStatus()}</p>
      </div>
    </div>
  );
}
