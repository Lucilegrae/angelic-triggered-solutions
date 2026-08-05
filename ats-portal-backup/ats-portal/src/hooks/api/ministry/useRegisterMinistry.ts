"use client";
import { useApiPost } from "@/hooks/api/client";
import type { RegisterMinistryArgs, RegisterMinistryReturns } from "@/types/supabase/rpc";

export function useRegisterMinistry() {
  return useApiPost<RegisterMinistryArgs, RegisterMinistryReturns>("/api/ministry/register");
}
