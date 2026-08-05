"use client";
import { useApiPost } from "@/hooks/api/client";
import type { ListGlyphPdfsByTagArgs, ListGlyphPdfsByTagReturns } from "@/types/supabase/rpc";

export function useGlyphByTag() {
  return useApiPost<ListGlyphPdfsByTagArgs, ListGlyphPdfsByTagReturns>(
    "/api/glyph/by-tag"
  );
}
