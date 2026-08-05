"use client";
import { useApiPost } from "@/hooks/api/client";
import type { RejectComplianceDocumentArgsA, RejectComplianceDocumentReturns } from "@/types/supabase/rpc";

export function useRejectCompliance() {
  return useApiPost<RejectComplianceDocumentArgsA, RejectComplianceDocumentReturns>("/api/compliance/reject");
}
