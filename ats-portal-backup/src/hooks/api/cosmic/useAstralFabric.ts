"use client";
import { useApiGet } from "@/hooks/api/client";
import type { GetAstralFabricReturns } from "@/types/supabase/rpc";

export function useAstralFabric() {
  return useApiGet<GetAstralFabricReturns>("/api/cosmic/astral-fabric");
}
