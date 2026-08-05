"use client";

import { useEffect, useState } from "react";
import { listCommunityDevelopment } from "./supabaseClient";

export default function GeoSpatialEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listCommunityDevelopment();
      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Geo‑Spatial Engine ✦</h2>

      <div className="grid grid-cols-3 gap-4">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Lat: {r.latitude || "N/A"}</p>
            <p>Long: {r.longitude || "N/A"}</p>
            <p>Development Score: {r.development_score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
