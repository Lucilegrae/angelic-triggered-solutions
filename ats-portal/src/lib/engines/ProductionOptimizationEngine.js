"use client";

import { useEffect, useState } from "react";
import {
  listConstructionProjects,
  listCommunityDevelopment,
  listCommunityUpliftment,
  listLandAllocations,
  listStakeholderAlignment
} from "./supabaseClient";

export default function ProductionOptimizationEngine() {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const cons = (await listConstructionProjects()).data || [];
      const dev = (await listCommunityDevelopment()).data || [];
      const uplift = (await listCommunityUpliftment()).data || [];
      const land = (await listLandAllocations()).data || [];
      const align = (await listStakeholderAlignment()).data || [];

      setState({ cons, dev, uplift, land, align });
    })();
  }, []);

  function optimize() {
    if (!state) return [];

    const recs = [];

    if (state.cons.some((c) => c.progress < 40))
      recs.push("Deploy ATS engineers to stalled construction sites.");

    if (state.dev.some((d) => d.schools_built < 2))
      recs.push("Increase school construction in low‑development communities.");

    if (state.uplift.some((u) => !u.water_access))
      recs.push("Prioritize water access in upliftment‑lagging communities.");

    if (state.land.some((l) => l.allocation_status === "pending"))
      recs.push("Accelerate land allocation approvals.");

    if (state.align.some((a) => a.legitimacy_score < 50))
      recs.push("Increase stakeholder engagement in low‑legitimacy sectors.");

    return recs;
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Production Optimization Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {optimize().map((r, i) => (
          <div key={i} className="pdf-card">
            <p>{r}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
