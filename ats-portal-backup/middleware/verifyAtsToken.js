import { jwtVerify } from "jose";

export async function verifyAtsToken(token) {
  const JWKS_URL = "https://wtifrlhiyzudgppqswzw.supabase.co/auth/v1/.well-known/jwks.json";
  const JWKS = await fetch(JWKS_URL).then(r => r.json());

  const header = JSON.parse(Buffer.from(token.split(".")[0], "base64").toString());
  const jwk = JWKS.keys.find(k => k.kid === header.kid);

  const publicKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["verify"]
  );

  const { payload } = await jwtVerify(token, publicKey);
  return payload;
}
