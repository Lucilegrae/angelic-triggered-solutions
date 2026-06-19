#!/bin/bash
LEDGER="public/certificates/archives/certificate_ledger.csv"
BACKUP="public/certificates/archives/certificate_ledger.backup.$(date +%Y%m%d%H%M%S)"
OUT="public/certificates/archives/certificate_ledger_repaired.csv"

if [ ! -f "$LEDGER" ]; then
  echo "Ledger not found: $LEDGER"
  exit 1
fi

cp "$LEDGER" "$BACKUP"
echo "📦 Backup created: $BACKUP"

# Optional: write header if you want a fixed header
HEADER="date,stakeholder,name,certificate_path,uuid,serial,membership,sector_key,ins_uuid"
echo "$HEADER" > "$OUT"

line_no=0
while IFS= read -r line; do
  line_no=$((line_no+1))

  # Skip empty lines
  if [ -z "$line" ]; then
    echo "⚠️  Skipping empty line $line_no"
    continue
  fi

  # Skip header if it already exists
  if echo "$line" | grep -qi "certificate_path"; then
    echo "ℹ️  Skipping existing header at line $line_no"
    continue
  fi

  IFS=',' read -r c1 c2 c3 c4 c5 c6 c7 c8 c9 extra <<< "$line"

  # Basic sanity checks
  # 1) Must have at least 9 columns
  if [ -z "$c9" ]; then
    echo "❌ Line $line_no has fewer than 9 columns, skipping:"
    echo "   $line"
    continue
  fi

  # 2) UUID should look like a UUID (very loose check)
  if ! echo "$c5" | grep -Eq '^[0-9a-fA-F-]{8,}$'; then
    echo "❌ Line $line_no has invalid UUID field, skipping:"
    echo "   $line"
    continue
  fi

  # 3) Serial should start with ATS-
  if ! echo "$c6" | grep -Eq '^ATS-'; then
    echo "❌ Line $line_no has invalid serial field, skipping:"
    echo "   $line"
    continue
  fi

  # 4) INS UUID should start with INS-UUID-
  if ! echo "$c9" | grep -Eq '^INS-UUID-'; then
    echo "❌ Line $line_no has invalid INS UUID field, skipping:"
    echo "   $line"
    continue
  fi

  # If we reach here, we consider the row valid
  echo "$c1,$c2,$c3,$c4,$c5,$c6,$c7,$c8,$c9" >> "$OUT"
done < "$LEDGER"

echo "✅ Repaired ledger written to: $OUT"
echo "👉 Review it, then replace the original if satisfied:"
echo "   mv \"$OUT\" \"$LEDGER\""
