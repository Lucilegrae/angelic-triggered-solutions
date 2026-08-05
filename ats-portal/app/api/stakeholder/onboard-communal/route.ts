import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { OnboardCommunalArgs, OnboardCommunalReturns } from "@/types/supabase/rpc";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = (await req.json()) as OnboardCommunalArgs;
    const id = await callRpc<OnboardCommunalArgs, OnboardCommunalReturns>("onboard_communal", body);
    return NextResponse.json({ ok: true, stakeholder_id: id });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
