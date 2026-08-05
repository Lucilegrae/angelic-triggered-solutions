import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // GNSS + allocation pressure
  const { data: alloc, error: allocErr } = await supabase
    .from("mv_gnss_block_pressure")
    .select("block, allocated, capacity, pressure_percent, geom");

  if (allocErr) {
    return NextResponse.json({ ok: false, error: allocErr.message }, { status: 500 });
  }

  // Occupancy pressure
  const { data: occ, error: occErr } = await supabase
    .from("mv_occupancy_pressure")
    .select("block, block_occupancy_percent");

  if (occErr) {
    return NextResponse.json({ ok: false, error: occErr.message }, { status: 500 });
  }

  // Merge occupancy into GNSS allocation rows
  const merged = alloc.map((row: any) => {
    const occRow = occ.find((o: any) => o.block === row.block);
    return {
      ...row,
      occupancy_percent: occRow ? occRow.block_occupancy_percent : null
    };
  });

  const features = merged.map((row: any) => ({
    type: "Feature",
    properties: {
      block: row.block,
      allocated: row.allocated,
      capacity: row.capacity,
      allocation_pressure: row.pressure_percent,
      occupancy_pressure: row.occupancy_percent
    },
    geometry: row.geom
  }));

  return NextResponse.json({
    ok: true,
    type: "FeatureCollection",
    features,
  });
}
