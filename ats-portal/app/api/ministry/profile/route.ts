import { NextResponse } from "next/server";
import { getMinistryProfile } from "@/lib/supabase/rpcClient";
import type { GetMinistryProfileArgs } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as GetMinistryProfileArgs;
    const ministry = await getMinistryProfile(body);
    return NextResponse.json({ ok: true, ministry });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
