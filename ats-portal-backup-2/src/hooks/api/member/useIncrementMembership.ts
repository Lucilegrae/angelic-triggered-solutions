"use client";
import { useApiPost } from "@/hooks/api/client";
import type { IncrementMembershipArgs, IncrementMembershipReturns } from "@/types/supabase/rpc";

export function useIncrementMembership() {
  return useApiPost<IncrementMembershipArgs, IncrementMembershipReturns>("/api/member/increment");
}
