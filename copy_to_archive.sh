#!/bin/bash
# Archive batch into dated chamber

OUTPUT_DIR="public/certificates/output"
ARCHIVE_DIR="public/certificates/archives/batches"
mkdir -p "$ARCHIVE_DIR"

STAMP=$(date +"%Y-%m-%d_%H-%M-%S")
TARGET="$ARCHIVE_DIR/batch_$STAMP"

cp -r "$OUTPUT_DIR" "$TARGET"

echo "📚 Batch archived at: $TARGET"
