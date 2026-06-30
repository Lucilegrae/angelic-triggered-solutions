"use client";

import { useEffect, useState } from "react";

export function LegitimacyTrajectory() {
  const [score, setScore] = useState(0);
  const [prediction, setPrediction] = useState(0);

  useEffect(() => {
    fetch("/api/legitimacy-score")
      .then((res) => res.json())
      .then((d) => setScore(d.score || 0));

    fetch("/api/legitimacy-prediction")
      .then((res) => res.json())
      .then((d) => setPrediction(d.prediction || 0));
  }, []);

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-investor)" } as any}>
      <h2 className="text-xl font-bold mb-2">Legitimacy Trajectory</h2>

      <div className="text-lg">Current: {score.toFixed(2)}</div>
      <div className="text-lg">Predicted: {prediction.toFixed(2)}</div>

      <div className="w-full bg-gray-700 h-3 rounded mt-3">
        <div
          className="h-3 rounded aura-bar"
          style={{
            width: `${prediction}%`,
            background: "var(--aura-investor)",
            animation: "auraPulse 2s infinite",
          }}
        />
      </div>
    </div>
  );
}
