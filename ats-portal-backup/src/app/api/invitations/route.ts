import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import twilio from "twilio";
import { sendEmail } from "@/lib/email/sendEmail";

export async function POST(req: Request) {
  const body = await req.json();
  const { role, channel, target, note } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Store invitation first
  const { data, error } = await supabase
    .from("invitations")
    .insert({
      role,
      channel,
      target,
      note,
      status: "queued",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // WhatsApp rail
  if (channel === "whatsapp") {
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );

      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER!,
        to: `whatsapp:${target}`,
        body: `ATS Invitation:\nYou are invited to onboard as a ${role}.\n${note || ""}`,
      });

      await supabase.from("invitations").update({ status: "sent" }).eq("id", data.id);

      return NextResponse.json({ status: "sent", invitation: data });
    } catch (err: any) {
      await supabase.from("invitations").update({ status: "failed" }).eq("id", data.id);
      return NextResponse.json({ status: "failed", error: err.message });
    }
  }

  // Email rail
  if (channel === "email") {
    try {
      await sendEmail(
        target,
        `ATS Invitation - ${role}`,
        `You are invited to onboard as a ${role}.\n\n${note || ""}`
      );

      await supabase.from("invitations").update({ status: "sent" }).eq("id", data.id);

      return NextResponse.json({ status: "sent", invitation: data });
    } catch (err: any) {
      await supabase.from("invitations").update({ status: "failed" }).eq("id", data.id);
      return NextResponse.json({ status: "failed", error: err.message });
    }
  }

  // Other channels (SMS, QR) remain stored only
  return NextResponse.json({
    status: "stored",
    invitation: data,
  });
}
