import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { data: template } = await supabase
    .from("ministry_auto_fill_templates")
    .select("*")
    .eq("id", body.template_id)
    .single();

  const { data: stakeholder } = await supabase
    .from("stakeholders")
    .select("*")
    .eq("id", body.stakeholder_id)
    .single();

  const { data: state } = await supabase
    .from("onboarding_state")
    .select("*")
    .eq("stakeholder_id", body.stakeholder_id)
    .single();

  const existingPdfBytes = await fetch(template.template_url).then(r => r.arrayBuffer());
  const pdf = await PDFDocument.load(existingPdfBytes);
  const page = pdf.getPages()[0];
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const fields = template.autofill_fields;

  Object.keys(fields).forEach((key, idx) => {
    const value = stakeholder[key] || state[key] || "";
    page.drawText(`${key}: ${value}`, {
      x: 50,
      y: 700 - idx * 20,
      size: 12,
      font,
      color: rgb(0, 0, 0)
    });
  });

  const pdfBytes = await pdf.save();
  const base64 = Buffer.from(pdfBytes).toString("base64");

  return NextResponse.json({ ok: true, pdf_base64: base64 });
}
