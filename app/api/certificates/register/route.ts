import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { ins_uuid, sector, serial, issued_at, certificate_path } = body;

  if (!ins_uuid || !sector || !serial || !issued_at || !certificate_path) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("ats_certificates")
    .insert({
      ins_uuid,
      sector,
      serial,
      issued_at,
      certificate_path
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
