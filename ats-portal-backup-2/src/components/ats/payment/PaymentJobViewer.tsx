"use client";

import { usePaymentJob } from "@/hooks/api/payment/usePaymentJob";
import type { GetPaymentJobArgs } from "@/types/supabase/rpc";

export default function PaymentJobViewer({ job_id }: { job_id: string }) {
  const { call, loading, job, error } = usePaymentJob();

  async function load() {
    const args: GetPaymentJobArgs = { job_id };
    call(args);
  }

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">💳 Payment Job</h3>

      <button onClick={load} className="ats-button" disabled={loading}>
        {loading ? "Loading..." : "Load Job"}
      </button>

      {error && <p className="error-text">{error}</p>}
      {job && (
        <pre className="ats-json">{JSON.stringify(job, null, 2)}</pre>
      )}
    </div>
  );
}
