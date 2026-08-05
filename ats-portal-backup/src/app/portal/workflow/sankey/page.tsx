"use client";

import { useWorkflowSankey } from "@/hooks/api/workflow/useWorkflowSankey";
import WorkflowSankeyRenderer from "@/components/ats/workflow/WorkflowSankeyRenderer";

export default function WorkflowSankeyPage() {
  const { loading, data, error } = useWorkflowSankey();

  return (
    <div className="ats-container">
      <h1 className="aura-title">🎀 Workflow State Transition Ribbon</h1>

      {loading && <p>Loading transitions...</p>}
      {error && <p className="error-text">{error}</p>}

      {data && <WorkflowSankeyRenderer transitions={data.transitions} />}
    </div>
  );
}
