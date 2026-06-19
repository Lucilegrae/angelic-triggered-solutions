#!/bin/bash
# ---------------------------------------------------------
# ATS Federation — Full Federation Archive (ZIP)
# Bundles EVERYTHING into one master archive
# ---------------------------------------------------------

OUTPUT_DIR="public/certificates/output"
PROFILE_DIR="public/certificates/insurance/profiles"
ARCHIVE_DIR="public/certificates/archives"
SECTOR_BUNDLES="$ARCHIVE_DIR/sector-bundles"
ANALYTICS_FILE="public/certificates/insurance/sector_analytics.json"
LEDGER="$ARCHIVE_DIR/certificate_ledger.csv"
COUNTER_DIR="$ARCHIVE_DIR/counters"

MASTER_DIR="$ARCHIVE_DIR/federation-master"
mkdir -p "$MASTER_DIR"

echo "🔍 Building Federation-Wide Archive..."

# ---------------------------------------------------------
# Copy certificates
# ---------------------------------------------------------
mkdir -p "$MASTER_DIR/certificates"
cp -f "$OUTPUT_DIR"/*.png "$MASTER_DIR/certificates/" 2>/dev/null
cp -f "$OUTPUT_DIR"/*_metadata.json "$MASTER_DIR/certificates/" 2>/dev/null

# ---------------------------------------------------------
# Copy profiles
# ---------------------------------------------------------
mkdir -p "$MASTER_DIR/profiles"
cp -f "$PROFILE_DIR"/*.json "$MASTER_DIR/profiles/" 2>/dev/null

# ---------------------------------------------------------
# Copy sector bundles
# ---------------------------------------------------------
mkdir -p "$MASTER_DIR/sector-bundles"
cp -f "$SECTOR_BUNDLES"/*.zip "$MASTER_DIR/sector-bundles/" 2>/dev/null

# ---------------------------------------------------------
# Copy ledger + analytics + counters
# ---------------------------------------------------------
cp -f "$LEDGER" "$MASTER_DIR/" 2>/dev/null
cp -f "$ANALYTICS_FILE" "$MASTER_DIR/" 2>/dev/null

mkdir -p "$MASTER_DIR/counters"
cp -f "$COUNTER_DIR"/*.count "$MASTER_DIR/counters/" 2>/dev/null

# ---------------------------------------------------------
# Create master ZIP
# ---------------------------------------------------------
ZIP_NAME="$ARCHIVE_DIR/ATS_Federation_Master_Archive_$(date +%Y%m%d).zip"

cd "$MASTER_DIR"
zip -r "../$(basename "$ZIP_NAME")" . >/dev/null
cd - >/dev/null

echo "🎉 Federation-Wide Archive Created:"
echo "   $ZIP_NAME"
echo "   ├── All Certificates"
echo "   ├── All Metadata"
echo "   ├── All Profiles"
echo "   ├── Sector Bundles"
echo "   ├── Ledger"
echo "   ├── Sector Analytics"
echo "   └── Counters"
