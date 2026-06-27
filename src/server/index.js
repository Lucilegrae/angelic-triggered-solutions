import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { atsAuth } from "../middleware/auth.js";
import atsRoutes from "../routes/ats.js";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`[ATS] ${req.method} ${req.url} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "ATS-Core");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// Mount ATS routes
app.use("/ats", atsRoutes);

// Health check
app.get("/ats/health", (req, res) => {
  res.json({
    ok: true,
    service: "ATS API",
    status: "running",
    timestamp: Date.now(),
  });
});

// Info endpoint
app.get("/ats/info", (req, res) => {
  res.json({
    name: "Angelic Triggered Solutions Identity Core",
    version: "1.0.0",
    algorithms: ["ES256"],
    jwks: "/functions/v1/public-jwks",
  });
});

// Protected example
app.get("/ats/protected", atsAuth, (req, res) => {
  res.json({
    ok: true,
    message: "ATS secure endpoint",
    user: req.user,
  });
});

app.listen(3000, () => {
  console.log("ATS API running on port 3000");
});
