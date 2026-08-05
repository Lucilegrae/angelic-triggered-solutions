"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AstralPressureMonitor() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_astral_pressure");
      if (!error && data) setNodes(data);
    })();
  }, []);

  if (!nodes.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Astral Pressure Monitor ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting astral pressure data…</p>
      </div>
    );
  }

  const width = 900;
  const height = 500;

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Astral Pressure Monitor ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Astral pressure and resonance mapping across cosmic governance arcs.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">
          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x_pos}
                cy={n.y_pos}
                r="10"
                fill="#ec4899"
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
          ))}
        </svg>

        <div className="mt-4 text-slate-300 text-xs">
          {nodes.map((n, i) => (
            <div key={i} className="flex justify-between">
              <span>{n.node_label}</span>
              <span>Pressure: {n.pressure_index}%</span>
              <span>Resonance: {n.resonance_index}%</span>
              <span>Arc: {n.arc_label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
