import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { IncrementMembershipArgs, IncrementMembershipReturns } from "@/types/supabase/rpc";

export async function POST() {
  try {
    const count = await callRpc<IncrementMembershipArgs, IncrementMembershipReturns>(
      "increment_membership",
      {}
    );
    return NextResponse.json({ ok: true, count });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
