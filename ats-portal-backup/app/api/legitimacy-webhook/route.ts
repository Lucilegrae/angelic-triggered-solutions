import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(req: Request) {
  const { stage, role, progress } = await req.json();

  const { data: webhooks } = await supabase
    .from("legitimacy_webhooks")
    .select("*")
    .eq("active", true);

  for (const hook of webhooks) {
    const payload = JSON.stringify({
      stage,
      role,
      progress,
      timestamp: new Date().toISOString(),
    });

    const signature = crypto
      .createHmac("sha256", hook.secret)
      .update(payload)
      .digest("hex");

    await fetch(hook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ATS-Signature": signature,
      },
      body: payload,
    });
  }

  return NextResponse.json({ success: true });
}
