import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  await supabase.auth.exchangeCodeForSession(request.url);

  return NextResponse.redirect("http://localhost:3000/portal/reset-password");
}
