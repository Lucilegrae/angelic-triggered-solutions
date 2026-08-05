"use client";

import { useWorkflowTimeline } from "@/hooks/api/workflow/useWorkflowTimeline";
import { useCosmicTimeline } from "@/hooks/api/cosmic/useCosmicTimeline";
import CosmicTimelineOverlay from "@/components/ats/cosmic/CosmicTimelineOverlay";

export default function CosmicTimelineOverlayPage() {
  const { loading: wlLoading, data: wlData, error: wlError } = useWorkflowTimeline();
  const { loading: cLoading, data: cData, error: cError } = useCosmicTimeline();

  const loading = wlLoading || cLoading;
  const error = wlError || cError;

  return (
    <div className="ats-container">
      <h1 className="aura-title">🌌 Cosmic Workflow Overlay</h1>

      {loading && <p>Loading cosmic overlay...</p>}
      {error && <p className="error-text">{error}</p>}

      {wlData && cData && (
        <CosmicTimelineOverlay
          workflowTimeline={wlData.timeline}
          cosmicTimeline={cData.timeline}
        />
      )}
    </div>
  );
}
