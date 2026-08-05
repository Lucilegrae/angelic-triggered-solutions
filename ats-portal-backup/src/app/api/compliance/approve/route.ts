import { NextResponse } from "next/server";
import { approveComplianceDocumentA } from "@/lib/supabase/rpcClient";
import type { ApproveComplianceDocumentArgsA } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApproveComplianceDocumentArgsA;
    await approveComplianceDocumentA(body);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
