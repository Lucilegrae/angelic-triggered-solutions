import { NextResponse } from "next/server";
import { getAstralFabric } from "@/lib/supabase/rpcClient";

export async function GET() {
  try {
    const fabric = await getAstralFabric();
    return NextResponse.json({ ok: true, fabric });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
