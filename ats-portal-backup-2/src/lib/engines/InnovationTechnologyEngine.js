"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function InnovationTechnologyEngine() {
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

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Innovation & Technology Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {entities.map((e) => (
          <div key={e.id} className="pdf-card">
            <h3 className="pdf-title">{e.entity_name}</h3>
            <p>Type: {e.entity_type}</p>
            <p>Province: {e.province}</p>
            <p>Patents: {e.patents}</p>
            <p>Innovation Score: {e.innovation_score}</p>
            <p>ATS Tech Team: {e.ats_tech_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
