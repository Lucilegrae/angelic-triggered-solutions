import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { member_id, plan } = body;

  if (!member_id || !plan) {
    return NextResponse.json(
      { ok: false, error: "member_id and plan are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      member_id,
      plan,
      status: "ACTIVE",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  await supabase
    .from("housing_members")
    .update({ status: "SUBSCRIPTION_ACTIVE" })
    .eq("id", member_id);

  return NextResponse.json({ ok: true, subscription: data });
}
