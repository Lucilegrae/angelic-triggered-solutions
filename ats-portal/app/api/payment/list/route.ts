import { NextResponse } from "next/server";
import { listPaymentJobs } from "@/lib/supabase/rpcClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const jobs = await listPaymentJobs();
    return NextResponse.json({ ok: true, jobs });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
