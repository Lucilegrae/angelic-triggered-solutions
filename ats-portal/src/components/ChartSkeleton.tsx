"use client";

export default function ChartSkeleton({ title = "Loading..." }) {
  return (
    <div className="w-full h-64 bg-slate-900/40 border border-slate-800 rounded-lg animate-pulse p-4">
      <h3 className="text-sm font-semibold text-slate-400 mb-3">{title}</h3>
      <div className="w-full h-full bg-slate-800/40 rounded" />
    </div>
  );
}
