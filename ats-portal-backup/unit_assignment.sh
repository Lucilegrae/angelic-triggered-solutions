#!/bin/bash

read -p "Unit ID: " unit_id
read -p "Current Families (0-4): " current_families
read -p "Allocation Clock Start (YYYY-MM-DD): " start_date

family_slot=$((current_families + 1))

cat <<EOF > unit_assignment_payload.json
{
  "unit_id": "$unit_id",
  "family_slot": $family_slot,
  "allocation_clock_start": "$start_date",
  "allocation_deadline": null,
  "allocation_status": "Unit Assigned",
  "engine": "ATS-Unit-Assignment"
}
EOF
