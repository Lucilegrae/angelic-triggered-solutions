import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { importSPKI, exportJWK } from "jose";

// Resolve absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to PUBLIC key (not private)
const pubPath = path.join(__dirname, "../security/keys/ats-es256-public.pem");

console.log("EXPORT PUBLIC JWK PATH:", pubPath);

// Read public key
const publicPem = fs.readFileSync(pubPath, "utf8");

// Import SPKI public key
const publicKey = await importSPKI(publicPem, "ES256");

// Export JWK
const jwk = await exportJWK(publicKey);

console.log(JSON.stringify(jwk, null, 2));
