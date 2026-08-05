"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type PayoutResult =
  Database["public"]["Functions"]["miner_payout"]["Returns"];

export default function MinerPayout() {
  const [result, setResult] = useState<PayoutResult | null>(null);

  async function calculate(formData: FormData) {
    const purity = Number(formData.get("purity"));
    const risk = Number(formData.get("risk"));

    const { data, error } = await supabase.rpc("miner_payout", {
      purity,
      risk,
    });

    if (error) {
      setResult({ error: error.message } as PayoutResult);
      return;
    }

    setResult(data ?? null);
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Miner Payout Calculator</h1>

      <form action={calculate} className="space-y-4">
        <input name="purity" type="number" placeholder="Purity %" className="bg-slate-800 p-2 rounded w-full" />
        <input name="risk" type="number" placeholder="Risk %" className="bg-slate-800 p-2 rounded w-full" />
        <button className="bg-blue-600 px-4 py-2 rounded">Calculate</button>
      </form>

      {result && (
        <div className="mt-6 bg-slate-900 p-4 rounded border border-slate-800">
          {result.error ? (
            <p className="text-red-400">Error: {result.error}</p>
          ) : (
            <>
              <p>Base Value: {result.base_value} USD</p>
              <p>Purity Adjustment: {result.purity_adjustment} USD</p>
              <p>Risk Adjustment: {result.risk_adjustment} USD</p>
              <strong>Total Payout: {result.total_payout} USD</strong>

              {result.breakdown && (
                <ul className="mt-4 list-disc pl-6">
                  {result.breakdown.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
