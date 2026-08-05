import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  await supabase.from("onboarding_state")
    .update({ stage: "Verification", completed: true })
    .eq("stakeholder_id", body.stakeholder_id);

  await supabase.from("onboarding_events").insert({
    stakeholder_id: body.stakeholder_id,
    event_type: "Verification",
    metadata: body
  });

  return NextResponse.json({ ok: true });
}
