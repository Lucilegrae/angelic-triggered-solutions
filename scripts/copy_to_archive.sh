#!/bin/bash
OUTPUT_DIR="public/certificates/output"
ARCHIVE_DIR="public/certificates/archives/$(date +%Y-%m-%d)"

mkdir -p "$ARCHIVE_DIR"

cp "$OUTPUT_DIR"/certificate_*.png "$ARCHIVE_DIR"/

echo "✨ Certificates archived in $ARCHIVE_DIR"
