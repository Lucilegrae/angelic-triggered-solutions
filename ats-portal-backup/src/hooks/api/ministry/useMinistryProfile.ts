"use client";
import { useApiPost } from "@/hooks/api/client";
import type { GetMinistryProfileArgs, GetMinistryProfileReturns } from "@/types/supabase/rpc";

export function useMinistryProfile() {
  return useApiPost<GetMinistryProfileArgs, GetMinistryProfileReturns>("/api/ministry/profile");
}
