"use client";
import { useApiPost } from "@/hooks/api/client";
import type { GetPaymentProfileArgs, GetPaymentProfileReturns } from "@/types/supabase/rpc";

export function usePaymentProfile() {
  return useApiPost<GetPaymentProfileArgs, GetPaymentProfileReturns>("/api/payment/profile");
}
