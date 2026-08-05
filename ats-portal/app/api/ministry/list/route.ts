import { NextResponse } from "next/server";
import { listMinistries } from "@/lib/supabase/rpcClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const ministries = await listMinistries();
    return NextResponse.json({ ok: true, ministries });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
