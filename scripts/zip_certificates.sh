#!/bin/bash
OUTPUT_DIR="public/certificates/output"

cd "$OUTPUT_DIR"
zip -r certificates.zip certificate_*.png

echo "✨ All certificates zipped into $OUTPUT_DIR/certificates.zip"
