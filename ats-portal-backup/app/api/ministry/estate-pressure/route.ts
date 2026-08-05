import { supabase } from "@/lib/supabase/server";
import { atsHeaders } from "@/lib/ats/auth";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const db = supabase();

  const { data, error } = await db
    .from("ats_ministry_estate_pressure")
    .select("*")
    .headers(atsHeaders(token!));

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
