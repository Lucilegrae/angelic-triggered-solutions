import { NextResponse } from "next/server";
import { getProcurementRecord } from "@/lib/supabase/rpcClient";
import type { GetProcurementRecordArgs } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GetProcurementRecordArgs;
    const record = await getProcurementRecord(body);
    return NextResponse.json({ ok: true, record });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
