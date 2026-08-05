"use client";

import { useEffect, useState } from "react";
import { listLandAllocations } from "./supabaseClient";

export default function LandGeoMap() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listLandAllocations();
      setAllocations(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Land Allocation Geo‑Map ✦</h2>

      <div className="grid grid-cols-3 gap-4">
        {allocations.map((l) => (
          <div key={l.id} className="pdf-card">
            <h3 className="pdf-title">{l.community_name}</h3>
            <p>Hectares: {l.hectares_allocated}</p>
            <p>Status: {l.allocation_status}</p>
            <p>ATS Verified: {l.ats_verified ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
