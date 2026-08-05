import { NextResponse } from "next/server";
import { listProcurementRecords } from "@/lib/supabase/rpcClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const records = await listProcurementRecords();
    return NextResponse.json({ ok: true, records });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
