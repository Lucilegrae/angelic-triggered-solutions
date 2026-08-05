"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type Fusion =
  Database["public"]["Functions"]["gnss_fusion_dashboard"]["Returns"];

export default function GNSSFusionPage() {
  const [fusion, setFusion] = useState<Fusion | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("gnss_fusion_dashboard");
      if (error) console.error("GNSS Fusion RPC error:", error);
      setFusion(data ?? null);
    }
    load();
  }, []);

  if (!fusion) {
    return <div className="p-6 text-slate-200">Loading GNSS Fusion…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Cosmic GNSS Fusion Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">Total Fixes</h2>
          <p className="text-3xl mt-2">{fusion.total_fixes}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">Active Rovers</h2>
          <p className="text-3xl mt-2">{fusion.active_rovers}</p>
        </div>

        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">Baseline Count</h2>
          <p className="text-3xl mt-2">{fusion.baseline_count}</p>
        </div>
      </div>
    </div>
  );
}
