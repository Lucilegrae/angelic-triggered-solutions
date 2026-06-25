import { SignJWT, importPKCS8 } from "jose";
import fs from "fs";

const privatePem = fs.readFileSync("./ats-es256-private.pem", "utf8");

const privateKey = await importPKCS8(privatePem, "ES256");

export async function signATS(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "ES256", kid: "ats-es256-key-1" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(privateKey);
}
