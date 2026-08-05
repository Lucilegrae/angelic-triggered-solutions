import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  // Mark activation stage
  await supabase.from("onboarding_state")
    .update({ stage: "Activation", completed: true })
    .eq("stakeholder_id", body.stakeholder_id);

  // Get stakeholder role
  const { data: stakeholder } = await supabase
    .from("stakeholders")
    .select("role")
    .eq("id", body.stakeholder_id)
    .single();

  // Assign dashboard
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding/assign-dashboard`, {
    method: "POST",
    body: JSON.stringify({
      stakeholder_id: body.stakeholder_id,
      role: stakeholder.role
    })
  });

  return NextResponse.json({ ok: true });
}
