import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const privateKeyPem = process.env.ATS_RISK_ES256_PRIVATE_KEY || "";

async function getPrivateKey() {
  return await crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(privateKeyPem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, ""), "base64"),
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    tier,
    insurance_status,
    months_remaining,
    risk_level,
  } = body;

  // Simple heuristic risk score (placeholder)
  let score = 0;
  if (tier === 1) score += 10;
  if (insurance_status === "Uninsured") score += 30;
  if (months_remaining < 3) score += 20;
  if (risk_level === "High Risk") score += 40;

  const prediction = {
    score,
    band:
      score >= 70 ? "Critical" :
      score >= 40 ? "High" :
      score >= 20 ? "Medium" : "Low",
    input: body,
    ts: Date.now(),
  };

  const key = await getPrivateKey();

  const jwt = await new SignJWT(prediction)
    .setProtectedHeader({ alg: "ES256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(key);

  return NextResponse.json({ token: jwt, prediction });
}
