"use client";

import { useEffect, useState } from "react";
import { listCommunityUpliftment } from "./supabaseClient";

export default function CommunityUpliftmentDashboard() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listCommunityUpliftment();
      setCommunities(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Community Upliftment Dashboard ✦</h2>

      <div className="pdf-dashboard-grid">
        {communities.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.community_name}</h3>
            <p>Upliftment Index: {c.upliftment_index}</p>
            <p>Housing Units: {c.housing_units}</p>
            <p>Water Access: {c.water_access ? "Yes" : "No"}</p>
            <p>Sanitation Access: {c.sanitation_access ? "Yes" : "No"}</p>
            <p>ATS Support Level: {c.ats_support_level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
