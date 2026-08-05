"use client";
import { useApiPost } from "@/hooks/api/client";
import type { AllocateMemberArgs, AllocateMemberReturns } from "@/types/supabase/rpc";

export function useAllocateMember() {
  return useApiPost<AllocateMemberArgs, AllocateMemberReturns>("/api/member/allocate");
}
