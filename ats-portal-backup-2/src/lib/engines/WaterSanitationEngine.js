"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function WaterSanitationEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("water_sanitation")
        .select("*")
        .order("community_name", { ascending: true });

      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Water & Sanitation Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Water Access: {r.water_access ? "Yes" : "No"}</p>
            <p>Sanitation Access: {r.sanitation_access ? "Yes" : "No"}</p>
            <p>Boreholes: {r.boreholes}</p>
            <p>Pipelines: {r.pipelines}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
