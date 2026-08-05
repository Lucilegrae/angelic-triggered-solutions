import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const body = await req.json();
  const { role } = body;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?type=stakeholder&id=${role}`;

  const dataUrl = await QRCode.toDataURL(url, {
    margin: 1,
    width: 400,
  });

  return NextResponse.json({
    role,
    url,
    qr: dataUrl,
  });
}
