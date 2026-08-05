import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("mv_governance_stability_index")
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const recommendation = {
    "Stable": "Governance system is stable. Maintain ministry throughput and sector upliftment.",
    "Moderate": "Increase compliance enforcement and legitimacy reinforcement across ministries.",
    "Fragile": "Immediate intervention required: deploy governance reinforcement teams."
  };

  return NextResponse.json({
    ok: true,
    ngsi: {
      ...data,
      recommendation: recommendation[data.stability_category]
    }
  });
}
