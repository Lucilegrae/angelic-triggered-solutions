#!/bin/bash
# Zip all certificates for distribution

OUTPUT_DIR="public/certificates/output"
ZIP_DIR="public/certificates/archives/zips"
mkdir -p "$ZIP_DIR"

STAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ZIPFILE="$ZIP_DIR/certificates_$STAMP.zip"

zip -r "$ZIPFILE" "$OUTPUT_DIR" >/dev/null

echo "📦 Certificates zipped into: $ZIPFILE"
