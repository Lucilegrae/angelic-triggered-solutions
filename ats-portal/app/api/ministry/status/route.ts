import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { UpdateMinistryStatusArgs, UpdateMinistryStatusReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as UpdateMinistryStatusArgs;
    await callRpc<UpdateMinistryStatusArgs, UpdateMinistryStatusReturns>("update_ministry_status", body);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
