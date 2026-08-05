"use client";

import { useWorkflowTimeline } from "@/hooks/api/workflow/useWorkflowTimeline";
import WorkflowTimelineRenderer from "@/components/ats/workflow/WorkflowTimelineRenderer";

export default function WorkflowTimelinePage() {
  const { loading, data, error } = useWorkflowTimeline();

  return (
    <div className="ats-container">
      <h1 className="aura-title">⚡ Workflow Timeline Intelligence</h1>

      {loading && <p>Loading timeline...</p>}
      {error && <p className="error-text">{error}</p>}

      {data && <WorkflowTimelineRenderer timeline={data.timeline} />}
    </div>
  );
}
