#!/bin/bash

LEDGER="public/certificates/archives/certificate_ledger.csv"
BACKUP="public/certificates/archives/certificate_ledger.backup.$(date +%Y%m%d%H%M%S)"
OUT="public/certificates/archives/certificate_ledger_restored.csv"

cp "$LEDGER" "$BACKUP"
echo "📦 Backup created: $BACKUP"

echo "Restoring missing UUIDs..."
awk -F',' '{
  if ($5 ~ /^UUID-MISSING-/) {
    cmd="uuidgen"
    cmd | getline newuuid
    close(cmd)
    $5=newuuid
  }
  print $0
}' OFS=',' "$LEDGER" > "$OUT"

echo "✅ Restored ledger written to: $OUT"
echo "👉 Replace original when ready:"
echo "   mv \"$OUT\" \"$LEDGER\""
