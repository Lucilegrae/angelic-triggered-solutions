import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { GetMemberAllocationSummaryArgs, GetMemberAllocationSummaryReturns } from "@/types/supabase/rpc";

export async function GET() {
  try {
    const summary = await callRpc<GetMemberAllocationSummaryArgs, GetMemberAllocationSummaryReturns>(
      "get_member_allocation_summary",
      {}
    );
    return NextResponse.json({ ok: true, summary });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
