"use client";
import { useApiGet } from "@/hooks/api/client";
import type { FederationVitalityAiReturns } from "@/types/supabase/rpc";

export function useFederationVitality() {
  return useApiGet<FederationVitalityAiReturns>("/api/federation/vitality");
}
