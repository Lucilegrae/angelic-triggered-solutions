import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { data: stakeholder } = await supabase
    .from("stakeholders")
    .select("ministry, role")
    .eq("id", body.stakeholder_id)
    .single();

  const { data: state } = await supabase
    .from("onboarding_state")
    .select("stage")
    .eq("stakeholder_id", body.stakeholder_id)
    .single();

  const { data: templates, error } = await supabase
    .from("ministry_document_templates")
    .select("doc_type, template_url")
    .eq("ministry", stakeholder.ministry)
    .eq("role", stakeholder.role)
    .eq("stage", state.stage);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    templates
  });
}
