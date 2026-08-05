"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MechanisationModule() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      const { data, error } = await supabase.rpc("list_mechanisation_requests");

      if (error) {
        console.error("Mechanisation RPC error:", error);
      }

      setRequests(data || []);
      setLoading(false);
    }

    loadRequests();
  }, []);

  async function updateStatus(id, status) {
    await supabase.rpc("rpc_update_mechanisation_status", {
      req_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Mechanisation Requests…</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Mechanisation Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h2 className="text-xl font-semibold">{req.request_type}</h2>

            <p className="text-slate-400 mt-2">
              Stakeholder: {req.stakeholder_id}
            </p>

            <p className="text-slate-400">
              Description: {req.description}
            </p>

            <p className="text-slate-400 mt-2">
              Submitted: {new Date(req.created_at).toLocaleString()}
            </p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {req.status === "approved"
                ? "✔ Approved"
                : req.status === "rejected"
                ? "✖ Rejected"
                : "⏳ Pending"}
            </p>

            {req.status === "pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                  onClick={() => updateStatus(req.id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                  onClick={() => updateStatus(req.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
