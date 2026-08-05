import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { computeBlockPressure } from "@/utils/ats/blockPressureEngine";

export async function GET() {
  const supabase = await createClient();

  const { data: blocks, error } = await supabase
    .from("ats_blocks")
    .select("block, max_units, current_units");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  const pressure = computeBlockPressure(blocks ?? []);

  return NextResponse.json({
    ok: true,
    pressure,
  });
}
