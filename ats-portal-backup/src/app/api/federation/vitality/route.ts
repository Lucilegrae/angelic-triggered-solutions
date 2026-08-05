import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { FederationVitalityAiArgs, FederationVitalityAiReturns } from "@/types/supabase/rpc";

export async function GET() {
  try {
    const vitality = await callRpc<FederationVitalityAiArgs, FederationVitalityAiReturns>(
      "federation_vitality_ai",
      {}
    );
    return NextResponse.json({ ok: true, vitality });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
