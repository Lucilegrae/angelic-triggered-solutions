import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const { qr_id, qr_type, payload, event } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("qr_registry")
    .insert([{ qr_id, qr_type, payload, event }]);

  if (error) {
    return NextResponse.json({ status: "error", error });
  }

  return NextResponse.json({ status: "logged" });
}
