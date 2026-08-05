import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("mv_stakeholder_progress")
    .select("stakeholder_id, full_name, sector, role, progress_score");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // Sector-based coordinates (replace with real coordinates later)
  const sectorCoords: Record<string, [number, number]> = {
    "Agriculture": [31.06, -17.83],
    "Mining": [31.04, -17.81],
    "Finance": [31.07, -17.84],
    "Local Government": [31.03, -17.80],
    "Lands": [31.05, -17.82],
  };

  const features = data.map((row: any) => ({
    type: "Feature",
    properties: {
      stakeholder_id: row.stakeholder_id,
      full_name: row.full_name,
      sector: row.sector,
      role: row.role,
      progress_score: row.progress_score
    },
    geometry: {
      type: "Point",
      coordinates: sectorCoords[row.sector] || [31.05, -17.82]
    }
  }));

  return NextResponse.json({
    ok: true,
    type: "FeatureCollection",
    features
  });
}
