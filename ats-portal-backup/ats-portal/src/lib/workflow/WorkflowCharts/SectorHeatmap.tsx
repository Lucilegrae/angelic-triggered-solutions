"use client";

export function SectorHeatmap({ sectors }: { sectors: any[] }) {
  function intensityColor(count: number) {
    if (count >= 50) return "bg-green-500";
    if (count >= 30) return "bg-yellow-400";
    if (count >= 15) return "bg-orange-500";
    if (count >= 5)  return "bg-red-500";
    return "bg-slate-700";
  }

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-purple-500/40">
      <div className="text-purple-300 font-bold text-xl mb-4">
        Sector Workflow Heatmap
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sectors.map((s: any) => (
          <div
            key={s.sector_id}
            className={`p-4 rounded-lg text-center text-white ${intensityColor(s.count)}`}
          >
            <div className="font-semibold">{s.sector_id}</div>
            <div className="text-sm mt-1">{s.count} workflows</div>
          </div>
        ))}
      </div>
    </div>
  );
}
