"use client";

import { useState } from "react";

export default function PayNowButton({
  ins_uuid,
  sector,
  amount,
  currency = "ZWL",
  provider = "ecocash"
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [providerRef, setProviderRef] = useState(null);

  async function initiatePayment() {
    setLoading(true);
    setStatus("initiating");

    try {
      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ins_uuid,
          sector,
          amount,
          currency,
          provider
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("failed");
        console.error("Payment initiation failed:", data.error);
        setLoading(false);
        return;
      }

      setStatus("initiated");
      setProviderRef(data.provider.reference || data.provider.poll_url);
    } catch (e) {
      console.error("Payment initiation error:", e.message);
      setStatus("failed");
    }

    setLoading(false);
  }

  return (
    <div className="p-4 bg-black text-white rounded shadow aura-card">
      <h3 className="text-lg font-bold mb-2 constellation-glyph">
        ✦ Pay Now ✦
      </h3>

      <p className="mb-2">
        <strong>Sector:</strong> {sector}
      </p>
      <p className="mb-2">
        <strong>Amount:</strong> {amount} {currency}
      </p>
      <p className="mb-4">
        <strong>Provider:</strong> {provider}
      </p>

      <button
        onClick={initiatePayment}
        disabled={loading}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold shadow"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {status && (
        <div className="mt-4 p-3 bg-white text-black rounded shadow">
          <strong>Status:</strong> {status.toUpperCase()}
          {providerRef && (
            <p className="mt-2">
              <strong>Provider Ref:</strong> {providerRef}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
