"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function EmotionalClimateEngine() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("emotional_climate")
        .select("*")
        .order("emotional_temperature", { ascending: false });

      setRegions(data || []);
    })();
  }, []);

  function soothe(r) {
    if (r.stress_index > 70) return "Deploy ATS national calming protocols.";
    if (r.joy_index < 50) return "Activate ATS joy‑creation programs.";
    if (r.calmness_level < 40) return "Initiate ATS emotional grounding circles.";
    return "Region emotionally stable — maintain climate monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Emotional Climate Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {regions.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.region}</h3>
            <p>Emotional Temperature: {r.emotional_temperature}</p>
            <p>Stress Index: {r.stress_index}</p>
            <p>Joy Index: {r.joy_index}</p>
            <p>Calmness Level: {r.calmness_level}</p>
            <p>ATS Emotional Team: {r.ats_emotional_team}</p>
            <p>Recommendation: {soothe(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
