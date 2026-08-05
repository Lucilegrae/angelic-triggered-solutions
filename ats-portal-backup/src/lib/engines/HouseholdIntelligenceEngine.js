"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function HouseholdIntelligenceEngine() {
  const [households, setHouseholds] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("household_intelligence")
        .select("*")
        .order("community_name", { ascending: true });

      setHouseholds(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Household‑Level Intelligence Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {households.map((h) => (
          <div key={h.id} className="pdf-card">
            <h3 className="pdf-title">{h.community_name}</h3>
            <p>Household: {h.household_code}</p>
            <p>Water Access: {h.water_access ? "Yes" : "No"}</p>
            <p>Sanitation Access: {h.sanitation_access ? "Yes" : "No"}</p>
            <p>Food Security: {h.food_security}</p>
            <p>ATS Support: {h.ats_support}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
