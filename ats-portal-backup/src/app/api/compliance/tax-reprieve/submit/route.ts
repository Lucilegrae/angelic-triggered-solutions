import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { SubmitTaxReprieveApplicationArgs, SubmitTaxReprieveApplicationReturns } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SubmitTaxReprieveApplicationArgs;
    await callRpc<SubmitTaxReprieveApplicationArgs, SubmitTaxReprieveApplicationReturns>(
      "submit_tax_reprieve_application",
      body
    );
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
