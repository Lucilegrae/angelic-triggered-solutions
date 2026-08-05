"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function PaymentLedger() {
  const [payments, setPayments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPayments() {
    const { data, error } = await supabase
      .from("ats_payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ledger payment load error:", error.message);
      return;
    }

    setPayments(data);
  }

  async function loadEvents() {
    const { data, error } = await supabase
      .from("payment_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ledger event load error:", error.message);
      return;
    }

    setEvents(data);
  }

  useEffect(() => {
    loadPayments();
    loadEvents();
    setLoading(false);

    const channel = supabase
      .channel("ats-ledger-stream")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "payment_events" },
        (payload) => {
          setEvents((prev) => [payload.new, ...prev]);
        }
      );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="aura-card p-6">
        <h2 className="text-xl font-bold">Loading Ledger...</h2>
      </div>
    );
  }

  return (
    <div className="aura-card p-6">
      <h2 className="text-2xl font-bold mb-4 constellation-glyph">
        ✦ ATS Payment Ledger ✦
      </h2>

      {/* Payments Table */}
      <h3 className="text-xl font-bold mb-2">Payments</h3>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border-collapse border border-gray-300 bg-white shadow">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 border">Sector</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Currency</th>
              <th className="p-2 border">Provider</th>
              <th className="p-2 border">Provider Ref</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border">
                <td className="p-2 border">{p.sector}</td>
                <td className="p-2 border">{p.amount}</td>
                <td className="p-2 border">{p.currency}</td>
                <td className="p-2 border">{p.provider}</td>
                <td className="p-2 border">{p.provider_ref || "—"}</td>
                <td
                  className={`p-2 border font-bold ${
                    p.status === "success"
                      ? "text-green-600"
                      : p.status === "failed"
                      ? "text-red-600"
                      : p.status === "initiated"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {p.status.toUpperCase()}
                </td>
                <td className="p-2 border">
                  {new Date(p.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Timeline */}
      <h3 className="text-xl font-bold mb-2">Payment Event Timeline</h3>

      <ul className="space-y-4">
        {events.map((e) => (
          <li
            key={e.id}
            className="border rounded bg-white shadow p-4 flex flex-col"
          >
            <div className="flex justify-between">
              <strong>{e.type.toUpperCase()}</strong>
              <span className="text-sm opacity-70">
                {new Date(e.created_at).toLocaleString()}
              </span>
            </div>

            <p className="mt-2">
              <strong>Reference:</strong> {e.reference}
            </p>
            <p>
              <strong>Channel:</strong> {e.channel}
            </p>

            <pre className="mt-3 p-3 bg-gray-100 rounded text-sm overflow-x-auto">
              {JSON.stringify(e.details, null, 2)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
