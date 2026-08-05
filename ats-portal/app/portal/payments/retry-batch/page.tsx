"use client";

import { useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function RetryBatchExecutor() {
  useStaffGuard();

  const [result, setResult] = useState<any>(null);

  async function runBatch() {
    const res = await fetch("/api/payments/retry-batch", { method: "POST" });
    const data = await res.json();
    setResult(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Retry Batch Executor</h2>

      <button
        onClick={runBatch}
        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white"
      >
        Run Retry Batch
      </button>

      {result && (
        <pre className="mt-4 bg-slate-900 p-4 rounded border border-slate-800 text-slate-300">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
