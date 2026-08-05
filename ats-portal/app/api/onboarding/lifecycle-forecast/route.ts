import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { stakeholder_id } = body;

  const { data, error } = await supabase
    .from("mv_stakeholder_lifecycle_forecast")
    .select("*")
    .eq("stakeholder_id", stakeholder_id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const pathway = {
    "On Track": "Stakeholder is likely to complete ceremony and upliftment with current workflow.",
    "Needs Support": "Stakeholder requires targeted support: increase contact, verify documents, reinforce legitimacy.",
    "At Risk": "Stakeholder lifecycle is fragile: assign officer, enforce compliance, accelerate stage transitions."
  };

  return NextResponse.json({
    ok: true,
    lifecycle: {
      ...data,
      pathway: pathway[data.lifecycle_status] || "Review lifecycle manually."
    }
  });
}
