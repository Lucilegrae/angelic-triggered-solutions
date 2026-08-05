import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { certificate_id } = body;

  if (!certificate_id) {
    return NextResponse.json({
      status: "error",
      message: "certificate_id is required",
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Load certificate
  const { data: cert } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", certificate_id)
    .single();

  if (!cert) {
    return NextResponse.json({
      status: "error",
      message: "Certificate not found",
    });
  }

  // Find ancestors (chain of reissued_from)
  const ancestors: any[] = [];
  let current = cert.reissued_from;

  while (current) {
    const { data: ancestor } = await supabase
      .from("certificates")
      .select("*")
      .eq("id", current)
      .single();

    if (!ancestor) break;

    ancestors.push(ancestor);
    current = ancestor.reissued_from;
  }

  // Find descendants (certificates reissued from this one)
  const { data: descendants } = await supabase
    .from("certificates")
    .select("*")
    .eq("reissued_from", certificate_id);

  // Sector migration history
  const sectorHistory = [
    {
      sector: cert.sector,
      timestamp: cert.issued_at,
    },
    ...ancestors.map(a => ({
      sector: a.sector,
      timestamp: a.issued_at,
    })),
  ];

  return NextResponse.json({
    status: "ok",
    certificate: cert,
    ancestors,
    descendants,
    sectorHistory,
  });
}
