"use client";

import { useAdvanceWorkflow } from "@/hooks/api/workflow/useAdvanceWorkflow";
import type { AdvanceWorkflowArgs } from "@/types/supabase/rpc";

export default function WorkflowAdvancePanel() {
  const { call, loading, data, error } = useAdvanceWorkflow();

  async function handleAdvance() {
    const args: AdvanceWorkflowArgs = {
      workflow_id: "WF-001",
      actor_id: "SYS",
      event: "advance",
    };
    call(args);
  }

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">⚡ Advance Workflow</h3>

      <button
        onClick={handleAdvance}
        className="ats-button"
        disabled={loading}
      >
        {loading ? "Advancing..." : "Advance"}
      </button>

      {error && <p className="error-text">{error}</p>}
      {data && (
        <pre className="ats-json">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
