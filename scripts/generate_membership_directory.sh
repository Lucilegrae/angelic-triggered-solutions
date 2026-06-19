#!/bin/bash
LEDGER="public/certificates/archives/certificate_ledger.csv"
OUT_HTML="public/certificates/output/membership_directory.html"

mkdir -p "$(dirname "$OUT_HTML")"

cat > "$OUT_HTML" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ATS Sector Membership Directory</title>
<style>
body { font-family: system-ui, sans-serif; background:#f5f5f8; padding:20px; }
h1 { text-align:center; }
table { border-collapse: collapse; width:100%; margin-top:20px; }
th, td { border:1px solid #ccc; padding:8px; font-size:14px; }
th { background:#222; color:#fff; }
tr:nth-child(even) { background:#f0f0f0; }
.sector { font-weight:bold; }
</style>
</head>
<body>
<h1>ATS Sector Membership Directory</h1>
<table>
<tr>
  <th>Date</th>
  <th>Sector</th>
  <th>Name</th>
  <th>Membership No</th>
  <th>UUID</th>
  <th>Serial</th>
  <th>Certificate</th>
</tr>
EOF
# append rows
tail -n +2 "$LEDGER" | while IFS=',' read -r date stakeholder name cert uuid serial member sector; do
  echo "<tr>" >> "$OUT_HTML"
  echo "<td>${date}</td>" >> "$OUT_HTML"
  echo "<td class=\"sector\">${stakeholder}</td>" >> "$OUT_HTML"
  echo "<td>${name}</td>" >> "$OUT_HTML"
  echo "<td>${member}</td>" >> "$OUT_HTML"
  echo "<td>${uuid}</td>" >> "$OUT_HTML"
  echo "<td>${serial}</td>" >> "$OUT_HTML"
  echo "<td><a href=\"/${cert}\">View</a></td>" >> "$OUT_HTML"
  echo "</tr>" >> "$OUT_HTML"
done

cat >> "$OUT_HTML" << 'EOF'
</table>
</body>
</html>
EOF

echo "🌐 Membership directory generated: $OUT_HTML"
