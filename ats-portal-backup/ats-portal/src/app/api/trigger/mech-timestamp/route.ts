import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { UpdateMechTimestampArgs, UpdateMechTimestampReturns } from "@/types/supabase/rpc";

export async function POST() {
  try {
    await callRpc<UpdateMechTimestampArgs, UpdateMechTimestampReturns>("update_mech_timestamp", {});
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
