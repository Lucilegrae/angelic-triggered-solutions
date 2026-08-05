import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  const { id } = await params;
  req: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ats_allocation_history")
    .select("allocation, run_timestamp")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    allocation: data?.allocation,
    timestamp: data?.run_timestamp,
  });
}
