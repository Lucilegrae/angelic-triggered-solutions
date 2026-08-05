"use client";

import AnalyticsNav from "../_analyticsNav";

export default function AnalyticsHome() {
  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Procurement Analytics</h1>

      <AnalyticsNav />

      <p className="text-slate-400">
        Choose a category above to explore procurement intelligence.
      </p>
    </div>
  );
}
