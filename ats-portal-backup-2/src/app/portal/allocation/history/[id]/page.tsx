"use client";

import { useEffect, useState } from "react";

export default function AllocationHistoryDetail({ params }: { params: { id: string } }) {
  const [record, setRecord] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecord();
  }, []);

  async function loadRecord() {
    const res = await fetch(`/api/allocation/history/${params.id}`);
    const json = await res.json();

    if (!json.ok) {
      setError(json.error);
      return;
    }

    setRecord(json.record);
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">📜 Allocation History Detail</h1>

      {error && <p className="error-text">{error}</p>}

      {record && (
        <>
          <p><strong>Run Time:</strong> {new Date(record.run_timestamp).toLocaleString()}</p>
          <p><strong>Total Members:</strong> {record.total_members}</p>
          <p><strong>Allocated:</strong> {record.allocated_count}</p>
          <p><strong>Unallocated:</strong> {record.unallocated_count}</p>

          <h3 className="aura-heading">Allocation Map</h3>

          <pre className="allocation-json">
            {JSON.stringify(record.allocation, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
