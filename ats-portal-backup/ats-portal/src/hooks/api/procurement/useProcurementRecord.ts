"use client";
import { useApiPost } from "@/hooks/api/client";
import type { GetProcurementRecordArgs, GetProcurementRecordReturns } from "@/types/supabase/rpc";

export function useProcurementRecord() {
  return useApiPost<GetProcurementRecordArgs, GetProcurementRecordReturns>("/api/procurement/get-record");
}
