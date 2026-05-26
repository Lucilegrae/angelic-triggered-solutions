#!/bin/bash
# assets_pipeline.sh
# Unified pipeline for asset cleanup, restore, and dry-run preview
# Usage:
#   ./assets_pipeline.sh clean
#   ./assets_pipeline.sh restore
#   ./assets_pipeline.sh restore --dry-run

PROJECT_ROOT=~/angelic-triggered-solutions/angelic-triggered-solutions/public

case "$1" in
  clean)
    echo "🔍 Scanning HTML files in $PROJECT_ROOT ..."
    for file in $(find "$PROJECT_ROOT" -type f -name "*.html"); do
      if grep -q "/public/" "$file"; then
        cp "$file" "$file.bak"
        sed -i 's|/public/||g' "$file"
        echo "✅ Modified: $file (backup saved as $file.bak)"
      else
        echo "ℹ️ No changes needed: $file"
      fi
    done
    echo "✨ Cleanup complete with backups."
    ;;

  restore)
    if [[ "$2" == "--dry-run" ]]; then
      echo "🔍 Dry-run mode: listing backups that would be restored..."
      find "$PROJECT_ROOT" -type f -name "*.html.bak" | while read backup; do
        original="${backup%.bak}"
        echo "Would restore: $backup -> $original"
      done
      echo "✨ Dry-run complete. No files were modified."
      exit 0
    fi

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
    echo "✨ Restoration complete."
    ;;

  *)
    echo "Usage:"
    echo "  ./assets_pipeline.sh clean"
    echo "  ./assets_pipeline.sh restore"
    echo "  ./assets_pipeline.sh restore --dry-run"
    ;;
esac
