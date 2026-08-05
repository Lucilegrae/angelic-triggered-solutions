import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = supabaseServer;

  const { data: payment, error: payErr } = await supabase
    .from("payments")
    .select("*")
    .eq("id", id)
    .single();

  if (payErr || !payment) {
    return NextResponse.json(
      { error: payErr?.message || "Payment not found" },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from("ecocash_retry_queue")
    .insert({
      payment_id: payment.id,
      amount: payment.amount,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
