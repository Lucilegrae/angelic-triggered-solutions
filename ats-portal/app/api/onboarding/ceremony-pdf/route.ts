import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { data: stakeholder } = await supabase
    .from("stakeholders")
    .select("full_name, national_id, ministry, role, dashboard_path")
    .eq("id", body.stakeholder_id)
    .single();

  const { data: ceremony } = await supabase
    .from("onboarding_events")
    .select("verification_token")
    .eq("stakeholder_id", body.stakeholder_id)
    .eq("event_type", "Ceremony")
    .single();

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([600, 800]);
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  // QR Code
  const qrDataUrl = await QRCode.toDataURL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ministry/onboarding/verify?token=${ceremony.verification_token}`
  );
  const qrImage = await pdf.embedPng(qrDataUrl);
  page.drawImage(qrImage, {
    x: 400,
    y: 600,
    width: 150,
    height: 150
  });

  // Seal
  page.drawText("ATS Ceremony Seal", {
    x: 50,
    y: 750,
    size: 24,
    font,
    color: rgb(0.8, 0.7, 0.1)
  });

  page.drawText("Scan QR to verify authenticity", {
    x: 400,
    y: 560,
    size: 12
  });

  // Certificate body
  page.drawText(`Name: ${stakeholder.full_name}`, { x: 50, y: 700, size: 16 });
  page.drawText(`National ID: ${stakeholder.national_id}`, { x: 50, y: 670, size: 16 });
  page.drawText(`Ministry: ${stakeholder.ministry}`, { x: 50, y: 640, size: 16 });
  page.drawText(`Role: ${stakeholder.role}`, { x: 50, y: 610, size: 16 });
  page.drawText(`Dashboard: ${stakeholder.dashboard_path}`, { x: 50, y: 580, size: 16 });

  const pdfBytes = await pdf.save();
  const base64 = Buffer.from(pdfBytes).toString("base64");

  return NextResponse.json({ ok: true, pdf_base64: base64 });
}

/* ────────────────────────────────────────────────
   ATS Sovereign Ceremony Seal — Security Microtext
   ──────────────────────────────────────────────── */

const microText = `ATS • SOVEREIGN • VERIFIED • ${stakeholder.id} • ${stakeholder.sector} • ${new Date().toISOString()}`;
const microRepeat = microText.repeat(8); // repeating pattern

// Microtext ring parameters
const microRadius = sealSize + 25;
const microX = sealX + sealSize / 2;
const microY = sealY + sealSize / 2;

// Draw microtext around the seal in small angular increments
for (let i = 0; i < microRepeat.length; i++) {
  const angle = (i / microRepeat.length) * 2 * Math.PI;

  const x = microX + microRadius * Math.cos(angle);
  const y = microY + microRadius * Math.sin(angle);

  page.drawText(microRepeat[i], {
    x,
    y,
    size: 4, // microtext size
    font,
    color: rgb(0.95, 0.85, 0.35),
    opacity: 0.9,
    rotate: angle
  });
}

// Micro‑glyph authenticity markers
const glyphs = ["✦", "✧", "❖", "✪", "✩"];
glyphs.forEach((g, idx) => {
  page.drawText(g, {
    x: microX + (microRadius + 10) * Math.cos(idx),
    y: microY + (microRadius + 10) * Math.sin(idx),
    size: 6,
    font,
    color: rgb(0.95, 0.85, 0.35),
    opacity: 0.8
  });
});

