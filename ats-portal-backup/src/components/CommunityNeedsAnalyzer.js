"use client";

import { useEffect, useState } from "react";
import { listCommunityDevelopment, listCommunityUpliftment } from "./supabaseClient";

export default function CommunityNeedsAnalyzer() {
  const [dev, setDev] = useState([]);
  const [uplift, setUplift] = useState([]);

  useEffect(() => {
    (async () => {
      const d = await listCommunityDevelopment();
      const u = await listCommunityUpliftment();
      setDev(d.data || []);
      setUplift(u.data || []);
    })();
  }, []);

  function analyzeNeeds(c) {
    const needs = [];

    if (c.schools_built < 2) needs.push("More Schools");
    if (c.clinics_built < 1) needs.push("Clinic Required");
    if (c.roads_completed < 3) needs.push("Road Construction");
    return needs.join(", ") || "Stable";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Community Needs Analyzer ✦</h2>

      <div className="pdf-dashboard-grid">
        {dev.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.community_name}</h3>
            <p>Needs: {analyzeNeeds(c)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
