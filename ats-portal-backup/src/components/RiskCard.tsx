type RiskProps = {
  full_name: string;
  tier: number;
  priority: number;
  risk_level: string;
  allocation_status: string;
  scaling_status: string;
  gap: number;
};

export default function RiskCard(props: RiskProps) {
  const badge =
    props.risk_level === "High Risk"
      ? "bg-red-500/20 text-red-300"
      : props.risk_level === "Medium Risk"
      ? "bg-amber-500/20 text-amber-300"
      : props.risk_level === "Low Risk"
      ? "bg-emerald-500/20 text-emerald-300"
      : "bg-slate-700 text-slate-200";

  return (
    <div className="border border-slate-800 rounded-lg px-3 py-2 bg-slate-900/40">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400">{props.full_name}</p>
          <p className="text-xs text-slate-500">
            Tier {props.tier} · Priority {props.priority}
          </p>
        </div>

        <span className={`text-xs font-semibold px-2 py-1 rounded ${badge}`}>
          {props.risk_level}
        </span>
      </div>

      <div className="mt-1 text-xs text-slate-300">
        <p>Allocation: {props.allocation_status}</p>
        <p>Insurance: {props.scaling_status}</p>
        <p className="text-amber-400">Gap: {props.gap}</p>
      </div>
    </div>
  );
}
