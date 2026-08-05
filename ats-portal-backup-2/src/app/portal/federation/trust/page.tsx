"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

export default function FederationTrustMatrix() {
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
        title="Federation Trust Matrix"
        subtitle="Inter-node trust visualization across ATS Infinity Federation"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((n, i) => {
          const trustColor =
            n.trust_index > 80
              ? "bg-green-600"
              : n.trust_index > 60
              ? "bg-yellow-600"
              : "bg-red-600";

          return (
            <div
              key={i}
              className={`p-4 rounded border border-slate-800 ${trustColor}`}
            >
              <p className="text-slate-100 font-semibold">{n.node_label}</p>
              <p className="text-slate-200 text-sm">
                Trust Index: {n.trust_index}
              </p>
              <p className="text-slate-200 text-sm">
                Federation Health: {n.federation_health}
              </p>
              <p className="text-slate-200 text-sm">
                Sync Level: {n.sync_level}
              </p>
            </div>
          );
        })}
      </div>
    </CosmicPage>
  );
}
