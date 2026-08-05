"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

type VitalityRow = {
  node_label: string;
  federation_health: number;
  trust_index: number;
  sync_level: number;
  heartbeat_count: number;
  last_heartbeat: string | null;
  vitality_score: number;
};

export default function FederationVitalityAI() {
  const [rows, setRows] = useState<VitalityRow[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("federation_vitality_ai");
      if (error) console.error(error);
      setRows(data || []);
    }
    load();
  }, []);

  return (
    <CosmicPage>
      <CosmicHeader
        title="Federation Vitality AI"
        subtitle="AI‑driven assessment of ATS Federation life force"
      />

      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        {rows.map((r) => {
          const score = r.vitality_score || 0;
          const color =
            score > 80 ? "bg-green-600" :
            score > 60 ? "bg-yellow-600" :
            "bg-red-600";

          return (
            <div key={r.node_label} className={`p-4 rounded mb-3 ${color}`}>
              <p className="text-slate-100 font-semibold">{r.node_label}</p>
              <p className="text-slate-200 text-sm">
                Vitality: {score.toFixed(2)}
              </p>
              <p className="text-slate-200 text-sm">
                Health: {r.federation_health} | Trust: {r.trust_index} | Sync: {r.sync_level}
              </p>
              <p className="text-slate-200 text-sm">
                Heartbeats: {r.heartbeat_count} | Last: {r.last_heartbeat || "—"}
              </p>
            </div>
          );
        })}
      </div>
    </CosmicPage>
  );
}
