"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function EthicsIntegrityEngine() {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("ethics_integrity")
        .select("*")
        .order("integrity_score", { ascending: false });

      setInstitutions(data || []);
    })();
  }, []);

  function improve(i) {
    if (i.corruption_risk > 70) return "Deploy ATS integrity audit teams immediately.";
    if (i.transparency_index < 50) return "Increase public reporting and open‑data dashboards.";
    if (i.integrity_score < 60) return "Implement ATS ethics training and compliance automation.";
    return "Institution stable — maintain monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Ethics & Integrity Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {institutions.map((i) => (
          <div key={i.id} className="pdf-card">
            <h3 className="pdf-title">{i.institution_name}</h3>
            <p>Integrity Score: {i.integrity_score}</p>
            <p>Transparency Index: {i.transparency_index}</p>
            <p>Corruption Risk: {i.corruption_risk}</p>
            <p>ATS Integrity Team: {i.ats_integrity_team}</p>
            <p>Recommendation: {improve(i)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
