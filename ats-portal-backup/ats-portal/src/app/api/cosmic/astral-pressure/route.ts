import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { GetAstralPressureArgs, GetAstralPressureReturns } from "@/types/supabase/rpc";

export async function GET() {
  try {
    const pressure = await callRpc<GetAstralPressureArgs, GetAstralPressureReturns>("get_astral_pressure", {});
    return NextResponse.json({ ok: true, pressure });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
