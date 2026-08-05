import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ats_allocation_history")
    .select("allocation, run_timestamp")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({
    ok: true,
    allocation: data.allocation,
    timestamp: data.run_timestamp
  });
}
