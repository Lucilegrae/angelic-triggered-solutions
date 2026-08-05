#!/bin/bash

read -p "Property Value: " property_value

cat <<EOF > scaling_payload.json
{
  "property_value": $property_value,
  "property_eligible": true,
  "member_status": "Property Scaling Completed",
  "engine": "ATS-Property-Scaling"
}
EOF
