"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ClimateEnvironmentEngine() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("climate_environment")
        .select("*")
        .order("drought_index", { ascending: false });

      setRegions(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Climate & Environment Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {regions.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.region}</h3>
            <p>Rainfall: {r.rainfall_mm} mm</p>
            <p>Drought Index: {r.drought_index}</p>
            <p>Pollution Index: {r.pollution_index}</p>
            <p>ATS Environment Team: {r.ats_environment_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
