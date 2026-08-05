"use client";

import { useEffect, useState } from "react";

export function LegitimacyTrust() {
  const [trust, setTrust] = useState<number>(0);

  useEffect(() => {
    fetch("/api/legitimacy-trust")
      .then((res) => res.json())
      .then((d) => setTrust(d.trust || 0));
  }, []);

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-donor)" } as any}>
      <h2 className="text-xl font-bold mb-2">Legitimacy Trust Index</h2>
      <div className="text-5xl font-bold">{trust.toFixed(2)}</div>
      <p className="text-sm mt-2 text-gray-400">
        Measures reliability, integrity, and long-term legitimacy alignment.
      </p>
    </div>
  );
}
