import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { payment_id } = body;

    if (!payment_id) {
      return NextResponse.json(
        { error: "payment_id required" },
        { status: 400 }
      );
    }

    const interval =
      Number(process.env.ATS_PAYMENT_RETRY_INTERVAL_SECONDS || "300");

    const { data, error } = await supabase
      .from("ats_payment_retries")
      .insert({
        payment_id,
        attempt: 0,
        status: "queued",
        next_attempt_at: new Date(
          Date.now() + interval * 1000
        ).toISOString()
      })
      .select("*")
      .single();

    if (error) {
      console.error("Retry queue insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to queue retry" },
        { status: 500 }
      );
    }

    return NextResponse.json({ retry: data }, { status: 200 });
  } catch (e: any) {
    console.error("Retry queue error:", e.message);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
