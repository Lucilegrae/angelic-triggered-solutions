#!/bin/bash
# Batch generator for Circle of Eleven onboarding certificates
# Usage: ./generate_certificates.sh recipients.csv

# CSV format: Name,Branch,Date
INPUT_FILE="$1"
OUTPUT_DIR="./public/certificates/output"
TEMPLATE="./public/certificates/certificate.html"

mkdir -p "$OUTPUT_DIR"

while IFS=',' read -r NAME BRANCH DATE
do
  # Skip header line if present
  if [[ "$NAME" == "Name" ]]; then
    continue
  fi

  # Create a temporary HTML file with placeholders replaced
  TMP_FILE=$(mktemp)
  sed "s/\[Recipient Name\]/$NAME/g; \
       s/\[Branch Name\]/$BRANCH/g; \
       s/\[Onboarding Date\]/$DATE/g" \
       "$TEMPLATE" > "$TMP_FILE"

  # Export to PDF (requires wkhtmltopdf installed)
  OUTPUT_FILE="$OUTPUT_DIR/${NAME// /_}_${BRANCH}_${DATE}.pdf"
  wkhtmltopdf "$TMP_FILE" "$OUTPUT_FILE"

  echo "Generated certificate: $OUTPUT_FILE"

  rm "$TMP_FILE"
done < "$INPUT_FILE"
