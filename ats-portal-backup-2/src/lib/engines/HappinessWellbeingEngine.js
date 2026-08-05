"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function HappinessWellbeingEngine() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("happiness_wellbeing")
        .select("*")
        .order("wellbeing_score", { ascending: false });

      setCommunities(data || []);
    })();
  }, []);

  function uplift(c) {
    if (c.mental_health_index < 40) return "Deploy ATS mental health support teams.";
    if (c.economic_comfort < 50) return "Increase income support and job creation.";
    if (c.social_cohesion < 60) return "Strengthen community engagement programs.";
    return "Community stable — maintain wellbeing monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Happiness & Wellbeing Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {communities.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.community_name}</h3>
            <p>Wellbeing Score: {c.wellbeing_score}</p>
            <p>Economic Comfort: {c.economic_comfort}</p>
            <p>Social Cohesion: {c.social_cohesion}</p>
            <p>Mental Health Index: {c.mental_health_index}</p>
            <p>ATS Wellbeing Team: {c.ats_wellbeing_team}</p>
            <p>Recommendation: {uplift(c)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
