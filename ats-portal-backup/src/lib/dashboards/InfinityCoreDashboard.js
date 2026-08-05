"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function InfinityCoreDashboard() {
  const [ascension, setAscension] = useState(null);
  const [destiny, setDestiny] = useState(null);
  const [soul, setSoul] = useState(null);
  const [omni, setOmni] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: asc } = await supabase
        .from("ascension_engine")
        .select("*")
        .order("ascension_level", { ascending: false })
        .limit(1);

      const { data: des } = await supabase
        .from("destiny_codex")
        .select("*")
        .order("strength_index", { ascending: false })
        .limit(1);

      const { data: sou } = await supabase
        .from("soul_energy_intelligence")
        .select("*")
        .order("vitality_index", { ascending: false })
        .limit(1);

      const { data: omn } = await supabase
        .from("omniversal_integration")
        .select("*")
        .order("harmony_level", { ascending: false })
        .limit(1);

      setAscension(asc?.[0] || null);
      setDestiny(des?.[0] || null);
      setSoul(sou?.[0] || null);
      setOmni(omn?.[0] || null);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Core Dashboard ✦</h2>

      <div className="pdf-dashboard-grid">

        {/* ASCENSION */}
        {ascension && (
          <div className="pdf-card">
            <h3 className="pdf-title">Ascension</h3>
            <p>Region: {ascension.region}</p>
            <p>Ascension Level: {ascension.ascension_level}%</p>
            <p>Ethical Frequency: {ascension.ethical_frequency}%</p>
            <p>Cosmic Alignment: {ascension.cosmic_alignment}%</p>
          </div>
        )}

        {/* DESTINY */}
        {destiny && (
          <div className="pdf-card">
            <h3 className="pdf-title">Destiny Codex</h3>
            <p>Arc: {destiny.destiny_arc}</p>
            <p>Strength Index: {destiny.strength_index}%</p>
            <p>Risk Index: {destiny.risk_index}%</p>
            <p>Acceleration Potential: {destiny.acceleration_potential}%</p>
          </div>
        )}

        {/* SOUL ENERGY */}
        {soul && (
          <div className="pdf-card">
            <h3 className="pdf-title">Soul‑Energy</h3>
            <p>Region: {soul.region}</p>
            <p>Vitality Index: {soul.vitality_index}%</p>
            <p>Emotional Resonance: {soul.emotional_resonance}%</p>
            <p>Unity Field Strength: {soul.unity_field_strength}%</p>
          </div>
        )}

        {/* OMNIVERSAL */}
        {omni && (
          <div className="pdf-card">
            <h3 className="pdf-title">Omniversal Integration</h3>
            <p>Axis: {omni.axis}</p>
            <p>Harmony Level: {omni.harmony_level}%</p>
            <p>Dimensional Stability: {omni.dimensional_stability}%</p>
            <p>Omniversal Identity: {omni.omniversal_identity}%</p>
          </div>
        )}

      </div>
    </div>
  );
}
