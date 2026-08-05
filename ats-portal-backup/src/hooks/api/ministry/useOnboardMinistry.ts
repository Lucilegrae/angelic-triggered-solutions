"use client";
import { useApiPost } from "@/hooks/api/client";
import type { OnboardMinistryArgs, OnboardMinistryReturns } from "@/types/supabase/rpc";

export function useOnboardMinistry() {
  return useApiPost<OnboardMinistryArgs, OnboardMinistryReturns>("/api/ministry/onboard");
}
