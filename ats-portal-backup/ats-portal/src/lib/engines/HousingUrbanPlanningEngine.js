"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function HousingUrbanPlanningEngine() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("housing_urban_planning")
        .select("*")
        .order("density", { ascending: false });

      setAreas(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Housing & Urban Planning Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {areas.map((a) => (
          <div key={a.id} className="pdf-card">
            <h3 className="pdf-title">{a.community_name}</h3>
            <p>Housing Units: {a.housing_units}</p>
            <p>Density: {a.density}</p>
            <p>Expansion Zone: {a.expansion_zone ? "Yes" : "No"}</p>
            <p>ATS Planning Team: {a.ats_planning_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
