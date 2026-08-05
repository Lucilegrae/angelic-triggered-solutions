"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

type SyncRow = {
  node_label: string;
  sync_level: number;
  last_sync_at: string | null;
  is_in_sync: boolean;
  global_sync_index: number;
};

export default function FederationSyncPage() {
  const [rows, setRows] = useState<SyncRow[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("federation_sync_index");
      if (error) console.error(error);
      setRows(data || []);
    }
    load();
  }, []);

  const global =
    rows.length > 0 ? rows[0].global_sync_index.toFixed(2) : "—";

  return (
    <CosmicPage>
      <CosmicHeader
        title="Federation Sync Engine"
        subtitle={`Global Sync Index: ${global}`}
      />

      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        {rows.map((r) => {
          const color = r.is_in_sync ? "bg-green-600" : "bg-red-600";
          return (
            <div key={r.node_label} className={`p-4 rounded mb-3 ${color}`}>
              <p className="text-slate-100 font-semibold">{r.node_label}</p>
              <p className="text-slate-200 text-sm">
                Sync Level: {r.sync_level}
              </p>
              <p className="text-slate-200 text-sm">
                Last Sync: {r.last_sync_at || "—"}
              </p>
              <p className="text-slate-200 text-sm">
                Status: {r.is_in_sync ? "In Sync" : "Out of Sync"}
              </p>
            </div>
          );
        })}
      </div>
    </CosmicPage>
  );
}
