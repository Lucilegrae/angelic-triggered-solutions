#!/bin/bash
OUTPUT_DIR="public/certificates/output"
ARCHIVE_ROOT="public/certificates/archives/batches"
LEDGER="public/certificates/archives/certificate_ledger.csv"
DATESTAMP=$(date +%Y-%m-%d)

# Create dated archive folder
ARCHIVE_DIR="$ARCHIVE_ROOT/$DATESTAMP"
mkdir -p "$ARCHIVE_DIR"

echo "📦 Archiving batch into $ARCHIVE_DIR..."

# Move key artifacts
cp "$OUTPUT_DIR/certificates_booklet.pdf" "$ARCHIVE_DIR/"
cp "$OUTPUT_DIR/dashboard.html" "$ARCHIVE_DIR/"
cp "$LEDGER" "$ARCHIVE_DIR/"

# Copy all generated certificates
cp "$OUTPUT_DIR"/certificate_* "$ARCHIVE_DIR/"

# Copy ceremonial pages (cover, TOC, closing)
cp "$OUTPUT_DIR"/booklet_cover.png "$ARCHIVE_DIR/"
cp "$OUTPUT_DIR"/booklet_toc.png "$ARCHIVE_DIR/"
cp "$OUTPUT_DIR"/booklet_closing.png "$ARCHIVE_DIR/"

echo "✨ Batch archived successfully at $ARCHIVE_DIR"
