"use client";
import { useApiGet } from "@/hooks/api/client";
import type { GetAstralPressureReturns } from "@/types/supabase/rpc";

export function useAstralPressure() {
  return useApiGet<GetAstralPressureReturns>("/api/cosmic/astral-pressure");
}
