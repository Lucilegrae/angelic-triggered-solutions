import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const { ids } = body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({
      status: "error",
      message: "No certificate IDs provided",
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .in("id", ids);

  return NextResponse.json({
    status: "ok",
    certificates,
  });
}
