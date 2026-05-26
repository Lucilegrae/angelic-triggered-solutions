#!/bin/bash
# fix_paths.sh
# Backup 'constellations/', rename to 'overlays/', and update references in all HTML files

PROJECT_ROOT=~/angelic-triggered-solutions/angelic-triggered-solutions/public

# Step 1: Backup the folder
if [ -d "$PROJECT_ROOT/constellations" ]; then
  BACKUP="$PROJECT_ROOT/constellations_backup_$(date +%Y%m%d_%H%M%S)"
  cp -r "$PROJECT_ROOT/constellations" "$BACKUP"
  echo "📦 Backup created at: $BACKUP"
  
  # Step 2: Rename the folder
  mv "$PROJECT_ROOT/constellations" "$PROJECT_ROOT/overlays"
  echo "Renamed 'constellations/' → 'overlays/'"
else
  echo "No 'constellations/' folder found."
fi

# Step 3: Update references in all HTML files inside public/
echo "🔍 Updating references in HTML files..."
find "$PROJECT_ROOT" -type f -name "*.html" -exec sed -i 's|constellations/|overlays/|g' {} \;

echo "✅ Path cleanup complete across all HTML files."
