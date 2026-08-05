"use client";

import { useEffect, useState } from "react";

export default function LifecycleClock({
  start,
  deadline,
  monthsRemaining,
}: {
  start: string;
  deadline: string;
  monthsRemaining: number;
}) {
  const [progress, setProgress] = useState(0);

  // Convert dates
  const startDate = new Date(start);
  const endDate = new Date(deadline);
  const now = new Date();

  const total = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));

  useEffect(() => {
    const t = setTimeout(() => setProgress(pct), 200);
    return () => clearTimeout(t);
  }, [pct]);

  // Color logic
  const color =
    pct < 50 ? "stroke-emerald-400"
    : pct < 80 ? "stroke-amber-400"
    : "stroke-red-500";

  return (
    <div className="flex flex-col items-center space-y-2">
      <svg width="120" height="120" className="rotate-[-90deg]">
        <circle
          cx="60"
          cy="60"
          r="50"
          className="stroke-slate-700"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          strokeWidth="10"
          fill="none"
          className={`${color} transition-all duration-[1500ms] ease-out`}
          strokeDasharray="314"
          strokeDashoffset={314 - (314 * progress) / 100}
        />
      </svg>

      <div className="text-center">
        <p className="text-xs text-slate-400">Months Remaining</p>
        <p className="text-sm font-semibold">{monthsRemaining}</p>
      </div>

      <div className="text-center text-[11px] text-slate-500">
        <p>Start: {start}</p>
        <p>Deadline: {deadline}</p>
      </div>
    </div>
  );
}
