"use client";

export default function AnalyticsNav() {
  return (
    <div className="flex gap-3 mb-6">
      <a
        href="/portal/procurement/analytics"
        className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
      >
        Analytics Home
      </a>
      <a
        href="/portal/procurement/analytics/heatmaps"
        className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
      >
        Heatmaps
      </a>
      <a
        href="/portal/procurement/analytics/coordinators"
        className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
      >
        Coordinators
      </a>
      <a
        href="/portal/procurement/analytics/farmers"
        className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
      >
        Farmers
      </a>
      <a
        href="/portal/procurement/analytics/institutions"
        className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
      >
        Institutions
      </a>
    </div>
  );
}
