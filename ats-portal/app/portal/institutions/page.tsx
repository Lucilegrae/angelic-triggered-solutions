"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function InstitutionsModule() {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInstitutions() {
      const { data, error } = await supabase.rpc("list_institutions");

      if (error) {
        console.error("Institutions RPC error:", error);
      }

      setInstitutions(data || []);
      setLoading(false);
    }

    loadInstitutions();
  }, []);

  async function updateStatus(id, status) {
    await supabase.rpc("rpc_update_institution_status", {
      institution_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Institutions…</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Institutions Registry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {institutions.map((inst) => (
          <div
            key={inst.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h2 className="text-xl font-semibold">{inst.name}</h2>

            <p className="text-slate-400 mt-2">Type: {inst.type}</p>
            <p className="text-slate-400">Region: {inst.region}</p>

            {inst.community_name && (
              <p className="text-slate-400">Community: {inst.community_name}</p>
            )}

            <p className="text-slate-400 mt-2">
              Registered: {new Date(inst.created_at).toLocaleString()}
            </p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {inst.status === "active"
                ? "✔ Active"
                : inst.status === "suspended"
                ? "⚠ Suspended"
                : "⏳ Pending"}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                onClick={() => updateStatus(inst.id, "active")}
              >
                Activate
              </button>

              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                onClick={() => updateStatus(inst.id, "suspended")}
              >
                Suspend
              </button>
            </div>

            <a
              href={`/portal/institutions/${inst.id}`}
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
