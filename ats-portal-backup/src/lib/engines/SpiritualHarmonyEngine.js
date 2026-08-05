"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function SpiritualHarmonyEngine() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("spiritual_harmony")
        .select("*")
        .order("harmony_index", { ascending: false });

      setCommunities(data || []);
    })();
  }, []);

  function harmonize(c) {
    if (c.cosmic_alignment < 40) return "Initiate ATS cosmic realignment ceremonies.";
    if (c.unity_score < 50) return "Deploy ATS unity circles and community healing.";
    if (c.spiritual_energy < 60) return "Activate ATS spiritual upliftment programs.";
    return "Community spiritually stable — maintain harmony monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Spiritual Harmony Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {communities.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.community_name}</h3>
            <p>Harmony Index: {c.harmony_index}</p>
            <p>Unity Score: {c.unity_score}</p>
            <p>Spiritual Energy: {c.spiritual_energy}</p>
            <p>Cosmic Alignment: {c.cosmic_alignment}</p>
            <p>ATS Spiritual Team: {c.ats_spiritual_team}</p>
            <p>Recommendation: {harmonize(c)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
