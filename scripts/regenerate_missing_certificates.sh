#!/bin/bash

LEDGER="public/certificates/archives/certificate_ledger.csv"

if [ ! -f "$LEDGER" ]; then
  echo "Ledger not found: $LEDGER"
  exit 1
fi

line_no=0

while IFS=',' read -r date stakeholder name cert_path uuid serial membership sector ins_uuid; do
  line_no=$((line_no+1))

  # Skip header
  if echo "$date" | grep -qi "date"; then
    continue
  fi

  # Skip invalid rows
  if [ -z "$cert_path" ] || [ -z "$uuid" ]; then
    echo "Skipping line $line_no (missing cert_path or uuid)"
    continue
  fi

  cert_path_trimmed=$(echo "$cert_path" | sed 's/^[ \t]*//;s/[ \t]*$//')

  if [ -f "$cert_path_trimmed" ]; then
    echo "✔ Certificate exists: $cert_path_trimmed"
    continue
  fi

  echo "🧩 Missing certificate — regenerating:"
  echo "   Line: $line_no"
  echo "   Name: $name"
  echo "   Sector: $sector"
  echo "   Serial: $serial"
  echo "   UUID: $uuid"
  echo "   INS UUID: $ins_uuid"
  echo "   Output: $cert_path_trimmed"

  ./scripts/generate_certificate_from_ledger.sh \
    "$date" "$stakeholder" "$name" "$cert_path_trimmed" "$uuid" "$serial" "$membership" "$sector" "$ins_uuid"

done < "$LEDGER"

echo "✅ Certificate regeneration pass complete."
