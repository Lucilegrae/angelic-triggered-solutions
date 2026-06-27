console.log("ATS ROUTES LOADED FROM:", import.meta.url);

import express from "express";
import { signATS } from "../auth/signATS.js";
import { generateRefreshToken } from "../auth/refreshToken.js";
import { supabase } from "../db/supabase.js";
import { atsAuth } from "../middleware/auth.js";
import { computeIpRisk, computeGeoRisk } from "../security/risk.js";

const router = express.Router();

/**
 * ISSUE ACCESS + REFRESH TOKENS + DEVICE + SESSION
 */
router.post("/token", async (req, res) => {
  try {
    const accessToken = await signATS({
      sub: "prince",
      role: "ats-admin",
      iss: "ats-core",
      aud: "ats-core"
    });

    const refreshToken = generateRefreshToken();

    const deviceId = req.headers["x-device-id"] || generateRefreshToken().slice(0, 32);
    const deviceName = req.headers["x-device-name"] || "Unknown Device";
    const ip = req.ip;
    const agent = req.headers["user-agent"];
    const country = req.headers["x-geo-country"] || null;
    const city = req.headers["x-geo-city"] || null;

    const ipRisk = computeIpRisk(ip);
    const geoRisk = computeGeoRisk(country, city);
    const totalRisk = ipRisk + geoRisk;

    await supabase.from("ats_refresh_tokens").insert({
      user_id: "prince",
      token: refreshToken,
      reused: false,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      last_used_at: new Date()
    });

    await supabase.from("ats_devices").upsert({
      user_id: "prince",
      device_id: deviceId,
      device_name: deviceName,
      ip_address: ip,
      user_agent: agent,
      refresh_token: refreshToken,
      last_seen_at: new Date(),
      risk_score: totalRisk,
      geo_country: country,
      geo_city: city,
      last_ip: ip
    });

    await supabase.from("ats_sessions").insert({
      user_id: "prince",
      device_id: deviceId,
      ip_address: ip,
      user_agent: agent,
      risk_score: totalRisk,
      active: true
    });

    return res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      device_id: deviceId,
      risk_score: totalRisk
    });
  } catch (err) {
    console.error("TOKEN ERROR:", err);
    return res.status(500).json({ error: "Failed to issue tokens" });
  }
});

/**
 * REFRESH TOKEN + REUSE DETECTION + DEVICE UPDATE
 */
router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: "Missing refresh token" });
  }

  const { data: tokenRecord, error } = await supabase
    .from("ats_refresh_tokens")
    .select("*")
    .eq("token", refresh_token)
    .single();

  if (error || !tokenRecord) {
    console.log("[ATS SECURITY] Refresh token reuse detected:", refresh_token);
    return res.status(401).json({ error: "Refresh token invalid or reused" });
  }

  if (tokenRecord.reused === true) {
    console.log("[ATS SECURITY] Blocked reused refresh token:", refresh_token);
    return res.status(401).json({ error: "Refresh token already used" });
  }

  if (new Date(tokenRecord.expires_at) < new Date()) {
    return res.status(401).json({ error: "Refresh token expired" });
  }

  const newRefreshToken = generateRefreshToken();

  await supabase
    .from("ats_refresh_tokens")
    .update({
      reused: true,
      last_used_at: new Date()
    })
    .eq("id", tokenRecord.id);

  await supabase.from("ats_refresh_tokens").insert({
    user_id: tokenRecord.user_id,
    token: newRefreshToken,
    reused: false,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    last_used_at: new Date()
  });

  await supabase.from("ats_devices")
    .update({
      refresh_token: newRefreshToken,
      last_seen_at: new Date()
    })
    .eq("refresh_token", refresh_token);

  const newAccessToken = await signATS({
    sub: tokenRecord.user_id,
    role: "ats-admin",
    iss: "ats-core",
    aud: "ats-core"
  });

  return res.json({
    access_token: newAccessToken,
    refresh_token: newRefreshToken
  });
});

/**
 * LOGOUT (REVOKE REFRESH TOKEN + SESSION)
 */
router.post("/logout", async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: "Missing refresh token" });
  }

  await supabase
    .from("ats_refresh_tokens")
    .delete()
    .eq("token", refresh_token);

  await supabase
    .from("ats_devices")
    .update({ refresh_token: null })
    .eq("refresh_token", refresh_token);

  await supabase
    .from("ats_sessions")
    .update({ active: false, last_seen_at: new Date() })
    .eq("user_id", "prince");

  return res.json({ ok: true });
});

/**
 * LIST DEVICES
 */
router.get("/devices", atsAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("ats_devices")
    .select("*")
    .eq("user_id", req.user.sub);

  if (error) return res.status(500).json({ error: "Failed to load devices" });

  res.json({ devices: data });
});

/**
 * REVOKE DEVICE SESSION
 */
router.post("/devices/revoke", atsAuth, async (req, res) => {
  const { device_id } = req.body;

  await supabase.from("ats_devices")
    .delete()
    .eq("device_id", device_id)
    .eq("user_id", req.user.sub);

  await supabase.from("ats_sessions")
    .update({ active: false, last_seen_at: new Date() })
    .eq("device_id", device_id)
    .eq("user_id", req.user.sub);

  res.json({ ok: true });
});

/**
 * SESSION DASHBOARD (JSON)
 */
router.get("/sessions", atsAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("ats_sessions")
    .select("*")
    .eq("user_id", req.user.sub)
    .order("last_seen_at", { ascending: false });

  if (error) return res.status(500).json({ error: "Failed to load sessions" });

  res.json({ sessions: data });
});

export default router;
