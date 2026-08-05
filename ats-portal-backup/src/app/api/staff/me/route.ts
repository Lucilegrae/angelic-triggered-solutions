import { NextResponse } from "next/server";
import { supabase } from "@/supabaseClient";

export async function GET() {
  const { data } = await supabase.auth.getUser();
  return NextResponse.json({ user: data.user });
}
