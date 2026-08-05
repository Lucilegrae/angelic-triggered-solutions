"use client";
import { useApiGet } from "@/hooks/api/client";
import type { GetOracleScenariosReturns } from "@/types/supabase/rpc";

export function useOracleScenarios() {
  return useApiGet<GetOracleScenariosReturns>("/api/cosmic/oracle-scenarios");
}
