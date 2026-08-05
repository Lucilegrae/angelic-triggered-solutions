import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = supabaseServer;

  const { data: queue, error: qErr } = await supabase
    .from("ecocash_retry_queue")
    .select("*")
    .eq("status", "pending");

  if (qErr) {
    return NextResponse.json({ error: qErr.message }, { status: 500 });
  }

  const results: any[] = [];

  for (const item of queue || []) {
    // TODO: call EcoCash API here
    const success = true; // placeholder

    const { error: updErr } = await supabase
      .from("ecocash_retry_queue")
      .update({
        status: success ? "completed" : "failed",
      })
      .eq("id", item.id);

    results.push({
      id: item.id,
      success,
      error: updErr?.message || null,
    });
  }

  return NextResponse.json({ processed: results.length, results });
}
