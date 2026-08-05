type TierLoadProps = {
  tier: number;
  priority: number;
  member_count: number;
  total_current_monthly: number;
  total_required_monthly: number;
  total_gap: number;
};

export default function TierLoadCard(props: TierLoadProps) {
  return (
    <div className="border border-slate-800 rounded-lg px-3 py-2 bg-slate-900/40">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400">
            Tier {props.tier} · Priority {props.priority}
          </p>
          <p className="text-sm font-semibold">{props.member_count} members</p>
        </div>

        <div className="text-right text-xs text-slate-300">
          <p>Current: {props.total_current_monthly}</p>
          <p>Required: {props.total_required_monthly}</p>
          <p className="text-amber-400">Gap: {props.total_gap}</p>
        </div>
      </div>
    </div>
  );
}
