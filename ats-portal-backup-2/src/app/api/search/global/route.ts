import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ ok: true, results: [] });
  }

  // Simulated multi-domain search
  const results = [];

  if ("workflow".includes(q)) {
    results.push({ type: "workflow", id: "WF-001", name: "Workflow Engine" });
  }

  if ("ministry".includes(q)) {
    results.push({ type: "ministry", id: "MIN-001", name: "Ministry of Agriculture" });
  }

  if ("procurement".includes(q)) {
    results.push({ type: "procurement", id: "REC-001", name: "Procurement Record #1" });
  }

  if ("cosmic".includes(q)) {
    results.push({ type: "cosmic", id: "COS-001", name: "Astral Fabric" });
  }

  if ("member".includes(q)) {
    results.push({ type: "member", id: "MBR-001", name: "Member Profile" });
  }

  if ("compliance".includes(q)) {
    results.push({ type: "compliance", id: "CMP-001", name: "Compliance Document" });
  }

  if ("payment".includes(q)) {
    results.push({ type: "payment", id: "PAY-001", name: "Payment Job" });
  }

  if ("federation".includes(q)) {
    results.push({ type: "federation", id: "FED-001", name: "Federation State" });
  }

  if ("glyph".includes(q)) {
    results.push({ type: "glyph", id: "GLY-001", name: "Glyph PDF" });
  }

  return NextResponse.json({ ok: true, results });
}
