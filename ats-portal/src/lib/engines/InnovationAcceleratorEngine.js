"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function InnovationAcceleratorEngine() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("innovation_technology")
        .select("*")
        .order("innovation_score", { ascending: false });

      setEntities(data || []);
    })();
  }, []);

  function recommendBoost(e) {
    if (e.patents > 10) return "Scale funding and expand ATS innovation hubs.";
    if (e.innovation_score > 70) return "Deploy ATS tech teams for rapid acceleration.";
    return "Provide foundational ATS support and mentorship.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Innovation Accelerator ✦</h2>

      <div className="pdf-dashboard-grid">
        {entities.map((e) => (
          <div key={e.id} className="pdf-card">
            <h3 className="pdf-title">{e.entity_name}</h3>
            <p>Type: {e.entity_type}</p>
            <p>Province: {e.province}</p>
            <p>Patents: {e.patents}</p>
            <p>Innovation Score: {e.innovation_score}</p>
            <p>Recommendation: {recommendBoost(e)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
