import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const body = await req.json();
  const { roles } = body;

  const items = [];

  for (const role of roles) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?type=stakeholder&id=${role}`;
    const qr = await QRCode.toDataURL(url, { margin: 1, width: 400 });

    items.push({
      role,
      url,
      qr,
      label: `${role.toUpperCase()} — ATS Onboarding`,
    });
  }

  return NextResponse.json({
    count: items.length,
    items,
    export: {
      type: "pdf-ready",
      layout: "grid",
      columns: 3,
      margin: 10,
    },
  });
}
