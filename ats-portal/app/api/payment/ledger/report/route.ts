import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { LedgerReconciliationReportArgs, LedgerReconciliationReportReturns } from "@/types/supabase/rpc";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const report = await callRpc<LedgerReconciliationReportArgs, LedgerReconciliationReportReturns>(
      "ledger_reconciliation_report",
      {}
    );
    return NextResponse.json({ ok: true, report });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
