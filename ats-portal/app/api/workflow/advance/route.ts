import { NextResponse } from "next/server";
import { advanceWorkflow } from "@/lib/supabase/rpcClient";
import type { AdvanceWorkflowArgs } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as AdvanceWorkflowArgs;
    const result = await advanceWorkflow(body);
    return NextResponse.json({ ok: true, result });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
