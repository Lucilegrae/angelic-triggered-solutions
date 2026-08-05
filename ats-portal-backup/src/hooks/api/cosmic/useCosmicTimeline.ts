"use client";

import { useApiGet } from "@/hooks/api/client";

export function useCosmicTimeline() {
  return useApiGet<any>("/api/cosmic/timeline");
}
