#!/bin/bash

read -p "Current Monthly Contribution: " current_monthly
read -p "Required Monthly Contribution: " required_monthly

if (( $(echo "$current_monthly >= $required_monthly" | bc -l) )); then
  scaling_status="Compliant"
else
  scaling_status="Needs Adjustment"
fi

cat <<EOF > insurance_scaling_payload.json
{
  "current_monthly": $current_monthly,
  "required_monthly": $required_monthly,
  "insurance_scaling_status": "$scaling_status",
  "member_status": "Insurance Scaling Completed",
  "engine": "ATS-Insurance-Scaling"
}
EOF
