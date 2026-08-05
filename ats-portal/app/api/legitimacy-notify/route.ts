import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { broadcastLegitimacy } from "@/lib/legitimacy/broadcast";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { stage } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await broadcastLegitimacy(stage, user);

  return NextResponse.json({ success: true });
}
