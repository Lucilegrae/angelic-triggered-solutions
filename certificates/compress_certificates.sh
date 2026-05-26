#!/bin/bash
# Batch compression for ceremonial certificates

OUTPUT_DIR="../public/certificates/output"
TARGET_DIR="$HOME/storage/documents/certificates"

mkdir -p "$TARGET_DIR"

for file in "$OUTPUT_DIR"/*.pdf; do
  base=$(basename "$file" .pdf)
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
     -dNOPAUSE -dQUIET -dBATCH \
     -sOutputFile="$TARGET_DIR/${base}_small.pdf" "$file"
  echo "✅ Compressed: ${base}_small.pdf"
done
