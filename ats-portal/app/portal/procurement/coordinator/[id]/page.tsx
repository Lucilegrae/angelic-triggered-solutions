"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function CoordinatorProfile() {
  const { id } = useParams<{ id: string }>();
  const [coordinator, setCoordinator] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoordinator() {
      const { data, error } = await supabase.rpc("get_procurement_coordinator", {
        coordinator_id: id,
      });

      if (error) {
        console.error("Coordinator Profile RPC error:", error);
      }

      setCoordinator(data || null);
      setLoading(false);
    }

    loadCoordinator();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Coordinator Profile…</h2>
      </div>
    );
  }

  if (!coordinator) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Coordinator not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{coordinator.name}</h1>

      {/* Core Coordinator Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Phone: {coordinator.phone}</p>
        <p className="text-slate-300">Community: {coordinator.community_name}</p>
        <p className="text-slate-300 mt-2">
          Joined: {new Date(coordinator.created_at).toLocaleString()}
        </p>
      </div>

      {/* Performance Stats */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Performance Stats</h2>

        <p className="text-slate-300">Total Deliveries: {coordinator.total_deliveries}</p>
        <p className="text-slate-300">Total Intake: {coordinator.total_intake} kg</p>
        <p className="text-slate-300">Daily Average: {coordinator.daily_average} kg</p>
      </div>

      {/* Farmers Linked to Coordinator */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Farmers Managed</h2>

        {coordinator.farmers && coordinator.farmers.length > 0 ? (
          <ul className="list-disc list-inside text-slate-400">
            {coordinator.farmers.map((f) => (
              <li key={f.id}>
                <a
                  href={`/portal/stakeholders/${f.id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {f.name} — {f.total_kg} kg
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No farmers linked.</p>
        )}
      </div>

      {/* Cross‑Module Federation */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Cross‑Module Links</h2>

        {coordinator.community_id && (
          <p className="text-slate-300">
            Community:{" "}
            <a
              href={`/portal/communities/${coordinator.community_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Community →
            </a>
          </p>
        )}

        {coordinator.institution_id && (
          <p className="text-slate-300 mt-2">
            Institution:{" "}
            <a
              href={`/portal/institutions/${coordinator.institution_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Institution →
            </a>
          </p>
        )}

        {coordinator.ledger_id && (
          <p className="text-slate-300 mt-2">
            Ledger Entry:{" "}
            <a
              href={`/portal/ledger/${coordinator.ledger_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Ledger →
            </a>
          </p>
        )}
      </div>

      {/* Back Link */}
      <a
        href="/portal/procurement"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to Procurement Intelligence →
      </a>
    </div>
  );
}
