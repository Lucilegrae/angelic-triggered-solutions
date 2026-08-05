import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { stakeholder_id } = body;

  const { data, error } = await supabase
    .from("mv_stakeholder_success_forecast")
    .select("*")
    .eq("stakeholder_id", stakeholder_id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const pathway = {
    "High": "Stakeholder is on track for full onboarding completion. Maintain current workflow.",
    "Medium": "Stakeholder requires moderate support: increase communication, verify documents early.",
    "Low": "Stakeholder requires intensive support: assign officer, enforce compliance, accelerate verification."
  };

  return NextResponse.json({
    ok: true,
    success: {
      ...data,
      pathway: pathway[data.success_category]
    }
  });
}
