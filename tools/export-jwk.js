import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { importPKCS8, exportJWK } from "jose";

// Resolve absolute path to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to your private key
const keyPath = path.join(__dirname, "../security/keys/ats-es256-private.pem");

console.log("EXPORT JWK PRIVATE KEY PATH:", keyPath);

// Read private key
const privatePem = fs.readFileSync(keyPath, "utf8");

// Import as PKCS#8 ES256 key
const privateKey = await importPKCS8(privatePem, "ES256");

// Export JWK
const jwk = await exportJWK(privateKey);

console.log(JSON.stringify(jwk, null, 2));
