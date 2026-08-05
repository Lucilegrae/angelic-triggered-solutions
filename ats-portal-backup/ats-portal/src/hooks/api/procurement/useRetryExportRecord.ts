"use client";
import { useApiPost } from "@/hooks/api/client";
import type { RetryExportRecordArgs, RetryExportRecordReturns } from "@/types/supabase/rpc";

export function useRetryExportRecord() {
  return useApiPost<RetryExportRecordArgs, RetryExportRecordReturns>("/api/procurement/retry-export");
}
