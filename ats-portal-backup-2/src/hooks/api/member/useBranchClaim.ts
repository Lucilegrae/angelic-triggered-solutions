"use client";
import { useApiPost } from "@/hooks/api/client";
import type { SetBranchClaimArgs, SetBranchClaimReturns } from "@/types/supabase/rpc";

export function useBranchClaim() {
  return useApiPost<SetBranchClaimArgs, SetBranchClaimReturns>("/api/member/branch-claim");
}
