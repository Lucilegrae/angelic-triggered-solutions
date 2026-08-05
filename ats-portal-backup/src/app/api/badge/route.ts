import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function POST(req: Request) {
  const body = await req.json();
  const { role, name, qr } = body;

  const doc = new PDFDocument({ size: "A6", margin: 20 });
  const buffers: Uint8Array[] = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  // Header
  doc.fontSize(20).fillColor("#000").text("ATS BADGE", { align: "center" });
  doc.moveDown();

  // Role
  doc.fontSize(16).fillColor("#333").text(role.toUpperCase(), { align: "center" });
  doc.moveDown();

  // Name
  doc.fontSize(14).fillColor("#555").text(name || "Unnamed Stakeholder", { align: "center" });
  doc.moveDown();

  // QR
  const qrImage = qr.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(qrImage, "base64");
  doc.image(qrBuffer, doc.page.width / 2 - 75, doc.y, { width: 150, height: 150 });
  doc.moveDown(2);

  // Golden Star Seal
  doc.fontSize(12).fillColor("#FFD700").text("★ GOLDEN STAR VERIFIED ★", {
    align: "center",
  });

  doc.end();

  const pdfBuffer = Buffer.concat(buffers);

  return NextResponse.json({
    status: "badge_generated",
    pdf: pdfBuffer.toString("base64"),
  });
}
