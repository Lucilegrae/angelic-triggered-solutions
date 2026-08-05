import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { GetPaymentProfileArgs, GetPaymentProfileReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as GetPaymentProfileArgs;
    const profile = await callRpc<GetPaymentProfileArgs, GetPaymentProfileReturns>(
      "get_payment_profile",
      body
    );
    return NextResponse.json({ ok: true, profile });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
