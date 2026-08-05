import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { ApproveTaxReprieveArgs, ApproveTaxReprieveReturns } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApproveTaxReprieveArgs;
    await callRpc<ApproveTaxReprieveArgs, ApproveTaxReprieveReturns>(
      "approve_tax_reprieve",
      body
    );
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
