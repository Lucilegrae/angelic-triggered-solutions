import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("stakeholders")
    .insert({
      full_name: body.full_name,
      national_id: body.national_id,
      phone: body.phone,
      email: body.email,
      ministry: body.ministry,
      role: body.role
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  await supabase.from("onboarding_state").insert({
    stakeholder_id: data.id,
    stage: "Registration",
    completed: true
  });

  return NextResponse.json({ ok: true, stakeholder: data });
}
