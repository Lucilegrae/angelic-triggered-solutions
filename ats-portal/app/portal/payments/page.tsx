"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type PaymentJob = {
  id: string;
  channel: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  stakeholder_name: string;
  provider?: string;
};

export default function PaymentsModule() {
  const [jobs, setJobs] = useState<PaymentJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      const { data, error } = await supabase.rpc("list_payment_jobs");

      if (error) {
        console.error("Payments RPC error:", error);
      }

      setJobs((data as PaymentJob[]) || []);
      setLoading(false);
    }

    loadJobs();
  }, []);

  async function retryJob(id: string) {
    const { error } = await supabase.rpc("retry_payment_job", { job_id: id });

    if (error) {
      console.error("Retry error:", error);
      return;
    }

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Payment Jobs…</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Payment Orchestration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <a
              href={`/portal/payments/${job.id}`}
              className="block hover:text-blue-300"
            >
              <h2 className="text-xl font-semibold">
                {job.channel.toUpperCase()} • {job.reference}
              </h2>
            </a>

            <p className="text-slate-400 mt-2">
              Stakeholder: {job.stakeholder_name}
            </p>

            <p className="text-slate-400">
              Amount: {job.amount} {job.currency}
            </p>

            <p className="text-slate-400 mt-2">
              Created: {new Date(job.created_at).toLocaleString()}
            </p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {job.status === "success"
                ? "✔ Success"
                : job.status === "failed"
                ? "✖ Failed"
                : job.status === "pending"
                ? "⏳ Pending"
                : job.status === "retrying"
                ? "⏳ Retrying"
                : job.status}
            </p>

            {job.status === "failed" && (
              <button
                className="mt-4 bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                onClick={() => retryJob(job.id)}
              >
                Retry Payment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
