#!/bin/bash
set -e
LOGFILE="structure_log.txt"
echo "🔹 Structuring Angelic Triggered Solutions..." | tee $LOGFILE

# Create folders if missing
mkdir -p certificates scripts supabase utils assets templates

# Move files and log
for f in *certificate*.*; do
  [ -e "$f" ] || continue
  mv "$f" certificates/
  echo "Moved $f → certificates/" >> $LOGFILE
done

for f in supabase*.*; do
  [ -e "$f" ] || continue
  mv "$f" supabase/
  echo "Moved $f → supabase/" >> $LOGFILE
done

for f in *.sh; do
  [ -e "$f" ] || continue
  mv "$f" scripts/
  echo "Moved $f → scripts/" >> $LOGFILE
done

for f in *.html; do
  [ -e "$f" ] || continue
  mv "$f" templates/
  echo "Moved $f → templates/" >> $LOGFILE
done

for f in *.png *.jpeg *.jpg; do
  [ -e "$f" ] || continue
  mv "$f" assets/
  echo "Moved $f → assets/" >> $LOGFILE
done

echo "🔹 Updating import paths..." | tee -a $LOGFILE

# Update imports in JS/JSX files
for file in $(find src -type f \( -name "*.js" -o -name "*.jsx" \)); do
  sed -i 's|./certificate_|../certificates/certificate_|g' "$file"
  sed -i 's|./supabase|../supabase|g' "$file"
  sed -i 's|./assets|../assets|g' "$file"
  sed -i 's|./scripts|../scripts|g' "$file"
  sed -i 's|./templates|../templates|g' "$file"
  echo "Updated imports in $file" >> $LOGFILE
done

echo "✅ Structure organized and imports updated." | tee -a $LOGFILE
