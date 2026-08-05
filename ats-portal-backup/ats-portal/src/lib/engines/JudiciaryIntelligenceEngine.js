"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function JudiciaryIntelligenceEngine() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("judiciary_intelligence")
        .select("*")
        .order("legal_risk", { ascending: false });

      setCases(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Judiciary & Legal Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {cases.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.case_title}</h3>
            <p>Court Level: {c.court_level}</p>
            <p>Judge: {c.judge}</p>
            <p>Status: {c.status}</p>
            <p>Legal Risk: {c.legal_risk}</p>
            <p>ATS Legal Analysis: {c.ats_legal_analysis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
