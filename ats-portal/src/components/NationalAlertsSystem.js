"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function NationalAlertsSystem() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("ats_alerts")
        .select("*")
        .order("created_at", { ascending: false });

      setAlerts(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS National Alerts System ✦</h2>

      <div className="pdf-dashboard-grid">
        {alerts.map((a) => (
          <div key={a.id} className="pdf-card">
            <h3 className="pdf-title">{a.alert_type}</h3>
            <p>{a.message}</p>
            <p>Severity: {a.severity}</p>
            <p>Community: {a.community_name}</p>
            <p>Time: {new Date(a.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
