"use client";

export function SLAAlertsPanel({ alerts }: { alerts: any }) {
  function Panel({ title, items, color }: any) {
    return (
      <div className={`rounded-xl p-4 border ${color.border} bg-slate-900/70`}>
        <div className={`${color.text} font-bold mb-3`}>{title}</div>

        {(!items || items.length === 0) && (
          <div className="text-slate-400 text-sm">No workflows in this category</div>
        )}

        <div className="space-y-2">
          {items?.map((w: any, idx: number) => (
            <div key={idx} className="rounded-lg bg-slate-800/60 px-4 py-3 text-white">
              <div className="font-semibold">Workflow {w.workflow_id}</div>
              <div className="opacity-70">Sector: {w.sector_id}</div>
              <div className="text-[10px] opacity-50">
                Age: {w.age_hours.toFixed(1)} hrs
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Panel
        title="⚠️ SLA Warning (24–48 hrs)"
        items={alerts.warning}
        color={{ border: "border-yellow-500/40", text: "text-yellow-300" }}
      />

      <Panel
        title="⛔ SLA Breach (>48 hrs)"
        items={alerts.breach}
        color={{ border: "border-red-500/40", text: "text-red-300" }}
      />

      <Panel
        title="🔥 Critical Aging (>72 hrs)"
        items={alerts.critical}
        color={{ border: "border-pink-500/40", text: "text-pink-300" }}
      />
    </div>
  );
}
