"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type Miner =
  Database["public"]["Functions"]["list_miners"]["Returns"][number];

export function MinersRegistry() {
  const [miners, setMiners] = useState<Miner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMiners() {
      const { data, error } = await supabase.rpc("list_miners");
      if (error) console.error("Miners Registry RPC error:", error);
      setMiners(data ?? []);
      setLoading(false);
    }
    loadMiners();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Miners…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Miners Registry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {miners.map((m) => (
          <a
            key={m.id}
            href={`/portal/miners/${m.id}`}
            className="bg-slate-900 border border-slate-800 p-4 rounded hover:bg-slate-800"
          >
            <h2 className="text-xl font-semibold">{m.name}</h2>
            <p className="text-slate-400">Site: {m.site_name}</p>
            <p className="text-slate-400">Mineral: {m.mineral_type}</p>
            <p className="text-slate-400">Output: {m.total_output_kg} kg</p>
          </a>
        ))}
      </div>
    </div>
  );
}
