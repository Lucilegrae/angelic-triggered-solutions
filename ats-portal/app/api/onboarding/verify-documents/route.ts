import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  // Update document status
  await supabase
    .from("stakeholder_documents")
    .update({ status: body.status })
    .eq("id", body.document_id);

  // If all documents approved, mark onboarding stage
  if (body.status === "Approved") {
    const { data: docs } = await supabase
      .from("stakeholder_documents")
      .select("status")
      .eq("stakeholder_id", body.stakeholder_id);

    const allApproved = docs.every((d: any) => d.status === "Approved");

    if (allApproved) {
      await supabase
        .from("onboarding_state")
        .update({ documents_verified: true, stage: "Verification" })
        .eq("stakeholder_id", body.stakeholder_id);
    }
  }

  return NextResponse.json({ ok: true });
}
