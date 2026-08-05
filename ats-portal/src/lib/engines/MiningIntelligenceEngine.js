"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function MiningIntelligenceEngine() {
  const [mines, setMines] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("mining_operations")
        .select("*")
        .order("production_tonnage", { ascending: false });

      setMines(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Mining Intelligence Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {mines.map((m) => (
          <div key={m.id} className="pdf-card">
            <h3 className="pdf-title">{m.mine_name}</h3>
            <p>Mineral: {m.mineral_type}</p>
            <p>Province: {m.province}</p>
            <p>Production (Tons): {m.production_tonnage}</p>
            <p>Safety Incidents: {m.safety_incidents}</p>
            <p>Compliance Score: {m.compliance_score}</p>
            <p>ATS Inspector: {m.ats_inspector}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
