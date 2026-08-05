import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { GetOracleScenariosArgs, GetOracleScenariosReturns } from "@/types/supabase/rpc";

export async function GET() {
  try {
    const scenarios = await callRpc<GetOracleScenariosArgs, GetOracleScenariosReturns>("get_oracle_scenarios", {});
    return NextResponse.json({ ok: true, scenarios });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
