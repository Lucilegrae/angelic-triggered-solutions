import { NextResponse } from "next/server";
import { createWorkflow } from "@/lib/supabase/rpcClient";
import type { CreateWorkflowArgs } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateWorkflowArgs;
    const id = await createWorkflow(body);
    return NextResponse.json({ ok: true, workflow_id: id });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
