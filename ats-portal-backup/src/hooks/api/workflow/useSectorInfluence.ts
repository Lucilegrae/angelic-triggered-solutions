"use client";

import { useApiGet } from "@/hooks/api/client";

export function useSectorInfluence() {
  return useApiGet<any>("/api/workflow/influence");
}
