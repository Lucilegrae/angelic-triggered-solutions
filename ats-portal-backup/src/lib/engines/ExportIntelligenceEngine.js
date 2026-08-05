"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ExportIntelligenceEngine() {
  const [exports, setExports] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("export_intelligence")
        .select("*")
        .order("revenue", { ascending: false });

      setExports(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Export Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {exports.map((e) => (
          <div key={e.id} className="pdf-card">
            <h3 className="pdf-title">{e.product}</h3>
            <p>Destination: {e.destination_country}</p>
            <p>Volume: {e.volume_tons} tons</p>
            <p>Revenue: ${e.revenue}</p>
            <p>ATS Verified: {e.ats_verified ? "✔️ Yes" : "⚠️ Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
