#!/bin/bash
OUT="public/certificates/output/all_certificates.zip"
cd public/certificates/output || exit 1
zip -r all_certificates.zip *.png >/dev/null
echo "📦 Created: $OUT"
