"use client";

import { useProcurementRecord } from "@/hooks/api/procurement/useProcurementRecord";
import type { GetProcurementRecordArgs } from "@/types/supabase/rpc";

export default function ProcurementRecordViewer({ record_id }: { record_id: string }) {
  const { call, loading, record, error } = useProcurementRecord();

  async function load() {
    const args: GetProcurementRecordArgs = { record_id };
    call(args);
  }

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🌾 Procurement Record</h3>

      <button onClick={load} className="ats-button" disabled={loading}>
        {loading ? "Loading..." : "Load Record"}
      </button>

      {error && <p className="error-text">{error}</p>}
      {record && (
        <pre className="ats-json">{JSON.stringify(record, null, 2)}</pre>
      )}
    </div>
  );
}
