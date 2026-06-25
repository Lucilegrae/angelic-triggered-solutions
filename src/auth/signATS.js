import { SignJWT, importPKCS8 } from "jose";
import fs from "fs";

// -------------------------------------------------------
// Load the correct ATS ES256 private key (PKCS#8 format)
// Make sure this file matches the public key in public-jwks
// -------------------------------------------------------
const privatePem = fs.readFileSync("./config/keys/ats-es256-private.pem", "utf8");

// Import the private key for ES256 signing
const privateKey = await importPKCS8(privatePem, "ES256");

// -------------------------------------------------------
// ATS Token Signer
// -------------------------------------------------------
export async function signATS(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "ES256", kid: "ats-es256-key-1" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(privateKey);
}
