"use client";
import { useApiGet } from "@/hooks/api/client";
import type { GetMemberAllocationSummaryReturns } from "@/types/supabase/rpc";

export function useMemberAllocationSummary() {
  return useApiGet<GetMemberAllocationSummaryReturns>("/api/member/allocation-summary");
}
