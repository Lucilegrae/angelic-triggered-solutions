import { NextResponse } from "next/server";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Placeholder: integrate GNSS / GIS data later
  return NextResponse.json({
    ok: true,
    estates: [],
  });
}
