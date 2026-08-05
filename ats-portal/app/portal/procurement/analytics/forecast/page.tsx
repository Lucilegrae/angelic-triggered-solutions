"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ForecastRow = {
  date: string;
  predicted: number;
};

export default function ForecastEngine() {
  const [rows, setRows] = useState<ForecastRow[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("procurement_forecast");
      if (error) console.error(error);
      setRows(data || []);
    }
    load();
  }, []);

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Procurement Forecast</h1>

      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        {rows.map((r) => (
          <div
            key={r.date}
            className="flex justify-between text-slate-300 py-1"
          >
            <span>{r.date}</span>
            <span>{r.predicted.toFixed(2)} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
}
