import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { ListExportIntelligenceArgs, ListExportIntelligenceReturns } from "@/types/supabase/rpc";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const intelligence = await callRpc<ListExportIntelligenceArgs, ListExportIntelligenceReturns>(
      "list_export_intelligence",
      {}
    );
    return NextResponse.json({ ok: true, intelligence });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
