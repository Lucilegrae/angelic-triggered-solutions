"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

export default function FederationHeatmaps() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.rpc("get_federation_state");
      setNodes(data || []);
    }
    load();
  }, []);

  return (
    <CosmicPage>
      <CosmicHeader
        title="Federation Heatmaps"
        subtitle="Node intensity visualization across ATS Infinity Federation"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((n, i) => {
          const intensity = Math.min(1, n.federation_health / 100);
          return (
            <div
              key={i}
              className="p-4 rounded border border-slate-800"
              style={{
                backgroundColor: `rgba(34,197,94,${intensity})`,
              }}
            >
              <p className="text-slate-100 font-semibold">{n.node_label}</p>
              <p className="text-slate-300 text-sm">
                Health: {n.federation_health}
              </p>
              <p className="text-slate-300 text-sm">
                Trust: {n.trust_index}
              </p>
              <p className="text-slate-300 text-sm">
                Sync: {n.sync_level}
              </p>
            </div>
          );
        })}
      </div>
    </CosmicPage>
  );
}
