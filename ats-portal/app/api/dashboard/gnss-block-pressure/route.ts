import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("mv_gnss_block_pressure")
    .select("block, allocated, capacity, pressure_percent, geom");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const features = (data || []).map((row: any) => ({
    type: "Feature",
    properties: {
      block: row.block,
      allocated: row.allocated,
      capacity: row.capacity,
      pressure_percent: row.pressure_percent,
    },
    geometry: row.geom,
  }));

  return NextResponse.json({
    ok: true,
    type: "FeatureCollection",
    features,
  });
}
