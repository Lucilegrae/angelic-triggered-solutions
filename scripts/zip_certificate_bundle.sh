#!/bin/bash
# ---------------------------------------------------------
# ATS Federation — Certificate Bundle Generator (ZIP)
# Bundles: Certificate PNG + Metadata JSON + Profile JSON
# ---------------------------------------------------------

INS_UUID=$1

if [ -z "$INS_UUID" ]; then
  echo "Usage: $0 <INS_UUID>"
  exit 1
fi

OUTPUT_DIR="public/certificates/output"
PROFILE_DIR="public/certificates/insurance/profiles"
ARCHIVE_DIR="public/certificates/archives"
BUNDLE_DIR="$ARCHIVE_DIR/bundles"

mkdir -p "$BUNDLE_DIR"

# ---------------------------------------------------------
# Locate files
# ---------------------------------------------------------
META_FILE="$OUTPUT_DIR/${INS_UUID}_metadata.json"
PROFILE_FILE="$PROFILE_DIR/${INS_UUID}.json"
CERT_FILE=$(jq -r '.certificate_path' "$META_FILE" 2>/dev/null)

if [ ! -f "$META_FILE" ]; then
  echo "❌ Metadata file not found for $INS_UUID"
  exit 1
fi

if [ ! -f "$PROFILE_FILE" ]; then
  echo "❌ Profile file not found for $INS_UUID"
  exit 1
fi

if [ ! -f "$CERT_FILE" ]; then
  echo "❌ Certificate PNG not found: $CERT_FILE"
  exit 1
fi

# ---------------------------------------------------------
# Create bundle ZIP
# ---------------------------------------------------------
ZIP_NAME="$BUNDLE_DIR/${INS_UUID}_certificate_bundle.zip"

zip -j "$ZIP_NAME" "$CERT_FILE" "$META_FILE" "$PROFILE_FILE" >/dev/null

echo "📦 Certificate bundle created:"
echo "   $ZIP_NAME"
echo "   ├── Certificate PNG"
echo "   ├── Metadata JSON"
echo "   └── Insurance Profile JSON"
