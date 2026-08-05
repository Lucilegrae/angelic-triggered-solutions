export default function AuraSkeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-slate-900/40 border border-slate-800 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 animate-[aura_3s_infinite]" />
      <div className="relative p-4 space-y-3">
        <div className="h-3 w-24 bg-slate-700 rounded" />
        <div className="h-4 w-32 bg-slate-700 rounded" />
        <div className="h-3 w-20 bg-slate-700 rounded" />
      </div>
    </div>
  );
}
