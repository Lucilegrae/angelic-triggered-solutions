import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { LedgerReconciliationQueueArgs, LedgerReconciliationQueueReturns } from "@/types/supabase/rpc";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const queue = await callRpc<LedgerReconciliationQueueArgs, LedgerReconciliationQueueReturns>(
      "ledger_reconciliation_queue",
      {}
    );
    return NextResponse.json({ ok: true, queue });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
