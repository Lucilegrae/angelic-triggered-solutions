import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { UpdateBlessingsCountArgs, UpdateBlessingsCountReturns } from "@/types/supabase/rpc";

export async function POST() {
  try {
    await callRpc<UpdateBlessingsCountArgs, UpdateBlessingsCountReturns>("update_blessings_count", {});
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
