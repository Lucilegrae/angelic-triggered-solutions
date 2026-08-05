"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AnomalyRow = {
  id: string;
  record_type: string;
  intake_kg: number;
  anomaly_score: number;
};

export default function AnomalyDashboard() {
  const [rows, setRows] = useState<AnomalyRow[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("procurement_anomalies");
      if (error) console.error(error);
      setRows(data || []);
    }
    load();
  }, []);

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Procurement Anomaly Detection</h1>

      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        {rows.map((r) => {
          const score = r.anomaly_score || 0;
          const color =
            score > 3
              ? "bg-red-600"
              : score > 2
              ? "bg-yellow-600"
              : "bg-green-600";

          return (
            <div key={r.id} className={`p-3 rounded mb-2 ${color}`}>
              <p className="text-slate-100">
                {r.record_type} — {r.intake_kg} kg
              </p>
              <p className="text-slate-200 text-sm">
                Anomaly Score: {score.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
