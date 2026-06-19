#!/bin/bash

LEDGER="public/certificates/archives/certificate_ledger.csv"
REPORT="public/certificates/archives/ledger_integrity_report_$(date +%Y%m%d%H%M%S).log"

if [ ! -f "$LEDGER" ]; then
  echo "Ledger not found: $LEDGER"
  exit 1
fi

echo "ATS Ledger Integrity Report" > "$REPORT"
echo "Generated at: $(date)" >> "$REPORT"
echo "" >> "$REPORT"

line_no=0
declare -A seen_serial
declare -A seen_ins

while IFS=',' read -r date stakeholder name cert_path uuid serial membership sector ins_uuid; do
  line_no=$((line_no+1))

  # Skip header
  if echo "$date" | grep -qi "date"; then
    continue
  fi

  # Empty line
  if [ -z "$date" ] && [ -z "$stakeholder" ] && [ -z "$name" ]; then
    echo "Line $line_no: EMPTY LINE" >> "$REPORT"
    continue
  fi

  # Column count check
  cols=$(echo "$date,$stakeholder,$name,$cert_path,$uuid,$serial,$membership,$sector,$ins_uuid" | awk -F',' '{print NF}')
  if [ "$cols" -lt 9 ]; then
    echo "Line $line_no: FEWER THAN 9 COLUMNS (found $cols)" >> "$REPORT"
  fi

  # UUID check
  if ! echo "$uuid" | grep -Eq '^[0-9a-fA-F-]{8,}$'; then
    echo "Line $line_no: INVALID UUID FIELD: '$uuid'" >> "$REPORT"
  fi

  # Serial check
  if ! echo "$serial" | grep -Eq '^ATS-'; then
    echo "Line $line_no: INVALID SERIAL FIELD: '$serial'" >> "$REPORT"
  fi

  # INS UUID check
  if ! echo "$ins_uuid" | grep -Eq '^INS-UUID-'; then
    echo "Line $line_no: INVALID INS UUID FIELD: '$ins_uuid'" >> "$REPORT"
  fi

  # Duplicate serial
  if [ -n "$serial" ]; then
    if [ "${seen_serial[$serial]}" ]; then
      echo "Line $line_no: DUPLICATE SERIAL: '$serial' (also at line ${seen_serial[$serial]})" >> "$REPORT"
    else
      seen_serial[$serial]=$line_no
    fi
  fi

  # Duplicate INS UUID
  if [ -n "$ins_uuid" ]; then
    if [ "${seen_ins[$ins_uuid]}" ]; then
      echo "Line $line_no: DUPLICATE INS UUID: '$ins_uuid' (also at line ${seen_ins[$ins_uuid]})" >> "$REPORT"
    else
      seen_ins[$ins_uuid]=$line_no
    fi
  fi

done < "$LEDGER"

echo "" >> "$REPORT"
echo "Integrity scan complete." >> "$REPORT"
echo "Report: $REPORT"

echo "✅ Ledger integrity monitor finished."
echo "📄 See report: $REPORT"
