#!/bin/bash
MASTER_CSV="public/certificates/archives/master_ledger.csv"
DASHBOARD="public/certificates/archives/stakeholder_dashboard.html"
PDF="public/certificates/archives/global_booklet.pdf"
ASSET_DIR="public/certificates/assets"

mkdir -p "$(dirname "$DASHBOARD")"

echo "🔧 Building global stakeholder dashboard with summary + crests + global booklet..."

# Calculate global stats
TOTAL_CERTS=$(tail -n +2 "$MASTER_CSV" | wc -l)
TOTAL_STAKEHOLDERS=$(tail -n +2 "$MASTER_CSV" | cut -d',' -f2 | sort -u | wc -l)
TOTAL_BATCHES=$(tail -n +2 "$MASTER_CSV" | cut -d',' -f6 | sort -u | wc -l)

# HTML header
cat <<EOF > "$DASHBOARD"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Global Stakeholder Dashboard</title>
<style>
  body { font-family: Arial, sans-serif; background: #fdfaf3; color: #333; }
  h1 { text-align: center; color: #b8860b; }
  .summary { width: 80%; margin: 20px auto; padding: 15px; background: #e6d8a3; border-radius: 6px; text-align: center; font-size: 18px; }
  .summary img { max-height: 80px; margin: 0 20px; vertical-align: middle; }
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
  .search input { padding:8px; margin:5px; border:1px solid #ccc; border-radius:5px; width:60%; }
</style>
<script>
function searchTable() {
  var input = document.getElementById("searchInput").value.toUpperCase();
  var table = document.getElementById("stakeTable");
  var tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var tds = tr[i].getElementsByTagName("td");
    var match = false;
    for (var j = 0; j < tds.length; j++) {
      if (tds[j] && tds[j].innerHTML.toUpperCase().indexOf(input) > -1) {
        match = true;
        break;
      }
    }
    tr[i].style.display = match ? "" : "none";
  }
}
</script>
</head>
<body>
<h1>👥 Global Stakeholder Dashboard</h1>
<div class="summary">
  <img src="../assets/ats-crest.png" alt="ATS Crest">
  🌍 Total Certificates: <strong>$TOTAL_CERTS</strong><br>
  👥 Unique Stakeholders: <strong>$TOTAL_STAKEHOLDERS</strong><br>
  📦 Total Batches: <strong>$TOTAL_BATCHES</strong><br>
  <img src="../assets/in-unity-faith.png" alt="Unity Seal">
</div>
<div class="download">
  <a href="master_ledger.csv" download>⬇️ Download Master Ledger (CSV)</a>
</div>
<div class="download">
  <a href="global_booklet.pdf" download>📖 Download Global Booklet (PDF)</a>
</div>
<div class="search">
  <input type="text" id="searchInput" onkeyup="searchTable()" placeholder="Search by Stakeholder, UUID, Policy, or Batch...">
</div>
<table id="stakeTable">
<tr>
  <th>Date</th>
  <th>Stakeholder</th>
  <th>Batch</th>
  <th>Preview</th>
  <th>Certificate</th>
  <th>UUID</th>
  <th>Policy Number</th>
</tr>
EOF

# Populate table with thumbnails
FILES=()
tail -n +2 "$MASTER_CSV" | while IFS=',' read -r DATE STAKEHOLDER FILE UUID POLICY BATCH
do
    REL_PATH=$(realpath --relative-to="$(dirname "$DASHBOARD")" "$FILE")
    DASHBOARD_LINK="batches/$BATCH/dashboard.html"
    FILES+=("$FILE")
    echo "<tr><td>$DATE</td><td><a href=\"stakeholders/${STAKEHOLDER// /_}.html\">$STAKEHOLDER</a></td><td><a href=\"$DASHBOARD_LINK\">$BATCH</a></td><td><img src=\"$REL_PATH\" alt=\"$STAKEHOLDER\"></td><td><a href=\"$REL_PATH\">View</a></td><td>$UUID</td><td>$POLICY</td></tr>" >> "$DASHBOARD"
done

# HTML footer
cat <<EOF >> "$DASHBOARD"
</table>
<div style="text-align:center; margin:30px; font-size:14px; color:#444; font-style:italic;">
  ✨ In Unity & Faith — This global registry is sealed under ATS ✨
</div>
</body>
</html>
EOF

# --- Build Global Booklet ---
COVER="public/certificates/archives/global_cover.png"
TOC="public/certificates/archives/global_toc.png"
CLOSING="public/certificates/archives/global_closing.png"

# Cover Page
magick -size 2480x3508 xc:#fdfaf3 \
    \( "$ASSET_DIR/ats-crest.png" -resize 300x300 \) -gravity NorthWest -geometry +200+200 -composite \
    \( "$ASSET_DIR/in-unity-faith.png" -resize 300x300 \) -gravity NorthEast -geometry +200+200 -composite \
    -gravity Center -pointsize 72 -fill black -annotate +0-200 "Angelic Triggered Solutions" \
    -gravity Center -pointsize 60 -fill black -annotate +0-80 "Global Certificate Booklet" \
    -gravity Center -pointsize 48 -fill black -annotate +0+80 "Issued: $(date +%Y-%m-%d)" \
    -gravity South -pointsize 36 -fill black -annotate +0+200 "In Unity & Faith" \
    "$COVER"

# Table of Contents
PAGE=3
TOC_TEXT=""
while IFS=',' read -r DATE STAKEHOLDER FILE UUID POLICY BATCH; do
    TOC_TEXT="${TOC_TEXT}${STAKEHOLDER} — Batch: ${BATCH} — UUID: ${UUID} — Page ${PAGE}\n"
    PAGE=$((PAGE+1))
done < <(tail -n +2 "$MASTER_CSV")

magick -size 2480x3508 xc:#fdfaf3 \
    -gravity North -pointsize 72 -fill black -annotate +0+200 "Table of Contents" \
    -gravity NorthWest -pointsize 36 -fill black -annotate +200+400 "$TOC_TEXT" \
    "$TOC"

# Numbered Certificates
NUMBERED_FILES=()
PAGE=3
for FILE in "${FILES[@]}"; do
    OUT_FILE="${FILE%.png}_global_numbered.png"
    magick "$FILE" \
        -gravity South -pointsize 36 -fill black -annotate +0+50 "Page $PAGE" \
        "$OUT_FILE"
    NUMBERED_FILES+=("$OUT_FILE")
    PAGE=$((PAGE+1))
done

# Closing Page
magick -size 2480x3508 xc:#fdfaf3 \
    \( "$ASSET_DIR/in-unity-faith.png" -resize 400x400 \) -gravity Center -geometry +0-200 -composite \
    -gravity Center -pointsize 72 -fill black -annotate +0+200 "In Unity & Faith" \
    -gravity South -pointsize 48 -fill black -annotate +0+300 "This global archive is sealed under the Golden Covenant" \
    "$CLOSING"

# Final Booklet Assembly
magick "$COVER" "$TOC" "${NUMBERED_FILES[@]}" "$CLOSING" "$PDF"

echo "✨ Global stakeholder dashboard with summary, crests, and global booklet generated at $DASHBOARD"
echo "📖 Global booklet saved at $PDF"
