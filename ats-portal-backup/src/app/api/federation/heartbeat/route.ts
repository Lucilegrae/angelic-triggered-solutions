import { NextResponse } from "next/server";
import { federationHeartbeat } from "@/lib/supabase/rpcClient";
import type { FederationHeartbeatArgs } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as FederationHeartbeatArgs;
    const result = await federationHeartbeat(body);
    return NextResponse.json({ ok: true, result });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
