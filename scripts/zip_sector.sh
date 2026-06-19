#!/bin/bash
SECTOR=$1
if [ -z "$SECTOR" ]; then
  echo "Usage: $0 <sector-key>"
  exit 1
fi

OUT="public/certificates/output/${SECTOR}_capacitation.zip"
cd public/certificates/output || exit 1

zip -r "${SECTOR}_capacitation.zip" *"${SECTOR}"*.png >/dev/null

echo "📦 Created: $OUT"
