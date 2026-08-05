import { supabase } from "@/supabaseClient";

export async function GET(
  const { id } = await params;
  req: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  const { member_id } = await params;

  // Fetch latest allocation history entry
  const { data, error } = await supabase
    .from("ats_allocation_history")
    .select("allocation")
    .order("run_timestamp", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return Response.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({
    ok: true,
    member_id,
    allocation: data?.allocation ?? null,
  });
}
