"use client";

import { useApiGet } from "@/hooks/api/client";
import type { GetWorkflowTimelineReturns } from "@/types/supabase/rpc";

export function useWorkflowTimeline() {
  return useApiGet<GetWorkflowTimelineReturns>("/api/workflow/timeline");
}
