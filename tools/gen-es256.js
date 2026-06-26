import { generateKeyPair } from "crypto";
import { writeFileSync } from "fs";

generateKeyPair(
  "ec",
  {
    namedCurve: "prime256v1",
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem"
    },
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    }
  },
  (err, privateKey, publicKey) => {
    if (err) throw err;

    writeFileSync("ats-es256-private.pem", privateKey);
    writeFileSync("ats-es256-public.pem", publicKey);

    console.log("Generated clean ES256 keypair.");
  }
);
