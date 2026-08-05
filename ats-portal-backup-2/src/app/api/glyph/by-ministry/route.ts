import { NextResponse } from "next/server";
import { listGlyphPdfsByMinistry } from "@/lib/supabase/rpcClient";
import type { ListGlyphPdfsByMinistryArgs } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ListGlyphPdfsByMinistryArgs;
    const pdfs = await listGlyphPdfsByMinistry(body);
    return NextResponse.json({ ok: true, pdfs });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
