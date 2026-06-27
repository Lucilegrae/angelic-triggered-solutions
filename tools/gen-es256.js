import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";

const { privateKey, publicKey } = generateKeyPairSync("ec", {
  namedCurve: "prime256v1",
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem"
  },
  publicKeyEncoding: {
    type: "spki",
    format: "pem"
  }
});

writeFileSync("ats-es256-private.pem", privateKey);
writeFileSync("ats-es256-public.pem", publicKey);

console.log("Generated clean ES256 keypair.");

