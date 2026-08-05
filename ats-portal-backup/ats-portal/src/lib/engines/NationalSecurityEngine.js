"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function NationalSecurityEngine() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("national_security")
        .select("*")
        .order("risk_level", { ascending: false });

      setThreats(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Security Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {threats.map((t) => (
          <div key={t.id} className="pdf-card">
            <h3 className="pdf-title">{t.threat_type}</h3>
            <p>Sector: {t.sector}</p>
            <p>Risk Level: {t.risk_level}</p>
            <p>{t.description}</p>
            <p>ATS Response Ready: {t.ats_response_ready ? "✔️ Yes" : "⚠️ No"}</p>
            <p>Reported: {new Date(t.reported_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
