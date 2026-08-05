"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function FarmerProfile() {
  const { id } = useParams<{ id: string }>();
  const [farmer, setFarmer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFarmer() {
      const { data, error } = await supabase.rpc("get_procurement_farmer", {
        farmer_id: id,
      });

      if (error) {
        console.error("Farmer Profile RPC error:", error);
      }

      setFarmer(data || null);
      setLoading(false);
    }

    loadFarmer();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Farmer Profile…</h2>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Farmer not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{farmer.name}</h1>

      {/* Core Farmer Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Phone: {farmer.phone}</p>
        <p className="text-slate-300">Community: {farmer.community_name}</p>
        <p className="text-slate-300 mt-2">
          Joined: {new Date(farmer.created_at).toLocaleString()}
        </p>
      </div>

      {/* Performance Stats */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Performance Stats</h2>

        <p className="text-slate-300">Total Deliveries: {farmer.total_deliveries}</p>
        <p className="text-slate-300">Total Intake: {farmer.total_intake} kg</p>
        <p className="text-slate-300">Daily Average: {farmer.daily_average} kg</p>
      </div>

      {/* Coordinators Linked to Farmer */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Coordinators</h2>

        {farmer.coordinators && farmer.coordinators.length > 0 ? (
          <ul className="list-disc list-inside text-slate-400">
            {farmer.coordinators.map((c) => (
              <li key={c.id}>
                <a
                  href={`/portal/procurement/coordinator/${c.id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {c.name} — {c.total_kg} kg handled
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No coordinators linked.</p>
        )}
      </div>

      {/* Cross‑Module Federation */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Cross‑Module Links</h2>

        {farmer.community_id && (
          <p className="text-slate-300">
            Community:{" "}
            <a
              href={`/portal/communities/${farmer.community_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Community →
            </a>
          </p>
        )}

        {farmer.institution_id && (
          <p className="text-slate-300 mt-2">
            Institution:{" "}
            <a
              href={`/portal/institutions/${farmer.institution_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Institution →
            </a>
          </p>
        )}

        {farmer.ledger_id && (
          <p className="text-slate-300 mt-2">
            Ledger Entry:{" "}
            <a
              href={`/portal/ledger/${farmer.ledger_id}`}
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
