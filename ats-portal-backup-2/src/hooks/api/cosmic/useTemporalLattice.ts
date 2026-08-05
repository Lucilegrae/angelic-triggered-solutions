"use client";
import { useApiGet } from "@/hooks/api/client";
import type { GetTemporalProbabilityLatticeReturns } from "@/types/supabase/rpc";

export function useTemporalLattice() {
  return useApiGet<GetTemporalProbabilityLatticeReturns>("/api/cosmic/temporal-lattice");
}
