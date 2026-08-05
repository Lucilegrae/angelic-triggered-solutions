import { NextResponse } from "next/server";
import { getFederationState } from "@/lib/supabase/rpcClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const state = await getFederationState();
    return NextResponse.json({ ok: true, state });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
