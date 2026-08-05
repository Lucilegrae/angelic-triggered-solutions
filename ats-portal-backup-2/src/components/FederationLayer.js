"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function FederationLayer() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_federation_state");
      if (!error && data) setNodes(data);
    })();
  }, []);

  if (!nodes.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Federation Layer ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting federation topology data…</p>
      </div>
    );
  }

  const width = 900;
  const height = 500;

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Federation Layer ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Multi-node federation across ministries, agencies, and omniversal engines.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">

          {nodes.map((n, i) => {
            const x = n.x_pos;
            const y = n.y_pos;

            const health = n.federation_health;
            const trust = n.trust_index;
            const sync = n.sync_level;

            const color =
              health > 80 ? "#22c55e" :
              trust > 80 ? "#6366f1" :
              sync > 80 ? "#ec4899" :
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
                  {n.node_label}
                </text>
              </g>
            );
          })}

          {nodes.map((n, i) =>
            nodes.map((m, j) => {
              if (i === j) return null;
              if (n.link_to === m.node_label) {
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={n.x_pos}
                    y1={n.y_pos}
                    x2={m.x_pos}
                    y2={m.y_pos}
                    stroke="rgba(148,163,184,0.6)"
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
            <div key={n.node_label} className="flex justify-between">
              <span>{n.node_label}</span>
              <span>Health: {n.federation_health}</span>
              <span>Trust: {n.trust_index}</span>
              <span>Sync: {n.sync_level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
