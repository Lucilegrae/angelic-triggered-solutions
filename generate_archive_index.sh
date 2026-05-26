#!/bin/bash
ARCHIVE_ROOT="public/certificates/archives/batches"
INDEX="public/certificates/archives/archive_index.html"
MASTER_CSV="public/certificates/archives/master_ledger.csv"
ASSET_DIR="public/certificates/assets"

mkdir -p "$(dirname "$INDEX")"

echo "🔧 Building master archive index with search bar..."

# --- Build Master CSV ---
echo "Date,Stakeholder,File,UUID,Policy" > "$MASTER_CSV"
for BATCH in $(ls -1 "$ARCHIVE_ROOT" | sort); do
    LEDGER="$ARCHIVE_ROOT/$BATCH/certificate_ledger.csv"
    if [ -f "$LEDGER" ]; then
        tail -n +2 "$LEDGER" >> "$MASTER_CSV"
    fi
done

# Calculate global totals
GLOBAL_CERTS=$(tail -n +2 "$MASTER_CSV" | wc -l)
GLOBAL_UNIQUE=$(tail -n +2 "$MASTER_CSV" | cut -d',' -f2 | sort -u | wc -l)

# HTML header
cat <<EOF > "$INDEX"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Archive Index</title>
<style>
  body { font-family: Arial, sans-serif; background: #fdfaf3; color: #333; }
  h1 { text-align: center; color: #b8860b; }
  .summary { width: 80%; margin: 20px auto; padding: 15px; background: #e6d8a3; border-radius: 6px; text-align: center; font-size: 18px; }
  .summary img { max-height: 80px; margin: 0 20px; vertical-align: middle; }
  .download { margin-top: 10px; }
  .search { text-align:center; margin:20px; }
  .search input { padding:8px; margin:5px; border:1px solid #ccc; border-radius:5px; width:60%; }
  ul { width: 80%; margin: auto; list-style-type: none; padding: 0; }
  li { background: #f9f9f9; margin: 10px 0; padding: 15px; border: 1px solid #ccc; border-radius: 6px; }
  a { color: #0066cc; text-decoration: none; font-weight: bold; }
  a:hover { text-decoration: underline; }
  .stats { font-size: 14px; color: #444; margin-top: 5px; }
</style>
<script>
function searchBatches() {
  var input = document.getElementById("searchInput").value.toUpperCase();
  var list = document.getElementById("batchList").getElementsByTagName("li");
  for (var i = 0; i < list.length; i++) {
    var text = list[i].innerText.toUpperCase();
    list[i].style.display = text.indexOf(input) > -1 ? "" : "none";
  }
}
</script>
</head>
<body>
<h1>📚 Ceremonial Archive Index</h1>
<div class="summary">
  <img src="../assets/ats-crest.png" alt="ATS Crest">
  🌍 Total Certificates Issued: <strong>$GLOBAL_CERTS</strong><br>
  👥 Unique Stakeholders Served: <strong>$GLOBAL_UNIQUE</strong><br>
  <img src="../assets/in-unity-faith.png" alt="Unity Seal">
  <div class="download">
    <a href="master_ledger.csv" download>⬇️ Download Master Ledger (CSV)</a>
  </div>
</div>
<div class="search">
  <input type="text" id="searchInput" onkeyup="searchBatches()" placeholder="Search batches by date or stakeholder...">
</div>
<ul id="batchList">
EOF

# Loop through archive batches
for BATCH in $(ls -1 "$ARCHIVE_ROOT" | sort); do
    DASHBOARD="$ARCHIVE_ROOT/$BATCH/dashboard.html"
    BOOKLET="$ARCHIVE_ROOT/$BATCH/certificates_booklet.pdf"
    LEDGER="$ARCHIVE_ROOT/$BATCH/certificate_ledger.csv"

    echo "<li><strong>Batch: $BATCH</strong><br>" >> "$INDEX"

    if [ -f "$DASHBOARD" ]; then
        REL_DASH=$(realpath --relative-to="$(dirname "$INDEX")" "$DASHBOARD")
        echo "<a href=\"$REL_DASH\">📜 Dashboard</a>" >> "$INDEX"
    fi

    if [ -f "$BOOKLET" ]; then
        REL_BOOK=$(realpath --relative-to="$(dirname "$INDEX")" "$BOOKLET")
        echo " | <a href=\"$REL_BOOK\">📖 Booklet PDF</a>" >> "$INDEX"
    fi

    # Add statistics if ledger exists
    if [ -f "$LEDGER" ]; then
        TOTAL_CERTS=$(tail -n +2 "$LEDGER" | wc -l)
        UNIQUE_STAKEHOLDERS=$(tail -n +2 "$LEDGER" | cut -d',' -f2 | sort | uniq | wc -l)
        echo "<div class=\"stats\">Certificates: $TOTAL_CERTS | Stakeholders: $UNIQUE_STAKEHOLDERS</div>" >> "$INDEX"
    fi

    echo "</li>" >> "$INDEX"
done

# HTML footer
cat <<EOF >> "$INDEX"
</ul>
</body>
</html>
EOF

echo "✨ Master archive index with global summary, crests, master CSV, and search bar generated at $INDEX"
