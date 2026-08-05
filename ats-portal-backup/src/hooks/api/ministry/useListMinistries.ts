"use client";
import { useApiGet } from "@/hooks/api/client";
import type { ListMinistriesReturns } from "@/types/supabase/rpc";

export function useListMinistries() {
  return useApiGet<ListMinistriesReturns>("/api/ministry/list");
}
