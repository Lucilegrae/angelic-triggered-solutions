"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function SportsRecreationEngine() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("sports_recreation")
        .select("*")
        .order("attendance", { ascending: false });

      setFacilities(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Sports & Recreation Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {facilities.map((f) => (
          <div key={f.id} className="pdf-card">
            <h3 className="pdf-title">{f.facility_name}</h3>
            <p>Province: {f.province}</p>
            <p>Teams Supported: {f.teams_supported}</p>
            <p>Attendance: {f.attendance}</p>
            <p>ATS Sports Team: {f.ats_sports_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
