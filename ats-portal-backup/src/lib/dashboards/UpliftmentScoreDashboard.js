"use client";

import { useEffect, useState } from "react";
import { listUpliftmentScores } from "./supabaseClient";

export default function UpliftmentScoreDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listUpliftmentScores();
      setItems(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Upliftment Score Rankings ✦</h2>

      <div className="pdf-dashboard-grid">
        {items.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.name}</h3>

            <p>Sector: {s.sector}</p>
            <p>Role: {s.role}</p>
            <p>Legitimacy: {s.legitimacy_score}</p>

            <h3 className="pdf-title" style={{ marginTop: "1rem" }}>
              Upliftment Score: {s.upliftment_score}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
