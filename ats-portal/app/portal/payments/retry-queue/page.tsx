"use client";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";
import { supabase } from "@/lib/supabaseClient";

export default function RetryQueue() {
  useStaffGuard();

  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQueue() {
      const { data, error } = await supabase
        .from("payment_jobs")
        .select("*")
        .eq("status", "retrying");

      if (error) {
        console.error("Retry Queue RPC error:", error);
      }

      setQueue(data || []);
      setLoading(false);
    }

    loadQueue();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Retry Queue…</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Retry Queue</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {queue.map((job) => (
          <div
            key={job.id}
            className="bg-slate-900 p-4 rounded border border-slate-800"
          >
            <a
              href={`/portal/payments/${job.id}`}
              className="block hover:text-blue-300"
            >
              <h2 className="text-xl font-semibold">
                {job.channel?.toUpperCase()} • {job.reference}
              </h2>
            </a>

            <p className="text-slate-300 mt-2">
              Amount: {job.amount} {job.currency}
            </p>

            <p className="text-slate-300 mt-2">
              Status: {job.status}
            </p>

            <p className="text-slate-300 mt-2">
              Retry Count: {job.retry_count}
            </p>

            {job.last_error && (
              <p className="text-red-400 mt-2">
                Last Error: {job.last_error}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
