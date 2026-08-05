import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { ListGlyphPdfsByTagArgs, ListGlyphPdfsByTagReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as ListGlyphPdfsByTagArgs;
    const pdfs = await callRpc<ListGlyphPdfsByTagArgs, ListGlyphPdfsByTagReturns>(
      "list_glyph_pdfs_by_tag",
      body
    );
    return NextResponse.json({ ok: true, pdfs });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
