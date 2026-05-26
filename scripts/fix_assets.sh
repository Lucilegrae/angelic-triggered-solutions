#!/bin/bash
# fix_assets.sh
# Strip '/public/' from asset references in all HTML files inside public/
# Backup originals and print audit trail

PROJECT_ROOT=~/angelic-triggered-solutions/angelic-triggered-solutions/public

echo "🔍 Scanning HTML files in $PROJECT_ROOT ..."

for file in $(find "$PROJECT_ROOT" -type f -name "*.html"); do
  if grep -q "/public/" "$file"; then
    # Backup original file
    cp "$file" "$file.bak"
    # Perform replacement
    sed -i 's|/public/||g' "$file"
    echo "✅ Modified: $file (backup saved as $file.bak)"
  else
    echo "ℹ️ No changes needed: $file"
  fi
done

echo "✨ Asset path cleanup complete with backups."
