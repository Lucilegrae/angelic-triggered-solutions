#!/bin/bash

# ATS Onboarding Script

read -p "Full Name: " fullname
read -p "National ID: " nid
read -p "Date of Birth (YYYY-MM-DD): " dob
read -p "Age: " age
read -p "Phone: " phone

monthly_contribution=11
doves_share=10
ats_share=1

pension_multiplier=$(echo "500 * (65 - $age) / 47" | bc -l)
pension_value=$(echo "$doves_share * $pension_multiplier" | bc -l)

cat <<EOF > onboarding_payload.json
{
  "full_name": "$fullname",
  "national_id": "$nid",
  "dob": "$dob",
  "age": $age,
  "phone": "$phone",
  "monthly_contribution": $monthly_contribution,
  "doves_share": $doves_share,
  "ats_share": $ats_share,
  "pension_value": $pension_value,
  "member_status": "Onboarded",
  "engine": "ATS-Onboarding"
}
EOF
