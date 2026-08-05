"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TelecommunicationsEngine() {
  const [towers, setTowers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("telecommunications")
        .select("*")
        .order("bandwidth_mbps", { ascending: false });

      setTowers(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Telecommunications Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {towers.map((t) => (
          <div key={t.id} className="pdf-card">
            <h3 className="pdf-title">{t.tower_name}</h3>
            <p>Province: {t.province}</p>
            <p>Bandwidth: {t.bandwidth_mbps} Mbps</p>
            <p>Outages: {t.outages}</p>
            <p>ATS Telecom Team: {t.ats_telecom_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
