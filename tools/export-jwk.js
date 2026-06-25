import { createPublicKey } from "crypto";
import { readFileSync } from "fs";
import { exportJWK } from "jose";

const pem = readFileSync("./ats-es256-private.pem", "utf8");
const pub = createPublicKey(pem);

const jwk = await exportJWK(pub);
console.log(jwk);
