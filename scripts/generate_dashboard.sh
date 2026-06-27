#!/bin/bash
ASSET_DIR="public/certificates/assets"
LEDGER="public/certificates/archives/certificate_ledger.csv"
DASHBOARD="public/certificates/output/dashboard.html"
PDF="public/certificates/output/certificates_booklet.pdf"

mkdir -p "$(dirname "$DASHBOARD")"

echo "🔧 Building dashboard with thumbnails + full booklet..."

# HTML header
cat <<EOF > "$DASHBOARD"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Certificate Dashboard</title>
<style>
  body { font-family: Arial, sans-serif; background: #fdfaf3; color: #333; }
  h1 { text-align: center; color: #b8860b; }
  table { width: 95%; margin: auto; border-collapse: collapse; }
  th, td { border: 1px solid #ccc; padding: 8px; text-align: center; vertical-align: middle; }
  th { background: #e6d8a3; }
  tr:nth-child(even) { background: #f9f9f9; }
  a { color: #0066cc; text-decoration: none; }
  img { max-width: 120px; border: 1px solid #ccc; border-radius: 4px; }
  .download { display:block; margin:20px auto; text-align:center; }
  .download a { background:#b8860b; color:white; padding:10px 20px; border-radius:5px; text-decoration:none; }
  .download a:hover { background:#a0740a; }
  .search { text-align:center; margin:20px; }
  .search input, .search select { padding:8px; margin:5px; border:1px solid #ccc; border-radius:5px; }
</style>
<script>
function searchTable() {
  var input = document.getElementById("searchInput").value.toUpperCase();
  var dateFilter = document.getElementById("dateFilter").value;
  var table = document.getElementById("certTable");
  var tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var tds = tr[i].getElementsByTagName("td");
    var matchText = false;
    var matchDate = false;

    for (var j = 0; j < tds.length; j++) {
      if (tds[j] && tds[j].innerHTML.toUpperCase().indexOf(input) > -1) {
        matchText = true;
        break;
      }
    }

    if (dateFilter === "" || tds[0].innerHTML.indexOf(dateFilter) > -1) {
      matchDate = true;
    }

    tr[i].style.display = (matchText && matchDate) ? "" : "none";
  }
}
</script>
</head>
<body>
<h1>📜 Certificate Dashboard</h1>
<div class="download">
  <a href="../archives/certificate_ledger.csv" download>⬇️ Download Ledger (CSV)</a>
</div>
<div class="download">
  <a href="certificates_booklet.pdf" download>📖 Export Certificates Booklet (PDF)</a>
</div>
<div class="search">
  <input type="text" id="searchInput" onkeyup="searchTable()" placeholder="Search by Stakeholder, UUID, or Policy Number...">
  <select id="dateFilter" onchange="searchTable()">
    <option value="">All Dates</option>
EOF

# Collect unique dates
DATES=$(tail -n +2 "$LEDGER" | cut -d',' -f1 | sort | uniq)
for DATE in $DATES; do
    echo "    <option value=\"$DATE\">$DATE</option>" >> "$DASHBOARD"
done

# Continue HTML
cat <<EOF >> "$DASHBOARD"
  </select>
</div>
<table id="certTable">
<tr>
  <th>Date</th>
  <th>Stakeholder</th>
  <th>Preview</th>
  <th>Certificate</th>
  <th>UUID</th>
  <th>Policy Number</th>
</tr>
EOF

# Populate table with thumbnails
FILES=()
tail -n +2 "$LEDGER" | while IFS=',' read -r DATE STAKEHOLDER FILE UUID POLICY
do
    REL_PATH=$(realpath --relative-to="$(dirname "$DASHBOARD")" "$FILE")
    FILES+=("$FILE")
    echo "<tr><td>$DATE</td><td>$STAKEHOLDER</td><td><img src=\"$REL_PATH\" alt=\"$STAKEHOLDER\"></td><td><a href=\"$REL_PATH\">View</a></td><td>$UUID</td><td>$POLICY</td></tr>" >> "$DASHBOARD"
done

# HTML footer
cat <<EOF >> "$DASHBOARD"
</table>
</body>
</html>
EOF

# --- Build ceremonial booklet ---
COVER="public/certificates/output/booklet_cover.png"
TOC="public/certificates/output/booklet_toc.png"
CLOSING="public/certificates/output/booklet_closing.png"

# Cover Page
magick -size 2480x3508 xc:#fdfaf3 \
    \( "$ASSET_DIR/ats-crest.png" -resize 300x300 \) -gravity NorthWest -geometry +200+200 -composite \
    \( "$ASSET_DIR/in-unity-faith.png" -resize 300x300 \) -gravity NorthEast -geometry +200+200 -composite \
    -gravity Center -pointsize 72 -fill black -annotate +0-200 "Angelic Triggered Solutions" \
    -gravity Center -pointsize 60 -fill black -annotate +0-80 "Certificate Booklet" \
    -gravity Center -pointsize 48 -fill black -annotate +0+80 "Batch Issued: $(date +%Y-%m-%d)" \
    -gravity South -pointsize 36 -fill black -annotate +0+200 "In Unity & Faith" \
    "$COVER"

# Table of Contents with page references
PAGE=3   # Cover=1, TOC=2, certificates start at 3
TOC_TEXT=""
while IFS=',' read -r DATE STAKEHOLDER FILE UUID POLICY; do
    TOC_TEXT="${TOC_TEXT}${STAKEHOLDER} — UUID: ${UUID} ${POLICY} — Page ${PAGE}\n"
    PAGE=$((PAGE+1))
done < <(tail -n +2 "$LEDGER")

magick -size 2480x3508 xc:#fdfaf3 \
    -gravity North -pointsize 72 -fill black -annotate +0+200 "Table of Contents" \
    -gravity NorthWest -pointsize 36 -fill black -annotate +200+400 "$TOC_TEXT" \
    "$TOC"

# Numbered Certificates
NUMBERED_FILES=()
PAGE=3
for FILE in "${FILES[@]}"; do
    OUT_FILE="${FILE%.png}_numbered.png"
    magick "$FILE" \
        -gravity South -pointsize 36 -fill black -annotate +0+50 "Page $PAGE" \
        "$OUT_FILE"
    NUMBERED_FILES+=("$OUT_FILE")
    PAGE=$((PAGE+1))
done

# Closing Page
magick -size 2480x3508 xc:#fdfaf3 \
    \( "$ASSET_DIR/golden-covenant.png" -resize 400x400 \) -gravity Center -geometry +0-200 -composite \
    -gravity Center -pointsize 72 -fill black -annotate +0+200 "In Unity & Faith" \
    -gravity South -pointsize 48 -fill black -annotate +0+300 "This archive is sealed under the Golden Covenant" \
    "$CLOSING"

# Final Booklet Assembly
magick "$COVER" "$TOC" "${NUMBERED_FILES[@]}" "$CLOSING" "$PDF"
echo "✨ PDF booklet with cover, TOC, numbered certificates, and closing page generated at $PDF"

echo "✨ Dashboard with thumbnails + full ceremonial booklet generated at $DASHBOARD"
