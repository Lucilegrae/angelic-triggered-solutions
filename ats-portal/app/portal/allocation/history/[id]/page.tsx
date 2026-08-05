"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AllocationHistoryDetail() {
  const { id } = useParams<{ id: string }>();

  const [record, setRecord] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    loadRecord();
  }, [id]);

  async function loadRecord() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/api/allocation/history/${encodeURIComponent(id)}`
      );

      const json = await res.json();

      if (!json.ok) {
        setError(json.error ?? "Unable to load allocation history.");
        return;
      }

      setRecord(json.record);
    } catch (err) {
      console.error(err);
      setError("Failed to load allocation history.");
    } finally {
      setLoading(false);
    }
  }

  if (!id) {
    return (
      <div className="ats-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">
        📜 Allocation History Detail
      </h1>

      {loading && (
        <p className="text-sm text-slate-400">
          Loading allocation history...
        </p>
      )}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {record && (
        <>
          <p>
            <strong>Run Time:</strong>{" "}
            {new Date(record.run_timestamp).toLocaleString()}
          </p>

          <p>
            <strong>Total Members:</strong>{" "}
            {record.total_members}
          </p>

          <p>
            <strong>Allocated:</strong>{" "}
            {record.allocated_count}
          </p>

          <p>
            <strong>Unallocated:</strong>{" "}
            {record.unallocated_count}
          </p>

          <h3 className="aura-heading">
            Allocation Map
          </h3>

          <pre className="allocation-json">
            {JSON.stringify(record.allocation, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
