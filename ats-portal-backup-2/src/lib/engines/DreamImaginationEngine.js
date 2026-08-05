"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function DreamImaginationEngine() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("dream_imagination")
        .select("*")
        .order("imagination_index", { ascending: false });

      setRegions(data || []);
    })();
  }, []);

  function amplify(r) {
    if (r.dream_intensity < 40) return "Deploy ATS dream‑activation workshops.";
    if (r.creative_potential < 50) return "Expand ATS creativity labs.";
    if (r.visionary_score < 60) return "Initiate ATS visionary training programs.";
    return "Region creatively aligned — maintain imagination monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Dream & Imagination Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {regions.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.region}</h3>
            <p>Imagination Index: {r.imagination_index}</p>
            <p>Dream Intensity: {r.dream_intensity}</p>
            <p>Creative Potential: {r.creative_potential}</p>
            <p>Visionary Score: {r.visionary_score}</p>
            <p>ATS Imagination Team: {r.ats_imagination_team}</p>
            <p>Recommendation: {amplify(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
