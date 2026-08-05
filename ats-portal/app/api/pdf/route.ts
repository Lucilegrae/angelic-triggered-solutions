import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { title, items, columns = 3 } = body;

  const doc = new PDFDocument({ size: "A4", margin: 30 });
  const buffers: Uint8Array[] = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  doc.fontSize(22).text(title, { align: "center" });
  doc.moveDown();

  const columnWidth = (doc.page.width - doc.page.margins.left - doc.page.margins.right) / columns;

  let x = doc.page.margins.left;
  let y = doc.y;

  for (const item of items) {
    doc.fontSize(14).text(item.role.toUpperCase(), x, y);

    const qrImage = item.qr.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrImage, "base64");

    doc.image(qrBuffer, x, y + 20, { width: 120, height: 120 });

    doc.fontSize(10).text(item.url, x, y + 150, { width: columnWidth });

    x += columnWidth;

    if (x + columnWidth > doc.page.width - doc.page.margins.right) {
      x = doc.page.margins.left;
      y += 200;
    }
  }

  doc.end();

  const pdfBuffer = Buffer.concat(buffers);

  return NextResponse.json({
    status: "pdf_generated",
    pdf: pdfBuffer.toString("base64"),
  });
}
