import { NextResponse } from "next/server";
import { getPaymentJob } from "@/lib/supabase/rpcClient";
import type { GetPaymentJobArgs } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as GetPaymentJobArgs;
    const job = await getPaymentJob(body);
    return NextResponse.json({ ok: true, job });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
