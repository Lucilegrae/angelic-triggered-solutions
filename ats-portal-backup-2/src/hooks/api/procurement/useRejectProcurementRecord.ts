"use client";
import { useApiPost } from "@/hooks/api/client";
import type { RejectProcurementRecordArgs, RejectProcurementRecordReturns } from "@/types/supabase/rpc";

export function useRejectProcurementRecord() {
  return useApiPost<RejectProcurementRecordArgs, RejectProcurementRecordReturns>("/api/procurement/reject");
}
