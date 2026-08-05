"use client";

import { useEffect, useState } from "react";

export function LegitimacyConsistency() {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetch("/api/legitimacy-consistency")
      .then((res) => res.json())
      .then((d) => setScore(d.consistency || 0));
  }, []);

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-investor)" } as any}>
      <h2 className="text-xl font-bold mb-2">Legitimacy Consistency</h2>
      <div className="text-4xl">{score.toFixed(2)}</div>
      <p className="text-sm mt-2 text-gray-400">
        Measures stability of legitimacy behaviour over time.
      </p>
    </div>
  );
}
