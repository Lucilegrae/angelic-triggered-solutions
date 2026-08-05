"use client";

import { useApiGet } from "@/hooks/api/client";

export function useWorkflowAgingCurve() {
  return useApiGet<any>("/api/workflow/aging");
}
