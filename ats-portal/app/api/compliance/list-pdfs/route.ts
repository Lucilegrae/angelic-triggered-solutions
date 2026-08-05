import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { ListCompliancePdfsArgs, ListCompliancePdfsReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as ListCompliancePdfsArgs;
    const pdfs = await callRpc<ListCompliancePdfsArgs, ListCompliancePdfsReturns>(
      "list_compliance_pdfs",
      body
    );
    return NextResponse.json({ ok: true, pdfs });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
