"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function OmniversalPolicyWeave() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_omniversal_policy_weave");
      if (!error && data) setRows(data);
    })();
  }, []);

  if (!rows.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Omniversal Policy Weave ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting policy weave data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Omniversal Policy Weave ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Policy alignment and tension across omniversal governance arcs.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="py-1 text-left">Policy</th>
              <th className="py-1 text-left">Weave</th>
              <th className="py-1 text-left">Arc</th>
              <th className="py-1 text-left">Alignment</th>
              <th className="py-1 text-left">Tension</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{r.policy_label}</td>
                <td className="py-1">{r.weave_label}</td>
                <td className="py-1">{r.arc_label}</td>
                <td className="py-1">{r.alignment_index}%</td>
                <td className="py-1">{r.tension_index}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
