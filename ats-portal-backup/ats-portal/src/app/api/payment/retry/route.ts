import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { RetryPaymentJobArgs, RetryPaymentJobReturns } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RetryPaymentJobArgs;
    await callRpc<RetryPaymentJobArgs, RetryPaymentJobReturns>("retry_payment_job", body);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
