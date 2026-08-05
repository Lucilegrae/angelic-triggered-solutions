import { useWorkflow } from "@/hooks/useWorkflow";

export default async function WorkflowPanel({ workflowId }: { workflowId: string }) {
  const wf = await useWorkflow();
  const timeline = await wf.timeline(workflowId);

  async function advance(to: string) {
    await wf.advance(workflowId, to, `Moved to ${to}`);
  }

  return (
    <div className="space-y-6 rounded-xl border border-cyan-500/50 bg-slate-900/70 p-6">
      <div className="text-cyan-300 font-bold text-xl">Workflow Timeline</div>

      <div className="space-y-3">
        {timeline.map((step: any, idx: number) => (
          <div key={idx} className="rounded-lg bg-slate-800/60 px-4 py-3 text-cyan-100">
            <div className="font-semibold">{step.state}</div>
            <div className="opacity-70">{step.note}</div>
            <div className="text-[10px] opacity-50">
              {new Date(step.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => advance("PENDING")}
          className="rounded-lg bg-indigo-700/60 px-4 py-2 text-xs text-indigo-100"
        >
          Move to Pending
        </button>

        <button
          onClick={() => advance("APPROVED")}
          className="rounded-lg bg-emerald-700/60 px-4 py-2 text-xs text-emerald-100"
        >
          Approve
        </button>

        <button
          onClick={() => advance("REJECTED")}
          className="rounded-lg bg-rose-700/60 px-4 py-2 text-xs text-rose-100"
        >
          Reject
        </button>

        <button
          onClick={() => advance("OVERRIDDEN")}
          className="rounded-lg bg-yellow-700/60 px-4 py-2 text-xs text-yellow-100"
        >
          Override
        </button>
      </div>
    </div>
  );
}
