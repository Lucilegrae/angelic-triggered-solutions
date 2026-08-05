"use client";

import { useApiGet } from "@/hooks/api/client";
import type { AtsStateDistributionReturns } from "@/types/supabase/rpc";

export function useWorkflowSankey() {
  return useApiGet<AtsStateDistributionReturns>("/api/workflow/sankey");
}
