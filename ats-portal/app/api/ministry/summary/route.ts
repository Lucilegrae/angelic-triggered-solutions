import { NextResponse } from "next/server";
import { atsHeaders } from "@/lib/atsHeaders";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const urls = [
    "/ministry/coverage",
    "/ministry/tier-load",
    "/ministry/estate-pressure",
    "/ministry/risk",
    "/ministry/lifecycle",
  ];

  const results = await Promise.all(
    urls.map((u) =>
      fetch(process.env.ATS_API + u, {
        headers: atsHeaders(token!),
      }).then((r) => r.json())
    )
  );

  return NextResponse.json({
    coverage: results[0],
    tiers: results[1],
    estates: results[2],
    risks: results[3],
    lifecycle: results[4],
  });
}
