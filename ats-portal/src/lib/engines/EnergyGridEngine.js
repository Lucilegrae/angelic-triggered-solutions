"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function EnergyGridEngine() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("energy_grid")
        .select("*")
        .order("generation_mw", { ascending: false });

      setStations(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Energy & Power Grid Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {stations.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.station_name}</h3>
            <p>Province: {s.province}</p>
            <p>Generation: {s.generation_mw} MW</p>
            <p>Outages: {s.outages}</p>
            <p>ATS Grid Team: {s.ats_grid_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
