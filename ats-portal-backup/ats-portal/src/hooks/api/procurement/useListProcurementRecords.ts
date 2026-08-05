"use client";
import { useApiGet } from "@/hooks/api/client";
import type { ListProcurementRecordsReturns } from "@/types/supabase/rpc";

export function useListProcurementRecords() {
  return useApiGet<ListProcurementRecordsReturns>("/api/procurement/list");
}
