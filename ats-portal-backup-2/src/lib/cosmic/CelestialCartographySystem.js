"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CelestialCartographySystem() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_celestial_map");
      if (!error && data) setStars(data);
    })();
  }, []);

  if (!stars.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Celestial Cartography System ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting celestial mapping data…</p>
      </div>
    );
  }

  const width = 900;
  const height = 500;

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Celestial Cartography System ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Cosmic mapping of governance constellations and destiny arcs.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">
          {stars.map((s, i) => (
            <g key={i}>
              <circle
                cx={s.x_pos}
                cy={s.y_pos}
                r={s.magnitude || 4}
                fill="#facc15"
              />
              <text
                x={s.x_pos + 10}
                y={s.y_pos + 4}
                fill="#ffffff"
                fontSize="11"
              >
                {s.star_label}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-4 text-slate-300 text-xs">
          {stars.map((s, i) => (
            <div key={i} className="flex justify-between">
              <span>{s.star_label}</span>
              <span>Constellation: {s.constellation_label}</span>
              <span>Arc: {s.arc_label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
