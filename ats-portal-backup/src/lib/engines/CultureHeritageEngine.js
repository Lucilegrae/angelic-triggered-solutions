"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CultureHeritageEngine() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("culture_heritage")
        .select("*")
        .order("heritage_level", { ascending: false });

      setSites(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Culture & Heritage Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {sites.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.site_name}</h3>
            <p>Province: {s.province}</p>
            <p>Heritage Level: {s.heritage_level}</p>
            <p>Preservation Status: {s.preservation_status}</p>
            <p>ATS Culture Team: {s.ats_culture_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
