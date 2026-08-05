"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TourismIntelligenceEngine() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("tourism_intelligence")
        .select("*")
        .order("visitors", { ascending: false });

      setSites(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Tourism Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {sites.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.site_name}</h3>
            <p>Province: {s.province}</p>
            <p>Visitors: {s.visitors}</p>
            <p>Revenue: ${s.revenue}</p>
            <p>ATS Tourism Team: {s.ats_tourism_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
