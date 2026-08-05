import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { RegisterMinistryArgs, RegisterMinistryReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as RegisterMinistryArgs;
    const id = await callRpc<RegisterMinistryArgs, RegisterMinistryReturns>("register_ministry", body);
    return NextResponse.json({ ok: true, ministry_id: id });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
