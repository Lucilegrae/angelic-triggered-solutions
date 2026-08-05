"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function align(row) {
  const { harmony_level, integration_strength, dimensional_stability, omniversal_identity } = row;

  if (harmony_level < 50) return "Increase alignment rituals and universal harmony practices.";
  if (integration_strength < 50) return "Strengthen integration between national and cosmic principles.";
  if (dimensional_stability < 50) return "Stabilize civilizational trajectory and emotional climate.";
  if (omniversal_identity < 50) return "Deepen Zimbabwe’s universal role and cultural expression.";
  return "Omniversal integration stable — maintain monitoring.";
}

export default function OmniversalIntegrationEngine() {
  const [axes, setAxes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("omniversal_integration")
        .select("*")
        .order("harmony_level", { ascending: false });

      setAxes(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Omniversal Integration Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {axes.map((a) => (
          <div key={a.id} className="pdf-card">
            <h3 className="pdf-title">{a.axis}</h3>
            <p>Harmony Level: {a.harmony_level}</p>
            <p>Integration Strength: {a.integration_strength}</p>
            <p>Dimensional Stability: {a.dimensional_stability}</p>
            <p>Omniversal Identity: {a.omniversal_identity}</p>
            <p>ATS Omniversal Team: {a.ats_omniversal_team}</p>
            <p>Alignment Protocol: {align(a)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
