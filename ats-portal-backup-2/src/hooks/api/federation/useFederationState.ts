"use client";
import { useApiGet } from "@/hooks/api/client";
import type { GetFederationStateReturns } from "@/types/supabase/rpc";

export function useFederationState() {
  return useApiGet<GetFederationStateReturns>("/api/federation/state");
}
