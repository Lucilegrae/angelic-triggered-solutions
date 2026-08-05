export default function EstateOccupancyHeatmap({ estates }: { estates: any[] }) {
  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold">Estate Occupancy Heatmap</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {estates.map((e: any, idx: number) => {
          const ratio =
            e.total_capacity > 0
              ? e.occupied_slots / e.total_capacity
              : 0;
          const intensity =
            ratio > 0.85
              ? "bg-red-600/40 border-red-500/60"
              : ratio > 0.6
              ? "bg-amber-500/30 border-amber-400/60"
              : "bg-emerald-500/20 border-emerald-400/60";

          return (
            <div
              key={idx}
              className={`rounded-lg px-3 py-2 border ${intensity}`}
            >
              <p className="text-xs font-semibold">
                {e.block_name} · {e.location}
              </p>
              <p className="text-[11px]">
                {e.occupied_slots}/{e.total_capacity} occupied
              </p>
              <p className="text-[11px] text-slate-200">
                {(ratio * 100).toFixed(0)}% pressure
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
