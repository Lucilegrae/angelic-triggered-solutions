"use client";

import { useEffect, useState } from "react";
import { listLandAllocations } from "./supabaseClient";

export default function LandAllocationDashboard() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listLandAllocations();
      setAllocations(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Land Allocation Dashboard ✦</h2>

      <div className="pdf-dashboard-grid">
        {allocations.map((l) => (
          <div key={l.id} className="pdf-card">
            <h3 className="pdf-title">{l.community_name}</h3>
            <p>Hectares Allocated: {l.hectares_allocated}</p>
            <p>Allocation Date: {l.allocation_date}</p>
            <p>Status: {l.allocation_status}</p>
            <p>Ministry: {l.ministry}</p>
            <p>ATS Verified: {l.ats_verified ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
