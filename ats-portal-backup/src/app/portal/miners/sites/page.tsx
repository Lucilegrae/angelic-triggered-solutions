"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MinerSitesRegistry() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSites() {
      const { data, error } = await supabase.rpc("list_miner_sites");

      if (error) console.error("Miner Sites RPC error:", error);

      setSites(data || []);
      setLoading(false);
    }

    loadSites();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Mining Sites…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Mining Sites Registry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sites.map((s) => (
          <a
            key={s.id}
            href={`/portal/miners/sites/${s.id}`}
            className="bg-slate-900 border border-slate-800 p-4 rounded hover:bg-slate-800"
          >
            <h2 className="text-xl font-semibold">{s.site_name}</h2>

            <p className="text-slate-400 mt-1">Location: {s.location}</p>
            <p className="text-slate-400">Primary Mineral: {s.primary_mineral}</p>

            {s.secondary_minerals?.length > 0 && (
              <p className="text-slate-400">
                Secondary: {s.secondary_minerals.join(", ")}
              </p>
            )}

            <p className="text-slate-300 mt-2">
              Output: {s.total_output_kg} kg
            </p>

            <p className="text-slate-300">
              Active Miners: {s.miner_count}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
