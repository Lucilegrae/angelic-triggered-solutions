import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { event_id } = body;

  if (!event_id) {
    return NextResponse.json({ error: "event_id is required" }, { status: 400 });
  }

  const { error } = await supabase.rpc("recover_legitimacy_state", {
    uid: user.id,
    event_id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
