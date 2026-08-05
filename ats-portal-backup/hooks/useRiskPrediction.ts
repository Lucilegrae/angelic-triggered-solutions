"use client";

import { useState } from "react";

export function useRiskPrediction() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function predict(payload: any) {
    setLoading(true);
    try {
      const res = await fetch("/ministry/risk/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setResult(json);
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, predict };
}
