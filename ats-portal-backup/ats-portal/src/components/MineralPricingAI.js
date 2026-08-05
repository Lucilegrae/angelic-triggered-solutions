"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function MineralPricingAI() {
  const [mines, setMines] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("mining_operations")
        .select("*");

      setMines(data || []);
    })();
  }, []);

  function price(m) {
    return Math.round(
      m.production_tonnage * 0.8 +
      (100 - m.compliance_score) * 0.5 +
      (5 - m.safety_incidents) * 10
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Mineral Pricing AI ✦</h2>

      <div className="pdf-dashboard-grid">
        {mines.map((m) => (
          <div key={m.id} className="pdf-card">
            <h3 className="pdf-title">{m.mineral_type}</h3>
            <p>Mine: {m.mine_name}</p>
            <p>Estimated Price: ${price(m)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
