"use client";

import { useEffect, useState } from "react";
import { listCommunityDevelopment } from "./supabaseClient";

export default function CommunityDevelopmentConstellation() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listCommunityDevelopment();
      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Community Development Constellation ✦</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Development Score: {r.development_score}</p>
            <p>Schools: {r.schools_built}</p>
            <p>Clinics: {r.clinics_built}</p>
            <p>Roads: {r.roads_completed}</p>
            <p>ATS Intervention: {r.ats_intervention_level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
