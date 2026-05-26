#!/bin/bash
ASSET_DIR="public/certificates/assets"
OUTPUT_DIR="public/certificates/output"
LEDGER="public/certificates/archives/certificate_ledger.csv"

echo "🔍 Beginning ledger verification..."

if [ ! -f "$LEDGER" ]; then
    echo "❌ Ledger file not found at $LEDGER"
    exit 1
fi

# Read ledger line by line, skipping header
tail -n +2 "$LEDGER" | while IFS=',' read -r DATE STAKEHOLDER FILE UUID POLICY
do
    if [ -f "$FILE" ]; then
        # Extract text from certificate image
        TEXT=$(magick "$FILE" -colorspace Gray -type Grayscale -depth 8 -alpha off -format "%@" info: | tesseract stdin stdout 2>/dev/null)

        # Check UUID presence
        if echo "$TEXT" | grep -q "$UUID"; then
            echo "✅ $STAKEHOLDER certificate UUID verified."
        else
            echo "⚠️ $STAKEHOLDER certificate UUID mismatch!"
        fi

        # Check Policy Number (only if present in ledger)
        if [ -n "$POLICY" ]; then
            if echo "$TEXT" | grep -q "$POLICY"; then
                echo "✅ $STAKEHOLDER policy number verified."
            else
                echo "⚠️ $STAKEHOLDER policy number mismatch!"
            fi
        fi
    else
        echo "❌ Certificate file missing: $FILE"
    fi
done

echo "✨ Ledger verification complete."
