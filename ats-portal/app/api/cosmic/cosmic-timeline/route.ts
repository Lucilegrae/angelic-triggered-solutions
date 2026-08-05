import { NextResponse } from "next/server";
import { getCosmicTimeline } from "@/lib/supabase/rpcClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const timeline = await getCosmicTimeline();
    return NextResponse.json({ ok: true, timeline });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
