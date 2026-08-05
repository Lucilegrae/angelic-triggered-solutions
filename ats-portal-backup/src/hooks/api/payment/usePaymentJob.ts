"use client";
import { useApiPost } from "@/hooks/api/client";
import type { GetPaymentJobArgs, GetPaymentJobReturns } from "@/types/supabase/rpc";

export function usePaymentJob() {
  return useApiPost<GetPaymentJobArgs, GetPaymentJobReturns>("/api/payment/job");
}
