import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("detect_legitimacy_anomaly", {
    uid: user.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ anomaly: data });
}
