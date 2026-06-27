#!/bin/bash
ARCHIVE_ROOT="public/certificates/archives/batches"
STAKEHOLDER_DIR="public/certificates/archives/stakeholders"
INDEX="public/certificates/archives/stakeholder_index.html"
MASTER_CSV="public/certificates/archives/master_ledger.csv"

mkdir -p "$STAKEHOLDER_DIR"

echo "🔧 Building stakeholder drill‑down pages with dual watermarks + footer..."

# --- Build Master CSV ---
echo "Date,Stakeholder,File,UUID,Policy,Batch" > "$MASTER_CSV"
for BATCH in $(ls -1 "$ARCHIVE_ROOT" | sort); do
    LEDGER="$ARCHIVE_ROOT/$BATCH/certificate_ledger.csv"
    if [ -f "$LEDGER" ]; then
        tail -n +2 "$LEDGER" | awk -v BATCH="$BATCH" -F',' '{print $1","$2","$3","$4","$5","BATCH}' >> "$MASTER_CSV"
    fi
done

# Build individual stakeholder pages
STAKEHOLDERS=$(tail -n +2 "$MASTER_CSV" | cut -d',' -f2 | sort -u)

for S in $STAKEHOLDERS; do
    PAGE="$STAKEHOLDER_DIR/${S// /_}.html"
    cat <<EOF > "$PAGE"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Certificates for $S</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background: #fdfaf3;
    color: #333;
    background-image: url('../assets/ats-crest.png'), url('../assets/in-unity-faith.png');
    background-repeat: no-repeat, no-repeat;
    background-position: center center, bottom right;
    background-size: 400px 400px, 200px 200px;
    background-attachment: fixed;
  }
  h1 { text-align: center; color: #b8860b; }
  table { width: 95%; margin: auto; border-collapse: collapse; background: rgba(255,255,255,0.9); }
  th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
  th { background: #e6d8a3; }
  tr:nth-child(even) { background: #f9f9f9; }
  img { max-width: 120px; border: 1px solid #ccc; border-radius: 4px; }
  .nav { text-align:center; margin:20px; }
  .nav a { margin:0 10px; color:#0066cc; text-decoration:none; font-weight:bold; }
  .nav a:hover { text-decoration:underline; }
  .footer { text-align:center; margin:30px; font-size:14px; color:#444; font-style:italic; }
</style>
</head>
<body>
<h1>📜 Certificates for $S</h1>
<div class="nav">
  <a href="../archive_index.html">⬅️ Back to Master Index</a>
</div>
<table>
<tr><th>Date</th><th>Batch</th><th>Preview</th><th>Certificate</th><th>UUID</th><th>Policy</th></tr>
EOF

    grep ",$S," "$MASTER_CSV" | while IFS=',' read -r DATE STAKEHOLDER FILE UUID POLICY BATCH; do
        REL_PATH=$(realpath --relative-to="$STAKEHOLDER_DIR" "$FILE")
        DASHBOARD="../batches/$BATCH/dashboard.html"
        echo "<tr><td>$DATE</td><td><a href=\"$DASHBOARD\">$BATCH</a></td><td><img src=\"$REL_PATH\"></td><td><a href=\"$REL_PATH\">View</a></td><td>$UUID</td><td>$POLICY</td></tr>" >> "$PAGE"
    done

    cat <<EOF >> "$PAGE"
</table>
<div class="nav">
  <a href="../archive_index.html">⬅️ Back to Master Index</a>
</div>
<div class="footer">
  ✨ In Unity & Faith — This record is sealed under ATS ✨
</div>
</body>
</html>
EOF
done

# Build stakeholder index page
cat <<EOF > "$INDEX"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Stakeholder Index</title>
<style>
  body { font-family: Arial, sans-serif; background: #fdfaf3; color: #333; }
  h1 { text-align: center; color: #b8860b; }
  ul { width: 80%; margin: auto; list-style-type: none; padding: 0; }
  li { background: #f9f9f9; margin: 10px 0; padding: 15px; border: 1px solid #ccc; border-radius: 6px; }
  a { color: #0066cc; text-decoration: none; font-weight: bold; }
  a:hover { text-decoration: underline; }
  .nav { text-align:center; margin:20px; }
</style>
</head>
<body>
<h1>👥 Stakeholder Index</h1>
<ul>
EOF

for S in $STAKEHOLDERS; do
    PAGE="${S// /_}.html"
    echo "<li><a href=\"stakeholders/$PAGE\">$S</a></li>" >> "$INDEX"
done

cat <<EOF >> "$INDEX"
</ul>
<div class="nav">
  <a href="archive_index.html">⬅️ Back to Master Index</a>
</div>
</body>
</html>
EOF

echo "✨ Stakeholder drill‑down pages with dual watermarks + footer generated at $STAKEHOLDER_DIR and index at $INDEX"
