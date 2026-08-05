"use client";
import { useApiPost } from "@/hooks/api/client";
import type { ListCompliancePdfsArgs, ListCompliancePdfsReturns } from "@/types/supabase/rpc";

export function useCompliancePdfs() {
  return useApiPost<ListCompliancePdfsArgs, ListCompliancePdfsReturns>("/api/compliance/list-pdfs");
}
