"use client";

import { useEffect, useState } from "react";
import { listCommunityDevelopment } from "./supabaseClient";

export default function PredictiveDevelopmentAI() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listCommunityDevelopment();
      setRecords(data || []);
    })();
  }, []);

  function predictScore(r) {
    const base = r.development_score || 0;
    const schools = r.schools_built || 0;
    const clinics = r.clinics_built || 0;
    const roads = r.roads_completed || 0;
    const ats = r.ats_intervention_level || 0;

    return Math.round(
      base +
        schools * 2 +
        clinics * 3 +
        roads * 1.5 +
        ats * 4
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Predictive Development AI ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Current Score: {r.development_score}</p>
            <p>Predicted Score: {predictScore(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
