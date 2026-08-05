import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { SetBranchClaimArgs, SetBranchClaimReturns } from "@/types/supabase/rpc";

export async function POST() {
  try {
    await callRpc<SetBranchClaimArgs, SetBranchClaimReturns>("set_branch_claim", {});
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
