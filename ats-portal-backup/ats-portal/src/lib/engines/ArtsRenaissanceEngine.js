"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ArtsRenaissanceEngine() {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("arts_renaissance")
        .select("*")
        .order("creativity_index", { ascending: false });

      setDomains(data || []);
    })();
  }, []);

  function ignite(d) {
    if (d.creativity_index > 70) return "Expand ATS arts funding and global showcases.";
    if (d.renaissance_strength < 50) return "Deploy ATS cultural revival programs.";
    if (d.artists_active < 20) return "Increase ATS artist support and training.";
    return "Domain stable — maintain arts monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Creativity & Arts Renaissance Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {domains.map((d) => (
          <div key={d.id} className="pdf-card">
            <h3 className="pdf-title">{d.domain}</h3>
            <p>Creativity Index: {d.creativity_index}</p>
            <p>Active Artists: {d.artists_active}</p>
            <p>Renaissance Strength: {d.renaissance_strength}</p>
            <p>ATS Arts Team: {d.ats_arts_team}</p>
            <p>Recommendation: {ignite(d)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
