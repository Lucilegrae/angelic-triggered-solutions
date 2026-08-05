#!/bin/bash

read -p "Tier (1,2,3,4,A,B): " tier

case "$tier" in
  "B") priority="Property Tier B (50k)" ;;
  "A") priority="Property Tier A (40k)" ;;
  "4") priority="Tier 4 (25k)" ;;
  "3") priority="Tier 3 (15k)" ;;
  "2") priority="Tier 2 (10k)" ;;
  "1") priority="Tier 1 (5k)" ;;
esac

cat <<EOF > tier_payload.json
{
  "tier": "$tier",
  "priority": "$priority",
  "member_status": "Tier Selected",
  "engine": "ATS-Tier"
}
EOF
