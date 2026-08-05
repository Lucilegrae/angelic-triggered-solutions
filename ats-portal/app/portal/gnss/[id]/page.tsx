"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function GNSSJobProfile() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJob() {
      const { data, error } = await supabase.rpc("get_gnss_job", {
        job_id: id,
      });

      if (error) {
        console.error("GNSS Job Profile RPC error:", error);
      }

      setJob(data || null);
      setLoading(false);
    }

    loadJob();
  }, [id]);

  async function markComplete() {
    await supabase.rpc("rpc_mark_gnss_complete", {
      job_id: id,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading GNSS Job…</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6 text-slate-200">
        <h2>GNSS job not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{job.location_name}</h1>

      {/* Core GNSS Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Operator: {job.operator_name}</p>
        <p className="text-slate-300">Receiver: {job.receiver_type}</p>

        <p className="text-slate-300 mt-2">
          Coordinates: {job.latitude}, {job.longitude}
        </p>

        <p className="text-slate-300">
          Accuracy: ±{job.accuracy_cm} cm
        </p>

        <p className="text-slate-300 mt-2">
          Timestamp: {new Date(job.created_at).toLocaleString()}
        </p>

        <p className="text-slate-300 mt-2">
          Status:{" "}
          {job.status === "complete"
            ? "✔ Complete"
            : "⏳ Pending"}
        </p>
      </div>

      {/* Cross‑Module Federation */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Cross‑Module Links</h2>

        {job.stakeholder_id && (
          <p className="text-slate-300">
            Stakeholder:{" "}
            <a
              href={`/portal/stakeholders/${job.stakeholder_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Stakeholder →
            </a>
          </p>
        )}

        {job.mechanisation_request_id && (
          <p className="text-slate-300 mt-2">
            Mechanisation Request:{" "}
            <a
              href={`/portal/mechanisation/${job.mechanisation_request_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Mechanisation →
            </a>
          </p>
        )}

        {job.insurance_policy_id && (
          <p className="text-slate-300 mt-2">
            Insurance Policy:{" "}
            <a
              href={`/portal/insurance/${job.insurance_policy_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Policy →
            </a>
          </p>
        )}

        {job.ledger_id && (
          <p className="text-slate-300 mt-2">
            Ledger Entry:{" "}
            <a
              href={`/portal/ledger/${job.ledger_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Ledger →
            </a>
          </p>
        )}
      </div>

      {/* Completion Workflow */}
      {job.status === "pending" && (
        <div className="flex gap-3 mb-6">
          <button
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
            onClick={markComplete}
          >
            Mark GNSS Job Complete
          </button>
        </div>
      )}

      {/* Back Link */}
      <a
        href="/portal/gnss"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to GNSS Jobs →
      </a>
    </div>
  );
}
