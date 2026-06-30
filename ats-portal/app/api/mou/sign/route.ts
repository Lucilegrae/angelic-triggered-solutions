import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Mark MoU as signed
  const { error: updateError } = await supabase
    .from("onboarding_mou")
    .update({
      signed: true,
      signed_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Trigger legitimacy initiation
  const { error: rpcError } = await supabase.rpc("advance_legitimacy", {
    new_stage: "initiated",
  });

  if (rpcError) {
    return NextResponse.json({ error: rpcError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
