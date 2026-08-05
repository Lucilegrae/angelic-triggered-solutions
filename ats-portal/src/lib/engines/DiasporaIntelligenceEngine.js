"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function DiasporaIntelligenceEngine() {
  const [diaspora, setDiaspora] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("diaspora_intelligence")
        .select("*")
        .order("remittances", { ascending: false });

      setDiaspora(data || []);
    })();
  }, []);

  function engage(d) {
    if (d.return_potential > 70) return "Launch ATS return‑home incentive programs.";
    if (d.skills_strength > 60) return "Deploy ATS diaspora skills integration initiatives.";
    if (d.remittances > 1000000) return "Strengthen ATS diaspora investment channels.";
    return "Maintain diaspora engagement monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Diaspora Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {diaspora.map((d) => (
          <div key={d.id} className="pdf-card">
            <h3 className="pdf-title">{d.country}</h3>
            <p>Diaspora Population: {d.diaspora_population}</p>
            <p>Remittances: ${d.remittances}</p>
            <p>Skills Strength: {d.skills_strength}</p>
            <p>Return Potential: {d.return_potential}</p>
            <p>ATS Diaspora Team: {d.ats_diaspora_team}</p>
            <p>Recommendation: {engage(d)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
