import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const body = await req.json();
  const { roles } = body;

  if (!Array.isArray(roles)) {
    return NextResponse.json({ error: "roles must be an array" }, { status: 400 });
  }

  const results: any[] = [];

  for (const role of roles) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?type=stakeholder&id=${role}`;

    const qr = await QRCode.toDataURL(url, {
      margin: 1,
      width: 400,
    });

    results.push({
      role,
      url,
      qr,
    });
  }

  return NextResponse.json({
    count: results.length,
    items: results,
  });
}
