import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { RejectProcurementRecordArgs, RejectProcurementRecordReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as RejectProcurementRecordArgs;
    await callRpc<RejectProcurementRecordArgs, RejectProcurementRecordReturns>("reject_procurement_record", body);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
