import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { FederationSyncIndexArgs, FederationSyncIndexReturns } from "@/types/supabase/rpc";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const sync = await callRpc<FederationSyncIndexArgs, FederationSyncIndexReturns>(
      "federation_sync_index",
      {}
    );
    return NextResponse.json({ ok: true, sync });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
