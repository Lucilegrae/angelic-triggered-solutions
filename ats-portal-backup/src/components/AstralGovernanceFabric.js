"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AstralGovernanceFabric() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_astral_fabric");
      if (!error && data) setThreads(data);
    })();
  }, []);

  if (!threads.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Astral Governance Fabric ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting astral governance threads…</p>
      </div>
    );
  }

  const width = 900;
  const height = 500;

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Astral Governance Fabric ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Astral-level mapping of governance flows, influence vectors, and cosmic policy currents.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">
          {threads.map((t, i) => (
            <g key={i}>
              <circle
                cx={t.x_pos}
                cy={t.y_pos}
                r={8}
                fill="#a855f7"
              />
              <text
                x={t.x_pos + 12}
                y={t.y_pos + 4}
                fill="#ffffff"
                fontSize="11"
              >
                {t.node_label}
              </text>
            </g>
          ))}

          {threads.map((t, i) =>
            threads.map((u, j) => {
              if (i === j) return null;
              if (t.link_to === u.node_label) {
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={t.x_pos}
                    y1={t.y_pos}
                    x2={u.x_pos}
                    y2={u.y_pos}
                    stroke="rgba(168,85,247,0.5)"
                    strokeWidth="1"
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        <div className="mt-4 text-slate-300 text-xs">
          {threads.map((t, i) => (
            <div key={i} className="flex justify-between">
              <span>{t.node_label}</span>
              <span>Arc: {t.arc_label}</span>
              <span>Influence: {t.influence_index}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
