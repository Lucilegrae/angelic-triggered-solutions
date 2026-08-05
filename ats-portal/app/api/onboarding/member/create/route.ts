import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { full_name, email, policy_number, auth_user_id } = body;

  if (!full_name || !email || !policy_number || !auth_user_id) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("ats_members")
    .insert({
      id: crypto.randomUUID(),
      full_name,
      email,
      policy_number,
      auth_user_id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, member: data });
}
