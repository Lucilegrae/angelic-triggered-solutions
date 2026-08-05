"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function heal(row) {
  const { vitality_index, emotional_resonance, unity_field_strength, ancestral_alignment, future_soul_potential } = row;

  if (vitality_index < 40) return "Deploy ATS soul‑energy revitalization programs.";
  if (emotional_resonance < 50) return "Initiate emotional healing and joy‑creation circles.";
  if (unity_field_strength < 50) return "Strengthen unity rituals and community bonding.";
  if (ancestral_alignment < 50) return "Activate ancestral reconnection and heritage ceremonies.";
  if (future_soul_potential < 50) return "Invest in youth spiritual and cultural development.";
  return "Soul‑energy field stable — maintain monitoring.";
}

export default function SoulEnergyEngine() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("soul_energy_intelligence")
        .select("*")
        .order("vitality_index", { ascending: false });

      setRows(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Soul‑Energy Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {rows.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.region}</h3>
            <p>Vitality Index: {r.vitality_index}</p>
            <p>Emotional Resonance: {r.emotional_resonance}</p>
            <p>Unity Field Strength: {r.unity_field_strength}</p>
            <p>Ancestral Alignment: {r.ancestral_alignment}</p>
            <p>Future‑Soul Potential: {r.future_soul_potential}</p>
            <p>ATS Soul Team: {r.ats_soul_team}</p>
            <p>Healing Protocol: {heal(r)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
