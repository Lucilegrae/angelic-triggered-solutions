"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function recommend(row) {
  const { ascension_level, ethical_frequency, cultural_luminosity, youth_ascension_potential, cosmic_alignment } = row;

  if (ascension_level < 40) return "Deploy ATS ascension upliftment protocols.";
  if (ethical_frequency < 50) return "Strengthen ethics and integrity harmonization.";
  if (cultural_luminosity < 50) return "Ignite cultural renaissance programs.";
  if (youth_ascension_potential < 50) return "Expand youth ascension and skills pathways.";
  if (cosmic_alignment < 50) return "Activate cosmic alignment ceremonies.";
  return "Region ascension field stable — maintain monitoring.";
}

export default function AscensionEngine() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("ascension_engine")
        .select("*")
        .order("ascension_level", { ascending: false });

      setRows(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">

      {/* --- ATS Infinity Header --- */}
      <h2 className="slogan-arc aura-heading">
        ✦ National Ascension Engine ✦
      </h2>

      {/* --- Ascension Summary Panel --- */}
      {rows.length > 0 && (
        <div className="pdf-card mb-6 p-6 bg-slate-900 border border-slate-700 rounded-lg">
          <h3 className="pdf-title mb-2">Ascension Summary</h3>
          <p className="text-slate-300 text-sm">
            Highest Ascension Region: <span className="text-emerald-400">{rows[0].region}</span>
          </p>
          <p className="text-slate-300 text-sm">
            Peak Ascension Level: <span className="text-emerald-400">{rows[0].ascension_level}%</span>
          </p>
        </div>
      )}

      <div className="pdf-dashboard-grid">
        {rows.map((r) => (
          <div key={r.id} className="pdf-card">

            <h3 className="pdf-title">{r.region}</h3>

            {/* --- Ascension Score Ring --- */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="#1e293b"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="#10b981"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * r.ascension_level) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-bold">
                  {r.ascension_level}%
                </div>
              </div>
            </div>

            {/* --- Cosmic Gradient Bar --- */}
            <div className="mt-4 mb-4">
              <p className="text-sm mb-1">Cosmic Alignment</p>
              <div className="w-full h-2 rounded bg-slate-800">
                <div
                  className="h-2 rounded bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500"
                  style={{ width: `${r.cosmic_alignment}%` }}
                />
              </div>
            </div>

            {/* --- Metrics --- */}
            <p>Ethical Frequency: {r.ethical_frequency}%</p>
            <p>Cultural Luminosity: {r.cultural_luminosity}%</p>
            <p>Youth Ascension Potential: {r.youth_ascension_potential}%</p>
            <p>Cosmic Alignment: {r.cosmic_alignment}%</p>
            <p>ATS Ascension Team: {r.ats_ascension_team}</p>

            {/* --- Recommendation --- */}
            <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700">
              <p className="text-sm text-slate-300">
                <span className="text-emerald-400 font-semibold">Recommendation:</span> {recommend(r)}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
