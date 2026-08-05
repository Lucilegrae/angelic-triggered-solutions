"use client";
import { useApiPost } from "@/hooks/api/client";
import type { FederationHeartbeatArgs, FederationHeartbeatReturns } from "@/types/supabase/rpc";

export function useFederationHeartbeat() {
  return useApiPost<FederationHeartbeatArgs, FederationHeartbeatReturns>("/api/federation/heartbeat");
}
