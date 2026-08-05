export default function ChartSkeleton({ title }: { title: string }) {
  return (
    <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/40 animate-pulse">
      <p className="text-xs text-slate-500 mb-2">{title}</p>
      <div className="h-40 bg-slate-800/40 rounded" />
    </div>
  );
}
