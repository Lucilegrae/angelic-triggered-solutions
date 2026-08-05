"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CollectiveConsciousnessEngine() {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("collective_consciousness")
        .select("*")
        .order("consciousness_level", { ascending: false });

      setRegions(data || []);
    })();
  }, []);

  function elevate(r) {
    if (r.unity_wave < 40) return "Activate ATS unity resonance ceremonies.";
    if (r.focus_strength < 50) return "Deploy ATS national focus meditations.";
    if (r.emotional_resonance < 60) return "Initiate ATS emotional healing circles.";
    return "Region aligned — maintain consciousness monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Collective Consciousness Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {regions.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.region}</h3>
            <p>Consciousness Level: {r.consciousness_level}</p>
            <p>Unity Wave: {r.unity_wave}</p>
            <p>Focus Strength: {r.focus_strength}</p>
            <p>Emotional Resonance: {r.emotional_resonance}</p>
            <p>ATS Consciousness Team: {r.ats_consciousness_team}</p>
            <p>Recommendation: {elevate(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
