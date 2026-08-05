"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function MaritimePortsEngine() {
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("maritime_ports")
        .select("*")
        .order("cargo_volume", { ascending: false });

      setPorts(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Maritime & Inland Ports Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {ports.map((p) => (
          <div key={p.id} className="pdf-card">
            <h3 className="pdf-title">{p.port_name}</h3>
            <p>Province: {p.province}</p>
            <p>Cargo Volume: {p.cargo_volume}</p>
            <p>Vessel Traffic: {p.vessel_traffic}</p>
            <p>ATS Maritime Team: {p.ats_maritime_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
