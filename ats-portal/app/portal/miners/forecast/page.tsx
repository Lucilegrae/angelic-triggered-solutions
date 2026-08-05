"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type Forecast =
  Database["public"]["Functions"]["miner_forecast"]["Returns"];

export default function MinerForecast() {
  const [forecast, setForecast] = useState<Forecast | null>(null);

  useEffect(() => {
    async function loadForecast() {
      const { data, error } = await supabase.rpc("miner_forecast");
      if (error) console.error("Forecast RPC error:", error);
      setForecast(data ?? null);
    }
    loadForecast();
  }, []);

  if (!forecast) {
    return <div className="p-6 text-slate-200">Loading Forecast…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Miner Output Forecast</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">30‑Day Forecast</h2>
          <p className="text-3xl mt-2">{forecast.forecast_30d} kg</p>
        </div>

        <div className="bg-slate-900 p-4 rounded border border-slate-800">
          <h2 className="text-xl font-semibold">90‑Day Forecast</h2>
          <p className="text-3xl mt-2">{forecast.forecast_90d} kg</p>
        </div>
      </div>
    </div>
  );
}
