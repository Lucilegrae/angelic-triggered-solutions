#!/bin/bash
ASSET_DIR="public/certificates/assets"

REQUIRED=("certificate_base.png" "ats-crest.png" "golden-covenant.png" "in-unity-faith.png")

echo "🔍 Verifying sanctified assets..."
for file in "${REQUIRED[@]}"; do
    if [ ! -f "$ASSET_DIR/$file" ]; then
        echo "❌ Missing: $file"
        exit 1
    else
        echo "✅ Found: $file"
    fi
done

echo "✨ All assets verified. Ready for ceremonial layering."
