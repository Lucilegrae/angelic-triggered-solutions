#!/bin/bash

SECTOR="$1"

TEMPLATES_DIR="public/certificates/archives/federation-master/certificates"

case "$SECTOR" in
  "Government") echo "$TEMPLATES_DIR/certificate_GOVERNMENT.png" ;;
  "Banks") echo "$TEMPLATES_DIR/certificate_BANKING.png" ;;
  "Communities") echo "$TEMPLATES_DIR/certificate_COMMUNITY.png" ;;
  "Community Members") echo "$TEMPLATES_DIR/certificate_COMMUNITY.png" ;;
  "Councils") echo "$TEMPLATES_DIR/certificate_COUNCILS.png" ;;
  "Miners") echo "$TEMPLATES_DIR/certificate_MINERS.png" ;;
  "Investors") echo "$TEMPLATES_DIR/certificate_PARTNERS.png" ;;
  "Supplier Profiles") echo "$TEMPLATES_DIR/certificate_PARTNERS.png" ;;
  "Insurance Profiles") echo "$TEMPLATES_DIR/certificate_INSURANCE.png" ;;
  "Transporter Profiles") echo "$TEMPLATES_DIR/certificate_MASTER.png" ;;
  "Donor Profiles") echo "$TEMPLATES_DIR/certificate_MASTER.png" ;;
  *)
    echo ""
    ;;
esac
