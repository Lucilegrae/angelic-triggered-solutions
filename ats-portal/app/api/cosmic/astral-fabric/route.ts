import { NextResponse } from "next/server";
import { getAstralFabric } from "@/lib/supabase/rpcClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const fabric = await getAstralFabric();
    return NextResponse.json({ ok: true, fabric });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
