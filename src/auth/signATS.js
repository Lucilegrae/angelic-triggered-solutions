import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve absolute path to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path for your real project structure:
// ~/angelic-triggered-solutions/angelic-triggered-solutions/security/keys/ats-es256-private.pem
const keyPath = path.join(__dirname, "../../security/keys/ats-es256-private.pem");

// Debug: show the path being loaded
console.log("ATS PRIVATE KEY PATH:", keyPath);

// Read the private key EXACTLY from the correct location
const privateKey = fs.readFileSync(keyPath, "utf8");

// Debug: show first characters of the key
console.log("ATS PRIVATE KEY START:", privateKey.slice(0, 40));

// Sign ATS JWT using jsonwebtoken ES256
export async function signATS(payload) {
  const now = Math.floor(Date.now() / 1000);

  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + 7200 // 2 hours
  };

  return jwt.sign(fullPayload, privateKey, {
    algorithm: "ES256",
    keyid: "ats-es256-key-1"
  });
}
