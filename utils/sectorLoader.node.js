/**
 * ATS Certificate Generator — Node Loader
 * ---------------------------------------
 * Loads crest images from the filesystem (Termux).
 * Used ONLY by:
 * - generate_sector_certificate.sh
 * - Node-based certificate tools
 */

const path = require("path");
const fs = require("fs");
const { normalizeSector, unifiedSectorMap } = require("./sectorCore");

const BASE = process.env.ATS_FEDERATION_SEALS_BASE;

function loadSectorCrest(sector) {
  const key = normalizeSector(sector);
  const fileBase = unifiedSectorMap[key] || unifiedSectorMap["unknown"];
  const fullPath = path.join(BASE, key, `${fileBase}.jpeg`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Crest not found at: ${fullPath}`);
  }

  return fullPath;
}

function loadAllCrests() {
  const result = {};

  for (const key of Object.keys(unifiedSectorMap)) {
    const fileBase = unifiedSectorMap[key];
    const fullPath = path.join(BASE, key, `${fileBase}.jpeg`);
    result[key] = fs.existsSync(fullPath) ? fullPath : null;
  }

  return result;
}

module.exports = {
  loadSectorCrest,
  loadAllCrests
};
