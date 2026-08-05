"use client";
import { useApiPost } from "@/hooks/api/client";
import type { RetryPaymentJobArgs, RetryPaymentJobReturns } from "@/types/supabase/rpc";

export function useRetryPaymentJob() {
  return useApiPost<RetryPaymentJobArgs, RetryPaymentJobReturns>("/api/payment/retry");
}
