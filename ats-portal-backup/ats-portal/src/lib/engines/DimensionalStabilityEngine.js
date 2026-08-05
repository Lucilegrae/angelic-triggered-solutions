"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function DimensionalStabilityEngine() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_dimensional_stability");
      if (!error && data) setNodes(data);
    })();
  }, []);

  if (!nodes.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Dimensional Stability Engine ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting stability field data…</p>
      </div>
    );
  }

  const width = 900;
  const height = 500;

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Dimensional Stability Engine ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Real-time mapping of dimensional coherence, harmonic drift, and astral pressure fields.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">
          {nodes.map((n, i) => {
            const color =
              n.stability_index > 90 ? "#22c55e" :
              n.coherence_index > 90 ? "#0ea5e9" :
              n.drift_index < 10 ? "#facc15" :
              "#64748b";

            return (
              <g key={i}>
                <circle
                  cx={n.x_pos}
                  cy={n.y_pos}
                  r="10"
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={n.x_pos + 14}
                  y={n.y_pos + 4}
                  fill="#ffffff"
                  fontSize="12"
                >
                  {n.node_label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-4 text-slate-300 text-xs">
          {nodes.map((n, i) => (
            <div key={i} className="flex justify-between">
              <span>{n.node_label}</span>
              <span>Stability: {n.stability_index}%</span>
              <span>Coherence: {n.coherence_index}%</span>
              <span>Drift: {n.drift_index}%</span>
              <span>Pressure: {n.pressure_index}%</span>
              <span>Arc: {n.arc_label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
