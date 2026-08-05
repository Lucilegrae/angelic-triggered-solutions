import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("mv_ministry_predictive_analytics")
    .select("*");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const enriched = data.map(row => {
    const trend =
      row.forecast_performance > row.upliftment_score ? "Improving" :
      row.forecast_performance < row.upliftment_score ? "Declining" :
      "Stable";

    const risk =
      row.avg_compliance < 2 || row.avg_legitimacy < 50
        ? "High"
        : "Low";

    const recommendation =
      trend === "Declining"
        ? "Increase compliance enforcement and legitimacy reinforcement."
        : trend === "Improving"
        ? "Maintain current ministry workflows."
        : "Monitor ministry performance weekly.";

    return {
      ...row,
      trend,
      risk,
      recommendation
    };
  });

  return NextResponse.json({
    ok: true,
    analytics: enriched
  });
}
