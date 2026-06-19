#!/bin/bash
LEDGER="public/certificates/archives/certificate_ledger.csv"
OUT_JSON="public/certificates/output/ledger.json"

mkdir -p "$(dirname "$OUT_JSON")"

# CSV → JSON (simple awk-based)
tail -n +2 "$LEDGER" | awk -F',' '
BEGIN {
  print "["
}
{
  gsub(/"/, "\\\"", $0);
  printf "%s{\"Date\":\"%s\",\"Stakeholder\":\"%s\",\"Name\":\"%s\",\"Certificate_File\":\"%s\",\"UUID\":\"%s\",\"Serial_Number\":\"%s\",\"Membership_Number\":\"%s\",\"Sector_Key\":\"%s\"}", (NR==1?"":","), $1,$2,$3,$4,$5,$6,$7,$8
}
END {
  print "\n]"
}' > "$OUT_JSON"

echo "📘 Ledger JSON generated: $OUT_JSON"
