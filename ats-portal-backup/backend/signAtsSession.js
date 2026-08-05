const jwt = require("jsonwebtoken");
const fs = require("fs");
const crypto = require("crypto");

// Load ES256 private key (PKCS#8)
const privateKey = fs.readFileSync("ats-es256-private-pkcs8.pem", "utf8");

/**
 * Sign ATS Session Token
 *
 * @param {string} userId - ATS user UUID
 * @param {string} stakeholder - Stakeholder category
 * @param {string} sector - Sector name
 * @param {string} ins_uuid - Installation UUID
 * @param {string|null} ministry - Ministry name if stakeholder = Government
 * @param {object} permissions - Permission object
 */
function signAtsSession(userId, stakeholder, sector, ins_uuid, ministry = null, permissions = {}) {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    sub: userId,
    iss: "https://wtifrlhiyzudgppqswzw.supabase.co",
    aud: "authenticated",
    iat: now,
    exp: now + 3600,

    stakeholder,
    ministry,
    sector,
    ins_uuid,
    ats_session_id: crypto.randomUUID(),

    permissions
  };

  return jwt.sign(payload, privateKey, {
    algorithm: "ES256",
    keyid: "e11141fb-19b4-4c22-8d1e-44a32f9b38bb"
  });
}

module.exports = { signAtsSession };
