"use client";

import { useEffect, useState } from "react";
import { listCommunityDevelopment } from "./supabaseClient";

export default function InfrastructurePriorityEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listCommunityDevelopment();
      setRecords(data || []);
    })();
  }, []);

  function priorityScore(r) {
    return (
      (10 - r.development_score) +
      (3 - r.schools_built) * 2 +
      (2 - r.clinics_built) * 3 +
      (5 - r.roads_completed)
    );
  }

  const sorted = [...records].sort(
    (a, b) => priorityScore(b) - priorityScore(a)
  );

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infrastructure Priority Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {sorted.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Priority Score: {priorityScore(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
