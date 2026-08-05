"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CelestialHarmonicSequencer() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_celestial_harmonic_sequencer");
      if (!error && data) setRows(data);
    })();
  }, []);

  if (!rows.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Celestial Harmonic Sequencer ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting harmonic sequence data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Celestial Harmonic Sequencer ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Harmonic sequencing across cosmic governance arcs.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="py-1 text-left">Sequence</th>
              <th className="py-1 text-left">Arc</th>
              <th className="py-1 text-left">Harmonic</th>
              <th className="py-1 text-left">Coherence</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{r.sequence_label}</td>
                <td className="py-1">{r.arc_label}</td>
                <td className="py-1">{r.harmonic_index}%</td>
                <td className="py-1">{r.coherence_index}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
