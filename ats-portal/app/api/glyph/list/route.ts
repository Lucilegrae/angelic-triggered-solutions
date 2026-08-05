import { NextResponse } from "next/server";
import { listGlyphPdfs } from "@/lib/supabase/rpcClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const pdfs = await listGlyphPdfs();
    return NextResponse.json({ ok: true, pdfs });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
