"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function strategy(row) {
  const { strength_index, risk_index, acceleration_potential } = row;

  if (risk_index > 70) return "Stabilize this destiny arc — reduce systemic risks.";
  if (strength_index > 70 && acceleration_potential > 60)
    return "Accelerate this destiny arc with ATS flagship programs.";
  if (strength_index < 40) return "Rebuild foundations for this destiny arc.";
  return "Maintain monitoring and incremental support.";
}

export default function DestinyCodexEngine() {
  const [arcs, setArcs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("destiny_codex")
        .select("*")
        .order("strength_index", { ascending: false });

      setArcs(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">

      <h2 className="slogan-arc aura-heading">✦ National Destiny Codex ✦</h2>

      {arcs.length > 0 && (
        <div className="pdf-card mb-6 p-6 bg-slate-900 border border-slate-700 rounded-lg">
          <h3 className="pdf-title mb-2">Destiny Summary</h3>
          <p className="text-slate-300 text-sm">
            Strongest Destiny Arc:{" "}
            <span className="text-indigo-400">{arcs[0].destiny_arc}</span>
          </p>
          <p className="text-slate-300 text-sm">
            Peak Strength Index:{" "}
            <span className="text-indigo-400">{arcs[0].strength_index}%</span>
          </p>
        </div>
      )}

      <div className="pdf-dashboard-grid">
        {arcs.map((a) => (
          <div key={a.id} className="pdf-card">

            <h3 className="pdf-title">{a.destiny_arc}</h3>

            {/* Destiny Strength Ring */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full">
                  <circle cx="50%" cy="50%" r="40%" stroke="#1e293b" strokeWidth="10" fill="none" />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="#6366f1"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * a.strength_index) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-400 font-bold">
                  {a.strength_index}%
                </div>
              </div>
            </div>

            {/* Risk Gradient */}
            <div className="mt-4 mb-4">
              <p className="text-sm mb-1">Risk Index</p>
              <div className="w-full h-2 rounded bg-slate-800">
                <div
                  className="h-2 rounded bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                  style={{ width: `${a.risk_index}%` }}
                />
              </div>
            </div>

            <p>Current Phase: {a.current_phase}</p>
            <p>Risk Index: {a.risk_index}%</p>
            <p>Acceleration Potential: {a.acceleration_potential}%</p>
            <p>ATS Destiny Team: {a.ats_destiny_team}</p>

            <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-indigo-400 font-semibold">Strategy:</span> {strategy(a)}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
