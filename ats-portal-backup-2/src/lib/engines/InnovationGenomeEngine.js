"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function InnovationGenomeEngine() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("innovation_genome")
        .select("*")
        .order("creativity_density", { ascending: false });

      setSectors(data || []);
    })();
  }, []);

  function boost(s) {
    if (s.patents > 20) return "Scale ATS innovation hubs and export IP globally.";
    if (s.creativity_density > 70) return "Deploy ATS accelerator programs.";
    if (s.innovation_clusters < 3) return "Establish new ATS innovation clusters.";
    return "Sector stable — maintain innovation monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Innovation Genome ✦</h2>

      <div className="pdf-dashboard-grid">
        {sectors.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.sector}</h3>
            <p>Creativity Density: {s.creativity_density}</p>
            <p>Patents: {s.patents}</p>
            <p>Innovation Clusters: {s.innovation_clusters}</p>
            <p>ATS Genome Team: {s.ats_genome_team}</p>
            <p>Recommendation: {boost(s)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
