"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function WorkforceIntelligenceEngine() {
  const [workforce, setWorkforce] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("workforce_intelligence")
        .select("*")
        .order("sector", { ascending: true });

      setWorkforce(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Workforce Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {workforce.map((w) => (
          <div key={w.id} className="pdf-card">
            <h3 className="pdf-title">{w.sector}</h3>
            <p>Skill: {w.skill}</p>
            <p>Workers: {w.workers}</p>
            <p>Shortage: {w.shortage ? "Yes" : "No"}</p>
            <p>ATS Deployed: {w.ats_deployed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
