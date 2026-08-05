"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MinistryProfile() {
  const { id } = useParams<{ id: string }>();
  const [ministry, setMinistry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMinistry() {
      const { data, error } = await supabase.rpc("get_ministry_profile", {
        ministry_id: id,
      });

      if (error) {
        console.error("Ministry Profile RPC error:", error);
      }

      setMinistry(data || null);
      setLoading(false);
    }

    loadMinistry();
  }, [id]);

  async function updateStatus(status) {
    const { error } = await supabase.rpc("rpc_update_ministry_status", {
      ministry_id: id,
      new_status: status,
    });

    if (error) {
      console.error("Status update error:", error);
      return;
    }

    // Refresh the page after status update
    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Ministry Profile…</h2>
      </div>
    );
  }

  if (!ministry) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Ministry not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{ministry.name}</h1>

      {/* Core Ministry Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Minister: {ministry.minister}</p>
        <p className="text-slate-300">Deputy Minister: {ministry.deputy_minister}</p>
        <p className="text-slate-300">Permanent Secretary: {ministry.secretary}</p>

        <p className="text-slate-300 mt-2">
          Established: {new Date(ministry.created_at).toLocaleString()}
        </p>

        <p className="text-slate-300 mt-2">
          Status:{" "}
          {ministry.status === "active"
            ? "✔ Active"
            : ministry.status === "suspended"
            ? "⚠ Suspended"
            : "⏳ Pending"}
        </p>
      </div>

      {/* Cross‑Module Federation */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Cross‑Module Links</h2>

        {ministry.institution_id && (
          <p className="text-slate-300">
            Institution:{" "}
            <a
              href={`/portal/institutions/${ministry.institution_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Institution →
            </a>
          </p>
        )}

        {ministry.stakeholder_id && (
          <p className="text-slate-300 mt-2">
            Stakeholder:{" "}
            <a
              href={`/portal/stakeholders/${ministry.stakeholder_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Stakeholder →
            </a>
          </p>
        )}

        {ministry.ledger_id && (
          <p className="text-slate-300 mt-2">
            Ledger Entry:{" "}
            <a
              href={`/portal/ledger/${ministry.ledger_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Ledger →
            </a>
          </p>
        )}

        {ministry.procurement_id && (
          <p className="text-slate-300 mt-2">
            Procurement:{" "}
            <a
              href={`/portal/procurement/${ministry.procurement_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Procurement →
            </a>
          </p>
        )}

        {ministry.mechanisation_id && (
          <p className="text-slate-300 mt-2">
            Mechanisation:{" "}
            <a
              href={`/portal/mechanisation/${ministry.mechanisation_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Mechanisation →
            </a>
          </p>
        )}

        {ministry.gnss_job_id && (
          <p className="text-slate-300 mt-2">
            GNSS Job:{" "}
            <a
              href={`/portal/gnss/${ministry.gnss_job_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View GNSS Job →
            </a>
          </p>
        )}
      </div>

      {/* Status Controls */}
      {ministry.status !== "active" && (
        <div className="flex gap-3 mb-6">
          <button
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
            onClick={() => updateStatus("active")}
          >
            Activate Ministry
          </button>

          <button
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
            onClick={() => updateStatus("suspended")}
          >
            Suspend Ministry
          </button>
        </div>
      )}

      {/* Back Link */}
      <a
        href="/portal/ministry"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to Ministry Intelligence →
      </a>
    </div>
  );
}
