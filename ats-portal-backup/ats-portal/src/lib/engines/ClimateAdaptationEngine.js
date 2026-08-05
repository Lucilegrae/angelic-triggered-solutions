"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ClimateAdaptationEngine() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("climate_adaptation")
        .select("*")
        .order("risk_level", { ascending: false });

      setRegions(data || []);
    })();
  }, []);

  function recommend(r) {
    if (r.risk_level > 80) return "Deploy ATS emergency climate teams immediately.";
    if (r.adaptation_readiness < 40) return "Increase adaptation funding and infrastructure.";
    if (r.resilience_score < 50) return "Prioritize water, agriculture, and housing resilience.";
    return "Region stable — maintain monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Climate Change Adaptation Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {regions.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.region}</h3>
            <p>Risk Level: {r.risk_level}</p>
            <p>Adaptation Readiness: {r.adaptation_readiness}</p>
            <p>Resilience Score: {r.resilience_score}</p>
            <p>ATS Climate Team: {r.ats_climate_team}</p>
            <p>Recommendation: {recommend(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
