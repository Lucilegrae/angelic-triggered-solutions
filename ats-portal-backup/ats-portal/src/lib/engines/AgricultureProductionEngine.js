"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AgricultureProductionEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("agriculture_production")
        .select("*")
        .order("yield_tonnage", { ascending: false });

      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Agriculture & Production Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Crop: {r.crop_type}</p>
            <p>Yield (Tons): {r.yield_tonnage}</p>
            <p>Livestock: {r.livestock_count}</p>
            <p>Irrigation: {r.irrigation ? "Yes" : "No"}</p>
            <p>ATS Support: {r.ats_support}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
