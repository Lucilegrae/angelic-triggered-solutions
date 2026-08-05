"use client";

import { useEffect, useState } from "react";
import { listConstructionProjects } from "./supabaseClient";

export default function ConstructionTimelineEngine() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listConstructionProjects();
      setProjects(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Construction Timeline Engine ✦</h2>

      <div className="space-y-6">
        {projects.map((p) => (
          <div key={p.id} className="pdf-card">
            <h3 className="pdf-title">{p.project_name}</h3>
            <p>Community: {p.community_name}</p>
            <p>Start: {p.start_date}</p>
            <p>Expected Completion: {p.expected_completion}</p>

            <div className="w-full bg-slate-800 h-2 rounded mt-2">
              <div
                className="bg-sky-500 h-2 rounded"
                style={{ width: p.progress + "%" }}
              />
            </div>

            <p className="text-xs text-slate-400 mt-1">Progress: {p.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
