#!/bin/bash
INS_DIR="public/certificates/insurance/profiles"
mkdir -p "$INS_DIR"

read -rp "INS UUID (e.g. INS-UUID-1234): " INS_UUID
read -rp "Name: " NAME
read -rp "Policy Number: " POLICY_NUM
read -rp "Policy Company: " POLICY_CO
read -rp "Beneficiaries (comma-separated): " BENEF
read -rp "ID Number: " ID_NUM
read -rp "Address: " ADDRESS
read -rp "Phone: " PHONE
read -rp "Email Address: " EMAIL
read -rp "Subscription Amount (number): " SUB_AMT
read -rp "Currency (e.g. USD): " CURR
read -rp "Date of Registration (YYYY-MM-DD): " REG_DATE
read -rp "Insured Amount: " INSURED
read -rp "Pension Maturity Date (YYYY-MM-DD): " MAT_DATE
read -rp "Current Status (Active/Inactive/etc): " STATUS

FILE="$INS_DIR/${INS_UUID}.json"

cat > "$FILE" <<EOF
{
  "ins_uuid": "$INS_UUID",
  "name": "$NAME",
  "policy_number": "$POLICY_NUM",
  "policy_company": "$POLICY_CO",
  "beneficiaries": [$(printf '"%s"' "$(echo "$BENEF" | sed 's/, /","/g; s/,/","/g')")],
  "id_number": "$ID_NUM",
  "address": "$ADDRESS",
  "phone": "$PHONE",
  "email": "$EMAIL",
  "subscription_amount": $SUB_AMT,
  "currency": "$CURR",
  "registered_at": "$REG_DATE",
  "insured_amount": $INSURED,
  "pension_maturity_date": "$MAT_DATE",
  "status": "$STATUS",
  "upgrades": [],
  "downgrades": []
}
EOF

echo "✅ Insurance profile saved: $FILE"
