import { NextResponse } from "next/server";
import { registerComplianceDocument } from "@/lib/supabase/rpcClient";
import type { RegisterComplianceDocumentArgs } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterComplianceDocumentArgs;
    const id = await registerComplianceDocument(body);
    return NextResponse.json({ ok: true, document_id: id });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
