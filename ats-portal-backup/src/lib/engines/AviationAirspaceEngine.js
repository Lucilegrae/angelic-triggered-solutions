"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AviationAirspaceEngine() {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("aviation_airspace")
        .select("*")
        .order("daily_flights", { ascending: false });

      setAirports(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Aviation & Airspace Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {airports.map((a) => (
          <div key={a.id} className="pdf-card">
            <h3 className="pdf-title">{a.airport_name}</h3>
            <p>Province: {a.province}</p>
            <p>Daily Flights: {a.daily_flights}</p>
            <p>Fleet Readiness: {a.fleet_readiness}</p>
            <p>ATS Aviation Team: {a.ats_aviation_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
