"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function DefenceForcesEngine() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("defence_forces")
        .select("*")
        .order("readiness_level", { ascending: false });

      setUnits(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Defence Forces Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {units.map((u) => (
          <div key={u.id} className="pdf-card">
            <h3 className="pdf-title">{u.unit_name}</h3>
            <p>Branch: {u.branch}</p>
            <p>Readiness Level: {u.readiness_level}</p>
            <p>Personnel: {u.personnel}</p>
            <p>Equipment Status: {u.equipment_status}</p>
            <p>ATS Defence Team: {u.ats_defence_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
