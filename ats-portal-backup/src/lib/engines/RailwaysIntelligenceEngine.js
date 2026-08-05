"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function RailwaysIntelligenceEngine() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("national_railways")
        .select("*")
        .order("cargo_tonnage", { ascending: false });

      setLines(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Railways Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {lines.map((l) => (
          <div key={l.id} className="pdf-card">
            <h3 className="pdf-title">{l.line_name}</h3>
            <p>Province: {l.province}</p>
            <p>Cargo Tonnage: {l.cargo_tonnage}</p>
            <p>Passengers: {l.passengers}</p>
            <p>Maintenance Status: {l.maintenance_status}</p>
            <p>ATS Rail Team: {l.ats_rail_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
