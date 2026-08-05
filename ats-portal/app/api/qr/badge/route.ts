import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { role, name } = body;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?type=stakeholder&id=${role}`;

  const qr = await QRCode.toDataURL(url, { margin: 1, width: 400 });

  return NextResponse.json({
    role,
    name,
    url,
    qr,
    badge: {
      title: `${role.toUpperCase()} BADGE`,
      name: name || "Unnamed Stakeholder",
      qr,
    },
  });
}
