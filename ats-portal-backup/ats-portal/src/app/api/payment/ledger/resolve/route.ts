import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { ResolveLedgerReconciliationArgs, ResolveLedgerReconciliationReturns } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ResolveLedgerReconciliationArgs;
    await callRpc<ResolveLedgerReconciliationArgs, ResolveLedgerReconciliationReturns>(
      "resolve_ledger_reconciliation",
      body
    );
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
