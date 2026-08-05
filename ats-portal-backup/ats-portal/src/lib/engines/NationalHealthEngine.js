"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function NationalHealthEngine() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("national_health")
        .select("*")
        .order("outbreaks", { ascending: false });

      setFacilities(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Health Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {facilities.map((f) => (
          <div key={f.id} className="pdf-card">
            <h3 className="pdf-title">{f.facility_name}</h3>
            <p>Community: {f.community_name}</p>
            <p>Outbreaks: {f.outbreaks}</p>
            <p>Vaccination Rate: {f.vaccination_rate}%</p>
            <p>ATS Health Team: {f.ats_health_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
