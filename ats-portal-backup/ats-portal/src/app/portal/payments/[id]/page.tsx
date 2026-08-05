"use client";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentViewer({ params }) {
  useStaffGuard();

  const { id } = params;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryStatus, setRetryStatus] = useState(null);

  useEffect(() => {
    async function loadJob() {
      const { data, error } = await supabase.rpc("get_payment_job", {
        job_id: id,
      });

      if (error) {
        console.error("Payment RPC error:", error);
      }

      setJob(data || null);
      setLoading(false);
    }

    loadJob();
  }, [id]);

  async function retryJob() {
    const { error } = await supabase.rpc("retry_payment_job", {
      job_id: id,
    });

    if (error) {
      console.error("Retry error:", error);
      setRetryStatus({ error: error.message });
      return;
    }

    setRetryStatus({ success: true });
    location.reload();
  }

  if (loading) {
    return <p className="text-slate-400 p-6">Loading payment…</p>;
  }

  if (!job) {
    return <p className="text-red-400 p-6">Payment job not found.</p>;
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      <div className="bg-slate-900 p-4 rounded border border-slate-800 mb-6">
        <p className="text-slate-300">Amount: {job.amount} {job.currency}</p>
        <p className="text-slate-300 mt-2">Provider: {job.provider}</p>
        <p className="text-slate-300 mt-2">Reference: {job.reference}</p>

        <p className="text-slate-300 mt-2">
          Status:{" "}
          {job.status === "success"
            ? "✔ Success"
            : job.status === "failed"
            ? "✖ Failed"
            : job.status === "retrying"
            ? "⏳ Retrying"
            : job.status}
        </p>

        <p className="text-slate-300 mt-2">Retry Count: {job.retry_count}</p>
        <p className="text-slate-300 mt-2">
          Last Error: {job.last_error || "None"}
        </p>

        <p className="text-slate-300 mt-2">
          Created: {new Date(job.created_at).toLocaleString()}
        </p>
        <p className="text-slate-300 mt-2">
          Updated: {new Date(job.updated_at).toLocaleString()}
        </p>
      </div>

      <button
        onClick={retryJob}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
      >
        Retry Payment Job
      </button>

      {retryStatus && (
        <p className="text-green-400 mt-4">
          {retryStatus.success
            ? "Retry queued successfully."
            : `Retry failed: ${retryStatus.error}`}
        </p>
      )}

      <div className="mt-6">
        <a
          href="/portal/payments"
          className="text-blue-400 hover:text-blue-300"
        >
          Back to Payments →
        </a>
      </div>
    </div>
  );
}
