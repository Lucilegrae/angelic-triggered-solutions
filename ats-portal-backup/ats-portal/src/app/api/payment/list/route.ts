import { NextResponse } from "next/server";
import { listPaymentJobs } from "@/lib/supabase/rpcClient";

export async function GET() {
  try {
    const jobs = await listPaymentJobs();
    return NextResponse.json({ ok: true, jobs });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
