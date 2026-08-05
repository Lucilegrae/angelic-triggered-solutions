"use client";
import { useApiPost } from "@/hooks/api/client";
import type { ListGlyphPdfsByMinistryArgs, ListGlyphPdfsByMinistryReturns } from "@/types/supabase/rpc";

export function useGlyphByMinistry() {
  return useApiPost<ListGlyphPdfsByMinistryArgs, ListGlyphPdfsByMinistryReturns>("/api/glyph/by-ministry");
}
