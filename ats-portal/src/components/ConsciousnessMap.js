"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ConsciousnessMap() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_consciousness_map");
      if (!error && data) setNodes(data);
    })();
  }, []);

  if (!nodes.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Consciousness Map ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting consciousness field data…</p>
      </div>
    );
  }

  const width = 900;
  const height = 500;

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Consciousness Map ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Real-time visualization of Zimbabwe’s collective consciousness field.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">

          {nodes.map((n, i) => {
            const x = n.x_pos;
            const y = n.y_pos;

            const vitality = n.vitality_index;
            const unity = n.unity_field_strength;
            const resonance = n.emotional_resonance;

            const color =
              vitality > 70 ? "#22c55e" :
              unity > 70 ? "#6366f1" :
              resonance > 70 ? "#ec4899" :
              "#64748b";

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={12}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y={y + 4}
                  fill="#ffffff"
                  fontSize="12"
                >
                  {n.region}
                </text>
              </g>
            );
          })}

          {nodes.map((n, i) =>
            nodes.map((m, j) => {
              if (i === j) return null;
              if (n.link_to === m.region) {
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={n.x_pos}
                    y1={n.y_pos}
                    x2={m.x_pos}
                    y2={m.y_pos}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                  />
                );
              }
              return null;
            })
          )}

        </svg>

        <div className="mt-4 text-slate-300 text-xs">
          {nodes.map((n) => (
            <div key={n.region} className="flex justify-between">
              <span>{n.region}</span>
              <span>Vitality: {n.vitality_index}</span>
              <span>Unity: {n.unity_field_strength}</span>
              <span>Resonance: {n.emotional_resonance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
