import { jwtVerify } from "jose";

const token = process.argv[2];

const JWKS_URL = "https://wtifrlhiyzudgppqswzw.supabase.co/auth/v1/.well-known/jwks.json";

const JWKS = await fetch(JWKS_URL).then(r => r.json());

const kid = JSON.parse(Buffer.from(token.split('.')[0], 'base64')).kid;

const jwk = JWKS.keys.find(k => k.kid === kid);

if (!jwk) {
  console.error("Key not found in JWKS");
  process.exit(1);
}

const publicKey = await crypto.subtle.importKey(
  "jwk",
  jwk,
  { name: "ECDSA", namedCurve: "P-256" },
  true,
  ["verify"]
);

try {
  const { payload } = await jwtVerify(token, publicKey);
  console.log("VALID SIGNATURE");
  console.log(payload);
} catch (err) {
  console.error("INVALID SIGNATURE");
  console.error(err);
}
