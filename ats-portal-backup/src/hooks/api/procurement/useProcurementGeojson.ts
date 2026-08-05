"use client";
import { useApiGet } from "@/hooks/api/client";
import type { ProcurementGeojsonReturns } from "@/types/supabase/rpc";

export function useProcurementGeojson() {
  return useApiGet<ProcurementGeojsonReturns>("/api/procurement/geojson");
}
