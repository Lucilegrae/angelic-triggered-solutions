"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MinerClaimsRegistry() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClaims() {
      const { data, error } = await supabase.rpc("list_miner_claims");

      if (error) console.error("Miner Claims RPC error:", error);

      setClaims(data || []);
      setLoading(false);
    }

    loadClaims();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Miner Claims…</div>;
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Miner Claims</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {claims.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h2 className="text-xl font-semibold">{c.claim_title}</h2>

            <p className="text-slate-400 mt-2">Miner: {c.miner_name}</p>
            <p className="text-slate-400">Mineral: {c.mineral_type}</p>
            <p className="text-slate-400">Output Loss: {c.loss_kg} kg</p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {c.status === "approved"
                ? "✔ Approved"
                : c.status === "rejected"
                ? "✖ Rejected"
                : "⏳ Pending"}
            </p>

            <a
              href={`/portal/miners/claims/${c.id}`}
              className="mt-4 inline-block text-blue-400 hover:text-blue-300"
            >
              View Claim →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
