// ✦ Golden Aura Edge Function ✦
// File: supabase/functions/send-audit-report/index.ts

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { jsPDF } from "npm:jspdf";
import "npm:jspdf-autotable";
import nodemailer from "npm:nodemailer";
import { createClient } from "npm:@supabase/supabase-js";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    // ✦ Fetch logs from Supabase ✦
    const { data, error } = await supabase
      .from("role_action_log")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(100);

    if (error) throw new Error(error.message);

    // ✦ Generate PDF ✦
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("✨ Weekly Role Action Audit Report ✦", 14, 20);

    doc.autoTable({
      head: [["Timestamp", "Actor", "Role", "Action", "Details"]],
      body: data.map((log) => [
        log.timestamp,
        log.actor,
        log.role,
        log.action,
        log.details,
      ]),
      startY: 30,
      styles: { fontSize: 9, cellPadding: 2 },
    });

    const pdfBuffer = doc.output("arraybuffer");

    // ✦ Send via Yahoo SMTP ✦
    const transporter = nodemailer.createTransport({
      service: "Yahoo",
      auth: {
        user: Deno.env.get("YAHOO_USER"),
        pass: Deno.env.get("YAHOO_PASS"),
      },
    });

    await transporter.sendMail({
      from: Deno.env.get("YAHOO_USER"),
      to: "stakeholders@kubatana.org",
      subject: "✨ Weekly Audit Report ✦",
      text: "Attached is the weekly ceremonial audit report.",
      attachments: [
        {
          filename: "audit_report.pdf",
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    return new Response(
      JSON.stringify({ success: true, message: "✨ Report sent successfully." }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("⚠️ Ritual Error:", err.message);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
