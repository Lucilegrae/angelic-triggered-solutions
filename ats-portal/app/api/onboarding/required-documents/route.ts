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

  const { data: requirements } = await supabase
    .from("document_requirements")
    .select("doc_type")
    .eq("ministry", stakeholder.ministry)
    .eq("role", stakeholder.role)
    .eq("stage", state.stage);

  return NextResponse.json({
    ok: true,
    required_documents: requirements
  });
}
