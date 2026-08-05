#!/bin/bash

read -p "Certificate Number: " cert

cat <<EOF > certificate_payload.json
{
  "certificate_issued": true,
  "certificate_fee_paid": true,
  "certificate_number": "$cert",
  "member_status": "Certificate Activated",
  "engine": "ATS-Certificate"
}
EOF
