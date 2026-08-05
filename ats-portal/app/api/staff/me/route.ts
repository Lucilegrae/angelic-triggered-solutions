import { NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase.auth.getUser();
  return NextResponse.json({ user: data.user });
}
