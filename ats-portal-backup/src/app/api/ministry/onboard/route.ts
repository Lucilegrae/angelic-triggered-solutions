import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { OnboardMinistryArgs, OnboardMinistryReturns } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OnboardMinistryArgs;
    const id = await callRpc<OnboardMinistryArgs, OnboardMinistryReturns>("onboard_ministry", body);
    return NextResponse.json({ ok: true, ministry_id: id });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
