import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { RetryExportRecordArgs, RetryExportRecordReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as RetryExportRecordArgs;
    await callRpc<RetryExportRecordArgs, RetryExportRecordReturns>("retry_export_record", body);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
