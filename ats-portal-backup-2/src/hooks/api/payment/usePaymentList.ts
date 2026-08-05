"use client";
import { useApiGet } from "@/hooks/api/client";
import type { ListPaymentJobsReturns } from "@/types/supabase/rpc";

export function usePaymentList() {
  return useApiGet<ListPaymentJobsReturns>("/api/payment/list");
}
