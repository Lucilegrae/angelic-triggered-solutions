"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type GNSS =
  Database["public"]["Functions"]["list_gnss"]["Returns"][number];

export function GNSSRegistry() {
  const [gnss, setGnss] = useState<GNSS[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("list_gnss");
      if (error) console.error("GNSS Registry RPC error:", error);
      setGnss(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading GNSS Devices…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">GNSS Devices</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gnss.map((g) => (
          <a
            key={g.id}
            href={`/portal/gnss/profile/${g.id}`}
            className="bg-slate-900 border border-slate-800 p-4 rounded hover:bg-slate-800"
          >
            <h2 className="text-xl font-semibold">{g.device_name}</h2>
            <p className="text-slate-400">Model: {g.model}</p>
            <p className="text-slate-400">Operator: {g.operator_name}</p>
            <p className="text-slate-400">Last Fix: {g.last_fix}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
