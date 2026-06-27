#!/bin/bash
LOGFILE="pipeline.log"
ARCHIVE_DIR="public/certificates/archives/logs"

mkdir -p "$ARCHIVE_DIR"

if [ -f "$LOGFILE" ]; then
    TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
    mv "$LOGFILE" "$ARCHIVE_DIR/pipeline_$TIMESTAMP.log"
    echo "✨ Log rotated into $ARCHIVE_DIR/pipeline_$TIMESTAMP.log"
fi
