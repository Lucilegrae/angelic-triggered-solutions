"use client";

import { useEffect, useState } from "react";
import {
  listCommunityDevelopment,
  listCommunityUpliftment,
  listLandAllocations,
  listConstructionProjects,
  listStakeholderAlignment
} from "./supabaseClient";

export default function PolicyRecommendationEngine() {
  const [dev, setDev] = useState([]);
  const [uplift, setUplift] = useState([]);
  const [land, setLand] = useState([]);
  const [cons, setCons] = useState([]);
  const [align, setAlign] = useState([]);

  useEffect(() => {
    (async () => {
      setDev((await listCommunityDevelopment()).data || []);
      setUplift((await listCommunityUpliftment()).data || []);
      setLand((await listLandAllocations()).data || []);
      setCons((await listConstructionProjects()).data || []);
      setAlign((await listStakeholderAlignment()).data || []);
    })();
  }, []);

  function recommend() {
    const recs = [];

    if (dev.some((d) => d.schools_built < 2))
      recs.push("Increase school construction in low‑development communities.");

    if (uplift.some((u) => !u.water_access))
      recs.push("Prioritize water access in upliftment‑lagging communities.");

    if (land.some((l) => l.allocation_status === "pending"))
      recs.push("Accelerate land allocation approvals.");

    if (cons.some((c) => c.progress < 30))
      recs.push("Deploy ATS engineers to stalled construction projects.");

    if (align.some((a) => a.legitimacy_score < 40))
      recs.push("Increase stakeholder engagement in low‑legitimacy sectors.");

    return recs;
  }

  const recs = recommend();

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Policy Recommendation Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {recs.map((r, i) => (
          <div key={i} className="pdf-card">
            <p>{r}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
