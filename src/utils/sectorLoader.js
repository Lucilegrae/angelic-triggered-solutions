/**
 * ATS Portal — Browser-Safe Sector Crest Loader
 * ---------------------------------------------
 * Loads crest images from the public/ directory using URL paths.
 * Works in Next.js App Router (client + server components).
 *
 * IMPORTANT:
 * - This version does NOT use fs or path (browser-safe)
 * - Uses your exact .jpeg crest files
 * - Uses your exact sectorMap
 * - Uses ATS_FEDERATION_SEALS_BASE from .env
 */

const BASE =
  process.env.ATS_FEDERATION_SEALS_BASE ||
  "/certificates/assets/federation-seals";

// Normalize sector keys consistently across ATS
export function normalizeSector(sector) {
  if (!sector) return "unknown";
  return sector.toLowerCase().trim().replace(/\s+/g, "-");
}

// Unified sector → crest mapping (browser-safe)
export const sectorMap = {
  government: "government-sector.jpeg",
  housing: "housing-sector.jpeg",
  insurance: "insurance-sector.jpeg",
  mining: "mining-sector.jpeg",
  transport: "transport-sector.jpeg",
  veterans: "veterans-sector.jpeg",
  councils: "councils-sector.jpeg",
  "community-members": "community-members-sector.jpeg",
  suppliers: "suppliers-sector.jpeg",
  banking: "banking-sector.jpeg",
  corporate: "pvt-ltd-crest.jpeg",
  authentication: "authentication-seal.jpeg",
  authority: "federation-authority-seal.jpeg",

  unknown: "default.jpeg"
};

// Browser-safe crest loader
export function loadSectorCrest(sector) {
  const key = normalizeSector(sector);
  const file = sectorMap[key] || sectorMap["unknown"];
  return `${BASE}/${key}/${file}`;
}

// Load all crest URLs (for dashboards)
export function loadAllCrests() {
  const result = {};

  for (const sector of Object.keys(sectorMap)) {
    const file = sectorMap[sector];
    result[sector] = `${BASE}/${sector}/${file}`;
  }

  return result;
}
