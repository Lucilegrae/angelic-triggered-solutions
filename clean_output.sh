#!/bin/bash
# Purify output chamber

OUTPUT_DIR="public/certificates/output"

rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

echo "✨ Output chamber purified at $(date)"
