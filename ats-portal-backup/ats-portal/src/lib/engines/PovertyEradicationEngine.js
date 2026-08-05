"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function PovertyEradicationEngine() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("poverty_eradication")
        .select("*")
        .order("poverty_index", { ascending: false });

      setCommunities(data || []);
    })();
  }, []);

  function eradicate(c) {
    if (c.poverty_index > 80) return "Deploy ATS rapid upliftment teams and emergency welfare.";
    if (c.intervention_level < 40) return "Increase food, water, and income support programs.";
    if (c.upliftment_score < 50) return "Expand ATS community development and job creation.";
    return "Community stable — maintain monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Poverty Eradication Master Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {communities.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.community_name}</h3>
            <p>Poverty Index: {c.poverty_index}</p>
            <p>Intervention Level: {c.intervention_level}</p>
            <p>Upliftment Score: {c.upliftment_score}</p>
            <p>ATS Eradication Team: {c.ats_eradication_team}</p>
            <p>Strategy: {eradicate(c)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
