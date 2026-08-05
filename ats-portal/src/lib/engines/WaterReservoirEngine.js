"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function WaterReservoirEngine() {
  const [reservoirs, setReservoirs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("water_reservoirs")
        .select("*")
        .order("water_level_percent", { ascending: false });

      setReservoirs(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Water Reservoir Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {reservoirs.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.reservoir_name}</h3>
            <p>Province: {r.province}</p>
            <p>Water Level: {r.water_level_percent}%</p>
            <p>Inflow Rate: {r.inflow_rate}</p>
            <p>Outflow Rate: {r.outflow_rate}</p>
            <p>ATS Water Team: {r.ats_water_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
