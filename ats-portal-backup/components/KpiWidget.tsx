export default function KpiWidget({
  label,
  value,
  color = "emerald",
}: {
  label: string;
  value: number | string;
  color?: "emerald" | "blue" | "amber" | "red";
}) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-300 border-emerald-500/30",
    blue: "text-blue-300 border-blue-500/30",
    amber: "text-amber-300 border-amber-500/30",
    red: "text-red-300 border-red-500/30",
  };

  return (
    <div
      className={`border ${colorMap[color]} rounded-lg px-4 py-3 bg-slate-900/40 animate-aura`}
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
