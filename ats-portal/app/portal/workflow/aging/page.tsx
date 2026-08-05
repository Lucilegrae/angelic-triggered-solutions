"use client";

import { useWorkflowAgingCurve } from "@/hooks/api/workflow/useWorkflowAgingCurve";
import WorkflowAgingCurveRenderer from "@/components/ats/workflow/WorkflowAgingCurveRenderer";

export default function WorkflowAgingCurvePage() {
  const { loading, data, error } = useWorkflowAgingCurve();

  return (
    <div className="ats-container">
      <h1 className="aura-title">⏳ Workflow Aging Intelligence</h1>

      {loading && <p>Loading aging curves...</p>}
      {error && <p className="error-text">{error}</p>}

      {data && <WorkflowAgingCurveRenderer aging={data.aging} />}
    </div>
  );
}
