import { NextResponse } from "next/server";
import { allocateMember } from "@/lib/supabase/rpcClient";
import type { AllocateMemberArgs } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as AllocateMemberArgs;
    const allocation = await allocateMember(body);
    return NextResponse.json({ ok: true, allocation });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
