"use client";

import { useEffect, useState } from "react";

export function LegitimacyScore() {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetch("/api/legitimacy-score")
      .then((res) => res.json())
      .then((d) => setScore(d.score || 0));
  }, []);

  return (
    <div className="p-4 bg-black text-white rounded-lg border">
      <div className="text-xl font-bold">Legitimacy Score</div>
      <div className="text-4xl mt-2">{score.toFixed(2)}</div>
    </div>
  );
}
