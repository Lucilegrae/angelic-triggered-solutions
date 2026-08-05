/**
 * Shared ATS Sector Logic
 * -----------------------
 * Used by BOTH:
 * - Next.js browser loader (sectorLoader.js)
 * - Termux/Node loader (sectorLoader.node.js)
 */

export const unifiedSectorMap = {
  government: "government-sector",
  housing: "housing-sector",
  insurance: "insurance-sector",
  mining: "mining-sector",
  transport: "transport-sector",
  veterans: "veterans-sector",
  councils: "councils-sector",
  "community-members": "community-members-sector",
  suppliers: "suppliers-sector",
  banking: "banking-sector",
  corporate: "pvt-ltd-crest",
  authentication: "authentication-seal",
  authority: "federation-authority-seal",
  unknown: "default"
};

export function normalizeSector(sector) {
  if (!sector) return "unknown";

  return sector
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")   // replace spaces/symbols with hyphens
    .replace(/-+/g, "-")           // collapse multiple hyphens
    .replace(/^-|-$/g, "");        // trim hyphens
}
