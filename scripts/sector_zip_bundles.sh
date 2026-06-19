#!/bin/bash
# ---------------------------------------------------------
# ATS Federation — Sector-Based Certificate Bundler (ZIP)
# Bundles all certificates, metadata, and profiles by sector
# ---------------------------------------------------------

OUTPUT_DIR="public/certificates/output"
PROFILE_DIR="public/certificates/insurance/profiles"
ARCHIVE_DIR="public/certificates/archives"
BUNDLE_DIR="$ARCHIVE_DIR/sector-bundles"

mkdir -p "$BUNDLE_DIR"

echo "🔍 Building sector-based certificate bundles..."

# Loop through all metadata files
for meta in "$OUTPUT_DIR"/*_metadata.json; do
  [ -f "$meta" ] || continue

  # Extract fields
  INS_UUID=$(jq -r '.ins_uuid' "$meta")
  SECTOR=$(jq -r '.sector' "$meta" | tr 'A-Z' 'a-z' | sed 's/ /-/g')
  CERT_PATH=$(jq -r '.certificate_path' "$meta")

  PROFILE_FILE="$PROFILE_DIR/${INS_UUID}.json"

  if [ ! -f "$PROFILE_FILE" ]; then
    echo "⚠️  Missing profile for $INS_UUID — skipping"
    continue
  fi

  if [ ! -f "$CERT_PATH" ]; then
    echo "⚠️  Missing certificate PNG for $INS_UUID — skipping"
    continue
  fi

  # Sector ZIP name
  ZIP_NAME="$BUNDLE_DIR/${SECTOR}_sector_bundle.zip"

  # Add files to ZIP
  zip -j "$ZIP_NAME" "$CERT_PATH" "$meta" "$PROFILE_FILE" >/dev/null

  echo "📦 Added to $SECTOR bundle → $INS_UUID"
done

echo "🎉 Sector-based bundles created in: $BUNDLE_DIR"
