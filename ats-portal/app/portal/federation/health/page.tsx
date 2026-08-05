"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

export default function FederationHealthAI() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.rpc("federation_health_ai");
      setRows(data || []);
    }
    load();
  }, []);

  return (
    <CosmicPage>
      <CosmicHeader
        title="Federation Node Health AI"
        subtitle="AI-driven scoring of federation node stability"
      />

      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        {rows.map((r, i) => {
          const score = r.ai_score || 0;
          const color =
            score > 80
              ? "bg-green-600"
              : score > 60
              ? "bg-yellow-600"
              : "bg-red-600";

          return (
            <div key={i} className={`p-4 rounded mb-3 ${color}`}>
              <p className="text-slate-100 font-semibold">{r.node_label}</p>
              <p className="text-slate-200 text-sm">
                AI Score: {score.toFixed(2)}
              </p>
              <p className="text-slate-200 text-sm">
                Health: {r.federation_health}
              </p>
              <p className="text-slate-200 text-sm">
                Trust: {r.trust_index}
              </p>
              <p className="text-slate-200 text-sm">
                Sync: {r.sync_level}
              </p>
            </div>
          );
        })}
      </div>
    </CosmicPage>
  );
}
