import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { OnboardInvestorArgs, OnboardInvestorReturns } from "@/types/supabase/rpc";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OnboardInvestorArgs;
    const id = await callRpc<OnboardInvestorArgs, OnboardInvestorReturns>("onboard_investor", body);
    return NextResponse.json({ ok: true, stakeholder_id: id });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
