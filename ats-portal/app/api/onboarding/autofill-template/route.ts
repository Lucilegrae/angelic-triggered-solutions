import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { data: stakeholder } = await supabase
    .from("stakeholders")
    .select("*")
    .eq("id", body.stakeholder_id)
    .single();

  const { data: state } = await supabase
    .from("onboarding_state")
    .select("*")
    .eq("stakeholder_id", body.stakeholder_id)
    .single();

  const { data: template } = await supabase
    .from("ministry_auto_fill_templates")
    .select("*")
    .eq("ministry", stakeholder.sector)
    .eq("role", stakeholder.role)
    .eq("stage", state.stage)
    .single();

  return NextResponse.json({
    ok: true,
    template,
    stakeholder,
    state
  });
}
