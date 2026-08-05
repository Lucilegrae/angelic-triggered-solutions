"use client";

import { useEffect, useState } from "react";
import { listConstructionProjects } from "./supabaseClient";

export default function ConstructionDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listConstructionProjects();
      setProjects(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Construction Dashboard ✦</h2>

      <div className="pdf-dashboard-grid">
        {projects.map((p) => (
          <div key={p.id} className="pdf-card">
            <h3 className="pdf-title">{p.project_name}</h3>
            <p>Community: {p.community_name}</p>
            <p>Progress: {p.progress}%</p>
            <p>Contractor: {p.contractor}</p>
            <p>ATS Engineer: {p.ats_engineer}</p>
            <p>Start Date: {p.start_date}</p>
            <p>Expected Completion: {p.expected_completion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
