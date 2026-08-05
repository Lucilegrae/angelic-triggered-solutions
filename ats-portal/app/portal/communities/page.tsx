"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function CommunitiesModule() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommunities() {
      const { data, error } = await supabase.rpc("list_communities");

      if (error) {
        console.error("Communities RPC error:", error);
      }

      setCommunities(data || []);
      setLoading(false);
    }

    loadCommunities();
  }, []);

  async function updateStatus(id, status) {
    await supabase.rpc("rpc_update_community_status", {
      community_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Communities…</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Communities Registry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {communities.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h2 className="text-xl font-semibold">{c.name}</h2>

            <p className="text-slate-400 mt-2">Ward: {c.ward}</p>
            <p className="text-slate-400">District: {c.district}</p>

            {c.institution_name && (
              <p className="text-slate-400">Institution: {c.institution_name}</p>
            )}

            <p className="text-slate-400 mt-2">
              Registered: {new Date(c.created_at).toLocaleString()}
            </p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {c.status === "active"
                ? "✔ Active"
                : c.status === "suspended"
                ? "⚠ Suspended"
                : "⏳ Pending"}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                onClick={() => updateStatus(c.id, "active")}
              >
                Activate
              </button>

              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                onClick={() => updateStatus(c.id, "suspended")}
              >
                Suspend
              </button>
            </div>

            <a
              href={`/portal/communities/${c.id}`}
              className="mt-4 inline-block text-blue-400 hover:text-blue-300"
            >
              View Profile →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
