"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type ESG =
  Database["public"]["Functions"]["environment_esg_dashboard"]["Returns"];

export default function ESGDashboardPage() {
  const [esg, setEsg] = useState<ESG | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("environment_esg_dashboard");
      if (error) console.error("ESG Dashboard RPC error:", error);
      setEsg(data ?? null);
    }
    load();
  }, []);

  if (!esg) {
    return <div className="p-6 text-slate-200">Loading ESG Dashboard…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-3xl font-bold mb-6">ESG Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">Emissions Score</h2>
          <p className="text-3xl mt-2">{esg.emissions_score}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">Water Impact</h2>
          <p className="text-3xl mt-2">{esg.water_impact}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">Community Score</h2>
          <p className="text-3xl mt-2">{esg.community_score}</p>
        </div>
      </div>
    </div>
  );
}
