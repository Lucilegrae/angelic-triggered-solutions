import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS_URL =
  "https://wtifrlhiyzudgppqswzw.supabase.co/functions/v1/public-jwks";

const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function verifyATS(token) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: "ats-core",
      audience: "ats-core",
    });

    return {
      valid: true,
      payload,
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message,
    };
  }
}
