"use client";

import { useEffect, useState } from "react";
import { listCommunityDevelopment } from "./supabaseClient";

export default function CommunityDevelopmentDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listCommunityDevelopment();
      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Community Development Dashboard ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((d) => (
          <div key={d.id} className="pdf-card">
            <h3 className="pdf-title">{d.community_name}</h3>
            <p>Development Score: {d.development_score}</p>
            <p>Schools Built: {d.schools_built}</p>
            <p>Clinics Built: {d.clinics_built}</p>
            <p>Roads Completed: {d.roads_completed}</p>
            <p>ATS Intervention Level: {d.ats_intervention_level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
