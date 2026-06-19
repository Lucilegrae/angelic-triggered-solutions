// ---------------------------------------------------------
// ATS Federation — Sector Certificate Loader
// Author: Prince Masvikepi (Angelic Triggered Solutions)
// ---------------------------------------------------------

const path = require("path");
const fs = require("fs");

// Base directory for federation seals
const BASE = path.join(
  process.env.HOME,
  "angelic-triggered-solutions/angelic-triggered-solutions/public/certificates/assets/federation-seals"
);

// Sector → Crest File Mapping
const sectorMap = {
  government: "government-sector.jpeg",
  housing: "housing-sector.jpeg",
  insurance: "insurance-sector.jpeg",
  mining: "mining-sector.jpeg",
  transport: "transport-sector.jpeg",
  veterans: "veterans-sector.jpeg",
  councils: "councils-sector.jpeg",
  "community-members": "community-members-sector.jpeg",
  suppliers: "suppliers-sector.jpeg",
  corporate: "pvt-ltd-crest.jpeg",
  authentication: "authentication-seal.jpeg",
  authority: "federation-authority-seal.jpeg"
};

// ---------------------------------------------------------
// Load a single sector crest
// ---------------------------------------------------------
function loadSectorCrest(sector) {
  const key = sector.toLowerCase().trim();
  const file = sectorMap[key];

  if (!file) {
    throw new Error(`Unknown sector: ${sector}`);
  }

  const fullPath = path.join(BASE, key, file);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Crest not found at: ${fullPath}`);
  }

  return fullPath;
}

// ---------------------------------------------------------
// Load all sector crests at once (for dashboards)
// ---------------------------------------------------------
function loadAllCrests() {
  const result = {};

  for (const sector of Object.keys(sectorMap)) {
    const file = sectorMap[sector];
    const fullPath = path.join(BASE, sector, file);

    if (fs.existsSync(fullPath)) {
      result[sector] = fullPath;
    } else {
      result[sector] = null;
    }
  }

  return result;
}

// ---------------------------------------------------------
// Export for use in certificate generator
// ---------------------------------------------------------
module.exports = {
  loadSectorCrest,
  loadAllCrests,
  sectorMap
};
