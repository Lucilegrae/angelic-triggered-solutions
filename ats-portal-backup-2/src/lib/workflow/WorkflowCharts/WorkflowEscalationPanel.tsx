"use client";

export function WorkflowEscalationPanel({ items }: { items: any[] }) {
  const colors: any = {
    0: { border: "border-green-500/40", text: "text-green-300", label: "Normal" },
    1: { border: "border-yellow-500/40", text: "text-yellow-300", label: "Warning" },
    2: { border: "border-orange-500/40", text: "text-orange-300", label: "Breach" },
    3: { border: "border-red-500/40", text: "text-red-300", label: "Critical" },
    4: { border: "border-pink-500/40", text: "text-pink-300", label: "Stalled" }
  };

  return (
    <div className="space-y-4">
      {items.map((w: any, idx: number) => (
        <div
          key={idx}
          className={`rounded-xl p-4 bg-slate-900/70 border ${colors[w.escalation_level].border}`}
        >
          <div className={`${colors[w.escalation_level].text} font-bold`}>
            {colors[w.escalation_level].label}
          </div>

          <div className="text-white mt-2">
            Workflow {w.workflow_id} — Sector {w.sector_id}
          </div>

          <div className="text-slate-400 text-sm">
            Age: {w.age_hours.toFixed(1)} hrs  
            <br />
            Stall: {w.stall_hours.toFixed(1)} hrs  
            <br />
            Reason: {w.reason}
          </div>
        </div>
      ))}
    </div>
  );
}
