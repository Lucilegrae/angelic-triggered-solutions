"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function MiningForecastingAI() {
  const [mines, setMines] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("mining_operations")
        .select("*");

      setMines(data || []);
    })();
  }, []);

  function forecast(m) {
    return Math.round(
      m.production_tonnage +
      (100 - m.compliance_score) * 0.5 -
      m.safety_incidents * 2
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Mining Production Forecasting AI ✦</h2>

      <div className="pdf-dashboard-grid">
        {mines.map((m) => (
          <div key={m.id} className="pdf-card">
            <h3 className="pdf-title">{m.mine_name}</h3>
            <p>Current Output: {m.production_tonnage} tons</p>
            <p>Forecast Output: {forecast(m)} tons</p>
          </div>
        ))}
      </div>
    </div>
  );
}
