"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CulturalEvolutionEngine() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("cultural_evolution")
        .select("*")
        .order("evolution_rate", { ascending: false });

      setDomains(data || []);
    })();
  }, []);

  function evolve(d) {
    if (d.evolution_rate > 70) return "Support cultural modernization programs.";
    if (d.heritage_strength < 40) return "Increase heritage preservation initiatives.";
    if (d.modernity_index > 60) return "Promote cultural fusion and innovation.";
    return "Domain stable — maintain cultural monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Cultural Evolution Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {domains.map((d) => (
          <div key={d.id} className="pdf-card">
            <h3 className="pdf-title">{d.cultural_domain}</h3>
            <p>Evolution Rate: {d.evolution_rate}</p>
            <p>Heritage Strength: {d.heritage_strength}</p>
            <p>Modernity Index: {d.modernity_index}</p>
            <p>ATS Cultural Evolution Team: {d.ats_culture_evolution_team}</p>
            <p>Recommendation: {evolve(d)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
