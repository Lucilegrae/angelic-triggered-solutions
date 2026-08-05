"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function PaymentDashboard() {
  const [payments, setPayments] = useState([]);
  const [retries, setRetries] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPayments() {
    const { data, error } = await supabase
      .from("ats_payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Payment load error:", error.message);
      return;
    }

    setPayments(data);
  }

  async function loadRetries() {
    const { data, error } = await supabase
      .from("ats_payment_retries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Retry load error:", error.message);
      return;
    }

    setRetries(data);
  }

  useEffect(() => {
    loadPayments();
    loadRetries();
    setLoading(false);

    const channel = supabase
      .channel("ats-payments-stream")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ats_payments" },
        (payload) => {
          setPayments((prev) => {
            const updated = prev.filter((p) => p.id !== payload.new.id);
            return [payload.new, ...updated];
          });
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
        <h2 className="text-xl font-bold">Loading Payments...</h2>
      </div>
    );
  }

  // KPI calculations
  const totalPayments = payments.length;
  const successful = payments.filter((p) => p.status === "success").length;
  const failed = payments.filter((p) => p.status === "failed").length;
  const pending = payments.filter((p) => p.status === "pending").length;
  const initiated = payments.filter((p) => p.status === "initiated").length;

  const successRate =
    totalPayments > 0 ? ((successful / totalPayments) * 100).toFixed(1) : 0;

  return (
    <div className="aura-card p-6">
      <h2 className="text-2xl font-bold mb-4 constellation-glyph">
        ✦ ATS Payment Dashboard ✦
      </h2>

      {/* KPI Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-black text-white rounded shadow">
          <h3>Total Payments</h3>
          <p className="text-2xl font-bold">{totalPayments}</p>
        </div>

        <div className="p-4 bg-green-700 text-white rounded shadow">
          <h3>Successful</h3>
          <p className="text-2xl font-bold">{successful}</p>
        </div>

        <div className="p-4 bg-yellow-600 text-white rounded shadow">
          <h3>Initiated</h3>
          <p className="text-2xl font-bold">{initiated}</p>
        </div>

        <div className="p-4 bg-red-700 text-white rounded shadow">
          <h3>Failed</h3>
          <p className="text-2xl font-bold">{failed}</p>
        </div>
      </div>

      {/* Success Rate */}
      <div className="mb-6 p-4 bg-blue-900 text-white rounded shadow">
        <h3>Success Rate</h3>
        <p className="text-3xl font-bold">{successRate}%</p>
      </div>

      {/* Payment List */}
      <h3 className="text-xl font-bold mb-2">Payment Activity</h3>
      <ul className="space-y-4">
        {payments.map((p) => (
          <li
            key={p.id}
            className="border rounded bg-white shadow p-4 flex flex-col"
          >
            <div className="flex justify-between">
              <strong>{p.sector}</strong>
              <span
                className={`px-3 py-1 rounded text-white ${
                  p.status === "success"
                    ? "bg-green-600"
                    : p.status === "failed"
                    ? "bg-red-600"
                    : p.status === "initiated"
                    ? "bg-yellow-600"
                    : "bg-gray-600"
                }`}
              >
                {p.status.toUpperCase()}
              </span>
            </div>

            <p className="mt-2">
              <strong>INS UUID:</strong> {p.ins_uuid}
            </p>
            <p>
              <strong>Amount:</strong> {p.amount} {p.currency}
            </p>
            <p>
              <strong>Provider:</strong> {p.provider}
            </p>
            <p>
              <strong>Provider Ref:</strong> {p.provider_ref || "—"}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(p.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Retry Queue */}
      <h3 className="text-xl font-bold mt-10 mb-2">Retry Queue</h3>
      <ul className="space-y-4">
        {retries.map((r) => (
          <li
            key={r.id}
            className="border rounded bg-white shadow p-4 flex flex-col"
          >
            <p>
              <strong>Payment ID:</strong> {r.payment_id}
            </p>
            <p>
              <strong>Attempt:</strong> {r.attempt}
            </p>
            <p>
              <strong>Status:</strong> {r.status}
            </p>
            <p>
              <strong>Next Attempt:</strong>{" "}
              {new Date(r.next_attempt_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
