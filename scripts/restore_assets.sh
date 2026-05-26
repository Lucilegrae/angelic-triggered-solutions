#!/bin/bash
# restore_assets.sh
# Restore original HTML files from .bak backups inside public/
# Includes safety confirmation prompt

PROJECT_ROOT=~/angelic-triggered-solutions/angelic-triggered-solutions/public

echo "⚠️ This will overwrite current HTML files with their .bak backups."
read -p "Are you sure you want to proceed? (y/n): " confirm

if [[ "$confirm" != "y" ]]; then
  echo "❌ Restoration cancelled."
  exit 1
fi

echo "🔄 Restoring backups in $PROJECT_ROOT ..."

for backup in $(find "$PROJECT_ROOT" -type f -name "*.html.bak"); do
  original="${backup%.bak}"
  mv "$backup" "$original"
  echo "✅ Restored: $original"
done

echo "✨ Restoration complete. All .bak files reverted to originals."
