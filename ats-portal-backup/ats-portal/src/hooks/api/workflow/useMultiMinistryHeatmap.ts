"use client";

import { useApiGet } from "@/hooks/api/client";

export function useMultiMinistryHeatmap() {
  return useApiGet<any>("/api/workflow/multi_ministry_heatmap");
}
