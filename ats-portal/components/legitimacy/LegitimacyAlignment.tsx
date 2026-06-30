"use client";

import { useEffect, useState } from "react";

export function LegitimacyAlignment() {
  const [alignment, setAlignment] = useState<number>(0);

  useEffect(() => {
    fetch("/api/legitimacy-alignment")
      .then((res) => res.json())
      .then((d) => setAlignment(d.alignment || 0));
  }, []);

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-ascended)" } as any}>
      <h2 className="text-xl font-bold mb-2">Legitimacy Alignment Index</h2>
      <div className="text-5xl font-bold">{alignment.toFixed(2)}</div>
      <p className="text-sm mt-2 text-gray-400">
        Measures harmony between your legitimacy behaviour and ATS federation patterns.
      </p>
    </div>
  );
}
