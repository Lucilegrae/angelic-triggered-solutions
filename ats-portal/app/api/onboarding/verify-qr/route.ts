import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("onboarding_events")
    .select("stakeholder_id, timestamp, metadata")
    .eq("verification_token", body.token)
    .eq("event_type", "Ceremony")
    .single();

  if (error || !data) {
    return NextResponse.json({
      ok: false,
      message: "Invalid or expired certificate."
    });
  }

  const { data: stakeholder } = await supabase
    .from("stakeholders")
    .select("full_name, ministry, role, dashboard_path")
    .eq("id", data.stakeholder_id)
    .single();

  return NextResponse.json({
    ok: true,
    certificate: {
      stakeholder,
      ceremony_timestamp: data.timestamp,
      metadata: data.metadata
    }
  });
}
