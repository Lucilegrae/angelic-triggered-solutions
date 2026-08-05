"use client";
import { useApiGet } from "@/hooks/api/client";
import type { FederationSyncIndexReturns } from "@/types/supabase/rpc";

export function useFederationSyncIndex() {
  return useApiGet<FederationSyncIndexReturns>("/api/federation/sync-index");
}
