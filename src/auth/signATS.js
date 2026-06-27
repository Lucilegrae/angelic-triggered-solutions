import { SignJWT, importPKCS8 } from "jose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve absolute path to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct path for your real project structure
// ~/angelic-triggered-solutions/angelic-triggered-solutions/security/keys/ats-es256-private.pem
const keyPath = path.join(__dirname, "../../security/keys/ats-es256-private.pem");

// Debug: show the path being loaded
console.log("ATS PRIVATE KEY PATH:", keyPath);

// Read the private key EXACTLY from the correct location
const privatePem = fs.readFileSync(keyPath, "utf8");

// Debug: show first characters of the key
console.log("ATS PRIVATE KEY START:", privatePem.slice(0, 40));

// Import PKCS#8 ES256 private key
const privateKey = await importPKCS8(privatePem, "ES256");

// Sign ATS JWT
export async function signATS(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "ES256", kid: "ats-es256-key-1" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(privateKey);
}
