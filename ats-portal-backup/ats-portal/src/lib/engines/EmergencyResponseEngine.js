"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function EmergencyResponseEngine() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("emergency_incidents")
        .select("*")
        .order("reported_at", { ascending: false });

      setIncidents(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Emergency Response Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {incidents.map((i) => (
          <div key={i.id} className="pdf-card">
            <h3 className="pdf-title">{i.incident_type}</h3>
            <p>Community: {i.community_name}</p>
            <p>Severity: {i.severity}</p>
            <p>Status: {i.status}</p>
            <p>Reported: {new Date(i.reported_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
