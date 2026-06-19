#!/bin/bash
LEDGER="public/certificates/archives/certificate_ledger.csv"
OUT_DIR="public/certificates/archives/sector-reports"

mkdir -p "$OUT_DIR"

tail -n +2 "$LEDGER" | awk -F',' '{print $8}' | sort -u | while read -r sector; do
  [ -z "$sector" ] && continue
  out="$OUT_DIR/report_${sector}.csv"
  head -n 1 "$LEDGER" > "$out"
  grep ",${sector}$" "$LEDGER" >> "$out"
  echo "📄 $out"
done
