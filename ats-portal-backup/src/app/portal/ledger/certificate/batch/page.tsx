"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function LedgerCertificateBatch() {
  const [ids, setIds] = useState("");
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  async function generateBatch() {
    setProcessing(true);

    const idList = ids
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x));

    const { data, error } = await supabase.rpc("generate_ledger_certificate_batch", {
      ledger_ids: idList,
    });

    if (error) {
      console.error("Batch Certificate RPC error:", error);
      setResult({ error: true, message: error.message });
    } else {
      setResult({ error: false, certificates: data });
    }

    setProcessing(false);
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">

      <h1 className="text-2xl font-bold mb-6">Ledger Certificate Batch Generator</h1>

      {/* Input */}
      <div className="mb-4">
        <label className="block mb-1 text-slate-300">
          Ledger Entry IDs (comma-separated)
        </label>
        <textarea
          className="w-full p-2 rounded bg-slate-800 border border-slate-700"
          value={ids}
          onChange={(e) => setIds(e.target.value)}
          placeholder="Example: 12, 15, 22, 30"
        />
      </div>

      {/* Submit */}
      <button
        onClick={generateBatch}
        disabled={processing}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
      >
        {processing ? "Generating…" : "Generate Certificates"}
      </button>

      {/* Results */}
      {result && (
        <div
          className={`mt-4 p-3 rounded ${
            result.error ? "bg-red-800" : "bg-green-800"
          }`}
        >
          {result.error ? (
            <p>{result.message}</p>
          ) : (
            <>
              <p className="mb-2">Certificates Generated:</p>
              <ul className="list-disc list-inside text-slate-300">
                {result.certificates.map((c) => (
                  <li key={c.id}>
                    Certificate {c.id} —{" "}
                    <a
                      href={`/portal/ledger/certificate/${c.id}`}
                      className="text-blue-300 underline"
                    >
                      View →
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Back */}
      <a
        href="/portal/ledger"
        className="inline-block text-blue-400 hover:text-blue-300 mt-6"
      >
        Back to Ledger Registry →
      </a>
    </div>
  );
}
