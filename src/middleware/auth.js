import { verifyATS } from "../auth/verifyATS.js";

export async function atsAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = auth.slice("Bearer ".length);
  const result = await verifyATS(token);

  if (!result.valid) {
    return res.status(401).json({
      error: "Invalid token",
      detail: result.error
    });
  }

  req.user = result.payload;
  next();
}
