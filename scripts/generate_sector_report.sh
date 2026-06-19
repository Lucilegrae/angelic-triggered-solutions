#!/bin/bash
LEDGER="public/certificates/archives/certificate_ledger.csv"
SECTOR_KEY=$1

if [ -z "$SECTOR_KEY" ]; then
  echo "Usage: $0 <sector-key>"
  exit 1
fi

OUT="public/certificates/archives/report_${SECTOR_KEY}.csv"
grep -i ",${SECTOR_KEY}$" "$LEDGER" > "$OUT"

echo "📄 Sector report generated: $OUT"
