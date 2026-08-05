import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  // Get dashboard for role
  const { data: roleMap, error: roleErr } = await supabase
    .from("role_dashboards")
    .select("dashboard_path")
    .eq("role", body.role)
    .single();

  if (roleErr) {
    return NextResponse.json({ ok: false, error: roleErr.message }, { status: 500 });
  }

  // Assign dashboard to stakeholder
  const { error: updateErr } = await supabase
    .from("stakeholders")
    .update({ dashboard_path: roleMap.dashboard_path })
    .eq("id", body.stakeholder_id);

  if (updateErr) {
    return NextResponse.json({ ok: false, error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    dashboard: roleMap.dashboard_path
  });
}
