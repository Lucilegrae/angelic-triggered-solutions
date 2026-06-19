#!/bin/bash

LEDGER="public/certificates/archives/certificate_ledger.csv"
BACKUP="public/certificates/archives/certificate_ledger.backup.$(date +%Y%m%d%H%M%S)"
OUT="public/certificates/archives/certificate_ledger_repaired.csv"

cp "$LEDGER" "$BACKUP"
echo "📦 Backup created: $BACKUP"

HEADER="date,stakeholder,name,certificate_path,uuid,serial,membership,sector_key,ins_uuid"
echo "$HEADER" > "$OUT"

line_no=0

while IFS= read -r line; do
  line_no=$((line_no+1))

  # Skip empty
  [ -z "$line" ] && continue

  # Split by comma
  IFS=',' read -r c1 c2 c3 c4 c5 c6 c7 c8 c9 extra <<< "$line"

  # If fewer than 9 columns, attempt reconstruction
  if [ -z "$c9" ]; then
    echo "⚠️ Attempting repair on line $line_no"

    # Extract UUID from any part of the line
    uuid=$(echo "$line" | grep -oE '[0-9a-fA-F-]{36}' | head -n 1)

    # Extract INS UUID
    ins=$(echo "$line" | grep -oE 'INS-UUID-[a-zA-Z0-9]+' | head -n 1)

    # Extract sector key
    sector=$(echo "$line" | grep -oE '(community|veterans|mining|landowners|partners|steel)[a-zA-Z-]*' | head -n 1)

    # Extract certificate path
    cert=$(echo "$line" | grep -oE 'public/certificates/output/[^, ]+' | head -n 1)

    # Extract serial
    serial=$(echo "$line" | grep -oE 'ATS-[0-9]{8}-[A-Za-z0-9]+' | head -n 1)

    # Extract date
    date=$(echo "$line" | grep -oE '202[0-9]-[0-9]{2}-[0-9]{2}' | head -n 1)

    # Extract name (fallback)
    name=$(echo "$line" | grep -oE '[A-Z][a-z]+(\s[A-Z][a-z]+)+' | head -n 1)

    # Defaults if missing
    [ -z "$uuid" ] && uuid="UUID-MISSING-$line_no"
    [ -z "$ins" ] && ins="INS-UUID-MISSING-$line_no"
    [ -z "$sector" ] && sector="unknown-sector"
    [ -z "$serial" ] && serial="ATS-MISSING-$line_no"
    [ -z "$date" ] && date="2026-01-01"
    [ -z "$name" ] && name="Unknown"
    [ -z "$cert" ] && cert="public/certificates/output/MISSING-$uuid.png"

    # Stakeholder = sector
    stakeholder="$sector"

    # Membership number fallback
    membership=$(echo "$line_no")

    echo "$date,$stakeholder,$name,$cert,$uuid,$serial,$membership,$sector,$ins" >> "$OUT"
    continue
  fi

  # If row is valid, write as-is
  echo "$c1,$c2,$c3,$c4,$c5,$c6,$c7,$c8,$c9" >> "$OUT"

done < "$LEDGER"

echo "✅ Ledger repaired: $OUT"
echo "👉 Replace original when ready:"
echo "   mv \"$OUT\" \"$LEDGER\""
