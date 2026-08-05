"use client";
import { useApiPost } from "@/hooks/api/client";
import type { GetMemberProfileArgs, GetMemberProfileReturns } from "@/types/supabase/rpc";

export function useMemberProfile() {
  return useApiPost<GetMemberProfileArgs, GetMemberProfileReturns>("/api/member/profile");
}
