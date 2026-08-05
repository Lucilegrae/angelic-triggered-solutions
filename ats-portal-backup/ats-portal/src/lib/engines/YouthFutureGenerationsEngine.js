"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function YouthFutureGenerationsEngine() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("youth_future_generations")
        .select("*")
        .order("skills_index", { ascending: false });

      setRegions(data || []);
    })();
  }, []);

  function empower(r) {
    if (r.opportunity_score < 40) return "Deploy ATS youth opportunity programs.";
    if (r.skills_index < 50) return "Expand ATS digital skills and vocational training.";
    if (r.wellbeing_index < 60) return "Increase youth mental health and community support.";
    return "Region stable — maintain youth development monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Youth & Future Generations Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {regions.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.region}</h3>
            <p>Youth Population: {r.youth_population}</p>
            <p>Skills Index: {r.skills_index}</p>
            <p>Opportunity Score: {r.opportunity_score}</p>
            <p>Wellbeing Index: {r.wellbeing_index}</p>
            <p>ATS Youth Team: {r.ats_youth_team}</p>
            <p>Recommendation: {empower(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
