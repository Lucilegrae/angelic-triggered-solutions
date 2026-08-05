"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type EnvSite =
  Database["public"]["Functions"]["list_environment"]["Returns"][number];

export function EnvironmentRegistry() {
  const [sites, setSites] = useState<EnvSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("list_environment");
      if (error) console.error("Environment Registry RPC error:", error);
      setSites(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Environment Sites…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Environment Sites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sites.map((s) => (
          <a
            key={s.id}
            href={`/portal/environment/profile/${s.id}`}
            className="bg-slate-900 border border-slate-800 p-4 rounded hover:bg-slate-800"
          >
            <h2 className="text-xl font-semibold">{s.site_name}</h2>
            <p className="text-slate-400">Location: {s.location}</p>
            <p className="text-slate-400">Primary Mineral: {s.primary_mineral}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
