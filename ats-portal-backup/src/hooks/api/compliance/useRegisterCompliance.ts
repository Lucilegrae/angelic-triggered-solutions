"use client";
import { useApiPost } from "@/hooks/api/client";
import type { RegisterComplianceDocumentArgs, RegisterComplianceDocumentReturns } from "@/types/supabase/rpc";

export function useRegisterCompliance() {
  return useApiPost<RegisterComplianceDocumentArgs, RegisterComplianceDocumentReturns>("/api/compliance/register");
}
