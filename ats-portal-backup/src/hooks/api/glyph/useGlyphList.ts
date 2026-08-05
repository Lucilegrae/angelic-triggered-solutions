"use client";
import { useApiGet } from "@/hooks/api/client";
import type { ListGlyphPdfsReturns } from "@/types/supabase/rpc";

export function useGlyphList() {
  return useApiGet<ListGlyphPdfsReturns>("/api/glyph/list");
}
