"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function FamilyCohesionEngine() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("family_cohesion")
        .select("*")
        .order("cohesion_index", { ascending: false });

      setCommunities(data || []);
    })();
  }, []);

  function strengthen(c) {
    if (c.conflict_level > 60) return "Deploy ATS conflict resolution and family healing teams.";
    if (c.family_stability < 50) return "Increase ATS family support programs.";
    if (c.cohesion_index < 40) return "Activate ATS community bonding initiatives.";
    return "Community stable — maintain cohesion monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Family & Community Cohesion Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {communities.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.community_name}</h3>
            <p>Family Stability: {c.family_stability}</p>
            <p>Cohesion Index: {c.cohesion_index}</p>
            <p>Conflict Level: {c.conflict_level}</p>
            <p>ATS Family Team: {c.ats_family_team}</p>
            <p>Recommendation: {strengthen(c)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
