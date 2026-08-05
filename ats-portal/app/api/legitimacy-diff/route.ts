import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { event_id } = body;

  const { data, error } = await supabase.rpc("legitimacy_event_diff", {
    uid: user.id,
    event_id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ diff: data });
}
