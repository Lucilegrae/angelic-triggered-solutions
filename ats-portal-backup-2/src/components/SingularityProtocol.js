"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function SingularityProtocol() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_singularity_index");
      if (!error && data && data[0]) setMetrics(data[0]);
    })();
  }, []);

  if (!metrics) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Singularity Protocol ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting singularity field computation…</p>
      </div>
    );
  }

  const singularity = metrics.singularity_index || 0;

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (circumference * singularity) / 100;

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Singularity Protocol ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Unified civilizational alignment across Ascension, Destiny, Soul‑Energy, and Omniversal fields.
      </p>

      <div className="pdf-card flex flex-col md:flex-row items-center gap-8">
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="40"
                stroke="#1e293b"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="40"
                stroke="#22c55e"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-bold text-2xl">
              {singularity}%
            </div>
          </div>
        </div>

        <div className="text-slate-300 text-sm w-full">
          <p className="mb-2">
            <span className="font-semibold text-emerald-400">Ascension Contribution:</span>{" "}
            {metrics.ascension_contribution}%
          </p>
          <p className="mb-2">
            <span className="font-semibold text-indigo-400">Destiny Contribution:</span>{" "}
            {metrics.destiny_contribution}%
          </p>
          <p className="mb-2">
            <span className="font-semibold text-pink-400">Soul‑Energy Contribution:</span>{" "}
            {metrics.soul_contribution}%
          </p>
          <p className="mb-2">
            <span className="font-semibold text-purple-400">Omniversal Contribution:</span>{" "}
            {metrics.omni_contribution}%
          </p>

          <p className="mt-4 text-xs text-slate-400">
            Singularity Index represents the unified harmonic alignment of Zimbabwe’s civilizational trajectory.
          </p>
        </div>
      </div>
    </div>
  );
}
