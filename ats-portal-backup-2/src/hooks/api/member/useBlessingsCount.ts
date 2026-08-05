"use client";
import { useApiPost } from "@/hooks/api/client";
import type { UpdateBlessingsCountArgs, UpdateBlessingsCountReturns } from "@/types/supabase/rpc";

export function useBlessingsCount() {
  return useApiPost<UpdateBlessingsCountArgs, UpdateBlessingsCountReturns>("/api/member/blessings");
}
