import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { GetParallelTimelinesArgs, GetParallelTimelinesReturns } from "@/types/supabase/rpc";

export async function GET() {
  try {
    const timelines = await callRpc<GetParallelTimelinesArgs, GetParallelTimelinesReturns>("get_parallel_timelines", {});
    return NextResponse.json({ ok: true, timelines });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
