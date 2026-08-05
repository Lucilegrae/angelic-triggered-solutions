"use client";
import { useApiGet } from "@/hooks/api/client";
import type { GetParallelTimelinesReturns } from "@/types/supabase/rpc";

export function useParallelTimelines() {
  return useApiGet<GetParallelTimelinesReturns>("/api/cosmic/parallel-timelines");
}
