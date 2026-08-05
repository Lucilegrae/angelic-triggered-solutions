"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function SpaceSatelliteEngine() {
  const [sats, setSats] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("space_satellite")
        .select("*")
        .order("signal_strength", { ascending: false });

      setSats(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Space & Satellite Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {sats.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.satellite_name}</h3>
            <p>Orbit Type: {s.orbit_type}</p>
            <p>Coverage Area: {s.coverage_area}</p>
            <p>Signal Strength: {s.signal_strength}</p>
            <p>ATS Space Team: {s.ats_space_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
