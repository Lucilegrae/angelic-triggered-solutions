import { safe } from "@/lib/safe";
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

  const { data: required } = await supabase
    .from("document_requirements")
    .select("doc_type")
    .eq("ministry", stakeholder.ministry)
    .eq("role", stakeholder.role)
    .eq("stage", state.stage);

  const { data: uploaded } = await supabase
    .from("stakeholder_documents")
    .select("doc_type, status")
    .eq("stakeholder_id", body.stakeholder_id);

  const missing = safe(required).filter(
    (req: any) => !uploaded.some((u: any) => u.doc_type === req.doc_type)
  );

  const unapproved = safe(uploaded).filter(
    (u: any) => u.status !== "Approved"
  );

  return NextResponse.json({
    ok: true,
    missing,
    unapproved
  });
}
