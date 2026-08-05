type CoverageProps = {
  data: any[];
};

export default function CoverageTable({ data }: CoverageProps) {
  return (
    <div className="border border-slate-800 rounded-lg overflow-auto">
      <table className="min-w-full text-xs">
        <thead className="bg-slate-900">
          <tr>
            <th className="px-3 py-2 text-left">Member</th>
            <th className="px-3 py-2 text-left">Tier</th>
            <th className="px-3 py-2 text-left">Priority</th>
            <th className="px-3 py-2 text-left">Allocation</th>
            <th className="px-3 py-2 text-left">Unit</th>
            <th className="px-3 py-2 text-left">Insurance</th>
            <th className="px-3 py-2 text-left">Gap</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {data.map((c: any, idx: number) => (
            <tr key={idx} className="hover:bg-slate-900/60">
              <td className="px-3 py-2">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-100">
                    {c.full_name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {c.national_id}
                  </span>
                </div>
              </td>

              <td className="px-3 py-2">{c.tier}</td>
              <td className="px-3 py-2">{c.priority}</td>

              <td className="px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-[11px]">{c.allocation_status}</span>
                  <span className="text-[10px] text-slate-500">
                    Slot: {c.family_slot}
                  </span>
                </div>
              </td>

              <td className="px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-[11px]">{c.unit_code}</span>
                  <span className="text-[10px] text-slate-500">
                    {c.block_name} · {c.location}
                  </span>
                </div>
              </td>

              <td className="px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-[11px]">{c.insurance_status}</span>
                  <span className="text-[10px] text-slate-500">
                    Curr: {c.current_monthly} · Req: {c.required_monthly}
                  </span>
                </div>
              </td>

              <td className="px-3 py-2 text-amber-400">
                {c.insurance_gap}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
