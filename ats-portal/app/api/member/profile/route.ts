import { NextResponse } from "next/server";
import { getMemberProfile } from "@/lib/supabase/rpcClient";
import type { GetMemberProfileArgs } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as GetMemberProfileArgs;
    const profile = await getMemberProfile(body);
    return NextResponse.json({ ok: true, profile });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
