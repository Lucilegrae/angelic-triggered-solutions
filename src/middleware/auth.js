import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pubPath = path.join(__dirname, "../../security/keys/ats-es256-public.pem");

console.log("ATS PUBLIC KEY PATH:", pubPath);

const publicKey = fs.readFileSync(pubPath, "utf8");

console.log("ATS PUBLIC KEY START:", publicKey.slice(0, 40));

export async function atsAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  const token = auth.slice("Bearer ".length).trim();

  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["ES256"],
      audience: "ats-core",
      issuer: "ats-core"
    });

    req.user = decoded;
    next();
  } catch (err) {
    console.error("[ATS AUTH ERROR]", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
