"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CosmicTimelineEngine() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_cosmic_timeline");
      if (!error && data) setEvents(data);
    })();
  }, []);

  if (!events.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Cosmic Timeline Engine ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting cosmic timeline data…</p>
      </div>
    );
  }

  const colors = {
    ascension: "#22c55e",
    destiny: "#6366f1",
    soul: "#ec4899",
    omniversal: "#a855f7",
    harmonic: "#0ea5e9",
    singularity: "#facc15",
  };

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Cosmic Timeline Engine ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Chronological evolution of Zimbabwe’s civilizational trajectory.
      </p>

      <div className="pdf-card p-6">
        <div className="relative border-l border-slate-700 pl-6">

          {events.map((e, i) => (
            <div key={i} className="mb-8 relative">
              <div
                className="absolute -left-3 w-6 h-6 rounded-full border border-white"
                style={{ backgroundColor: colors[e.event_type] || "#64748b" }}
              ></div>

              <h3 className="text-lg font-semibold text-slate-200">
                {e.title}
              </h3>

              <p className="text-slate-400 text-sm mb-1">{e.date_label}</p>

              <p className="text-slate-300 text-sm">
                {e.description}
              </p>

              <div className="mt-2 text-xs text-slate-500">
                Impact Level: {e.impact_level}%
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
