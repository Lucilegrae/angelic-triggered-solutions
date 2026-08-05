import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("ats_allocation_history")
    .select("run_timestamp, allocation")
    .order("run_timestamp", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    history: data ?? [],
  });
}
