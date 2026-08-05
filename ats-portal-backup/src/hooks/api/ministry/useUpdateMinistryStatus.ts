"use client";
import { useApiPost } from "@/hooks/api/client";
import type { UpdateMinistryStatusArgs, UpdateMinistryStatusReturns } from "@/types/supabase/rpc";

export function useUpdateMinistryStatus() {
  return useApiPost<UpdateMinistryStatusArgs, UpdateMinistryStatusReturns>("/api/ministry/status");
}
