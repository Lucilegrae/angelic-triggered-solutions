#!/bin/bash
OUTPUT_DIR="public/certificates/output"

echo "🧹 Cleaning output chamber..."
rm -f "$OUTPUT_DIR"/certificate_*.png
rm -f "$OUTPUT_DIR"/certificates.zip

echo "✨ Output chamber purified. Ready for new batch."
