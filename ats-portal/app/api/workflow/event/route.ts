import { NextResponse } from "next/server";
import { emitWorkflowEvent } from "@/lib/supabase/rpcClient";
import type { EmitWorkflowEventArgs } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as EmitWorkflowEventArgs;
    await emitWorkflowEvent(body);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
