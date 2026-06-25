import express from "express";
import { atsAuth } from "../middleware/auth.js";
import { signATS } from "../auth/signATS.js";

const app = express();

// -------------------------------
// Core Middleware
// -------------------------------

// Parse JSON bodies safely
app.use(express.json({ limit: "1mb" }));

// Request logger with timing
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`[ATS] ${req.method} ${req.url} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "ATS-Core");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// -------------------------------
// Health & Diagnostics
// -------------------------------

app.get("/ats/health", (req, res) => {
  res.json({
    ok: true,
    service: "ATS API",
    status: "running",
    timestamp: Date.now(),
  });
});

app.get("/ats/info", (req, res) => {
  res.json({
    name: "Angelic Triggered Solutions Identity Core",
    version: "1.0.0",
    algorithms: ["ES256"],
    jwks: "/functions/v1/public-jwks",
  });
});

// -------------------------------
// Token Issuer
// -------------------------------

app.get("/ats/token", async (req, res) => {
  try {
    const token = await signATS({
      sub: "prince",
      role: "ats-admin",
      iss: "ats-core",
    });

    res.json({ token });
  } catch (err) {
    console.error("[ATS TOKEN ERROR]", err);
    res.status(500).json({
      error: "Token generation failed",
      detail: err.message,
    });
  }
});

// -------------------------------
// Protected Routes
// -------------------------------

app.get("/ats/protected", atsAuth, (req, res) => {
  res.json({
    ok: true,
    message: "ATS secure endpoint",
    user: req.user,
  });
});

// Example: Protected admin route
app.get("/ats/admin/overview", atsAuth, (req, res) => {
  if (req.user.role !== "ats-admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }

  res.json({
    ok: true,
    dashboard: "ATS Admin Overview",
    user: req.user,
  });
});

// -------------------------------
// Global Error Handler
// -------------------------------

app.use((err, req, res, next) => {
  console.error("[ATS ERROR]", err);
  res.status(500).json({
    error: "Internal server error",
    detail: err.message,
  });
});

// -------------------------------
// Start Server
// -------------------------------

app.listen(3000, () => {
  console.log("ATS API running on port 3000");
});
