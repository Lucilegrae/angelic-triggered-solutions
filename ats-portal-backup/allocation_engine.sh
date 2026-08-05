#!/bin/bash

read -p "Tier: " tier
read -p "Priority: " priority
read -p "Unit ID: " unit_id
read -p "Family Slot: " family_slot
read -p "Allocation Clock Start (YYYY-MM-DD): " start_date

cat <<EOF > allocation_payload.json
{
  "tier": "$tier",
  "priority": "$priority",
  "allocation_clock_start": "$start_date",
  "allocation_deadline": null,
  "unit_id": "$unit_id",
  "family_slot": $family_slot,
  "allocation_status": "Allocated",
  "engine": "ATS-Allocation"
}
EOF
