import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS_URL = "https://wtifrlhiyzudgppqswzw.supabase.co/functions/v1/public-jwks";

// Remote JWKS fetcher (cached + auto-rotating)
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function verifyATS(token) {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, JWKS, {
      algorithms: ["ES256"],
    });

    return {
      valid: true,
      payload,
      header: protectedHeader
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message
    };
  }
}
