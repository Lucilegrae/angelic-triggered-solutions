#!/bin/bash

LEDGER="public/certificates/archives/certificate_ledger.csv"
PROFILE_DIR="public/certificates/insurance/profiles"

mkdir -p "$PROFILE_DIR"

if [ ! -f "$LEDGER" ]; then
  echo "Ledger not found: $LEDGER"
  exit 1
fi

line_no=0

while IFS=',' read -r date stakeholder name cert_path uuid serial membership sector ins_uuid; do
  line_no=$((line_no+1))

  # Skip header
  if echo "$date" | grep -qi "date"; then
    echo "Skipping header"
    continue
  fi

  # Basic sanity
  if [ -z "$ins_uuid" ] || ! echo "$ins_uuid" | grep -q '^INS-UUID-'; then
    echo "Skipping line $line_no (no valid INS UUID): $ins_uuid"
    continue
  fi

  profile_file="$PROFILE_DIR/${ins_uuid}.json"

  if [ -f "$profile_file" ]; then
    echo "✅ Profile exists for $ins_uuid (line $line_no) — skipping create"
    continue
  fi

  echo "🆕 Creating profile for $ins_uuid (line $line_no)"

  cat > "$profile_file" <<EOF
{
  "ins_uuid": "$ins_uuid",
  "name": "$name",
  "policy_number": "$serial",
  "policy_company": "ATS",
  "beneficiaries": [],
  "id_number": "PENDING",
  "address": "PENDING",
  "phone": "PENDING",
  "email": "PENDING",
  "subscription_amount": 0,
  "currency": "USD",
  "registered_at": "$date",
  "insured_amount": 0,
  "pension_maturity_date": "PENDING",
  "status": "Uninitialized",
  "upgrades": [],
  "downgrades": []
}
EOF

done < "$LEDGER"

echo "✅ Ledger → profile sync complete."
