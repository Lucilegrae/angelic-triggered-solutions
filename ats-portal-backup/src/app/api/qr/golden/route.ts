import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, type } = body;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/certificate?id=${id}`;

  const qr = await QRCode.toDataURL(url, {
    margin: 1,
    width: 500,
    color: {
      dark: "#FFD700",
      light: "#FFFFFF",
    },
  });

  return NextResponse.json({
    id,
    type,
    url,
    qr,
    signature: "GOLDEN_STAR_VERIFICATION",
  });
}
