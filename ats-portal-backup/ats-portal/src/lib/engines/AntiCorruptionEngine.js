"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AntiCorruptionEngine() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("anti_corruption")
        .select("*")
        .order("risk_score", { ascending: false });

      setCases(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Anti‑Corruption Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {cases.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.case_title}</h3>
            <p>Sector: {c.sector}</p>
            <p>Risk Score: {c.risk_score}</p>
            <p>Status: {c.status}</p>
            <p>ATS Investigator: {c.ats_investigator}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
