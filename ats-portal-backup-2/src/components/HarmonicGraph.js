"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function HarmonicGraph() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_harmonic_resonance");
      if (!error && data) setPoints(data);
    })();
  }, []);

  if (!points.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Harmonic Graph ✦</h2>
        <p className="text-slate-400 text-sm">No harmonic data yet — waiting for resonance stream.</p>
      </div>
    );
  }

  const width = 800;
  const height = 240;
  const maxY = Math.max(...points.map((p) => p.harmonic_value || 0)) || 1;

  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1 || 1)) * width;
      const y = height - (p.harmonic_value / maxY) * (height - 20);
      return \`\${i === 0 ? "M" : "L"} \${x} \${y}\`;
    })
    .join(" ");

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Harmonic Graph ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Real-time resonance across Ascension, Destiny, Soul‑Energy, and Omniversal fields.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">
          <defs>
            <linearGradient id="harmonicGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          <path
            d={pathD}
            fill="none"
            stroke="url(#harmonicGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {points.map((p, i) => {
            const x = (i / (points.length - 1 || 1)) * width;
            const y = height - (p.harmonic_value / maxY) * (height - 20);
            return (
              <circle
                key={p.id || i}
                cx={x}
                cy={y}
                r={3}
                fill="#22c55e"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        <div className="mt-4 text-slate-300 text-xs">
          {points.map((p) => (
            <div key={p.id} className="flex justify-between">
              <span>{p.label}</span>
              <span>{p.harmonic_value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
