"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CybersecurityIntelligenceEngine() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("cybersecurity_intelligence")
        .select("*")
        .order("severity", { ascending: false });

      setThreats(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Cybersecurity Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {threats.map((t) => (
          <div key={t.id} className="pdf-card">
            <h3 className="pdf-title">{t.threat_name}</h3>
            <p>Severity: {t.severity}</p>
            <p>Affected System: {t.affected_system}</p>
            <p>Breach Attempts: {t.breach_attempts}</p>
            <p>ATS Cyber Team: {t.ats_cyber_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
