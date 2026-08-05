"use client";
import { useApiPost } from "@/hooks/api/client";
import type { ApproveComplianceDocumentArgsA, ApproveComplianceDocumentReturns } from "@/types/supabase/rpc";

export function useApproveCompliance() {
  return useApiPost<ApproveComplianceDocumentArgsA, ApproveComplianceDocumentReturns>("/api/compliance/approve");
}
