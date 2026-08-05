import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { stakeholder_id } = body;

  const { data, error } = await supabase
    .from("mv_stakeholder_risk_forecast")
    .select("*")
    .eq("stakeholder_id", stakeholder_id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const mitigation = {
    "Critical": "Immediate intervention required: assign senior officer, schedule verification call, enforce compliance.",
    "High": "Accelerate onboarding: verify documents, increase communication, monitor daily.",
    "Medium": "Provide guidance: send reminders, check compliance, review legitimacy.",
    "Low": "Normal monitoring: no immediate action required."
  };

  return NextResponse.json({
    ok: true,
    risk: {
      ...data,
      mitigation: mitigation[data.risk_category]
    }
  });
}
