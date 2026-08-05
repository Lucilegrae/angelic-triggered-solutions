#!/usr/bin/env bash
set -e

COMP_DIR="src/components"

echo "✦ Restoring ATS functional hooks ✦"

restore_hook() {
  local file="$1"
  local name="$2"
  local body="$3"

  echo "Restoring hook: $name -> $file"

  cat > "$file" <<HOOK
"use client";

export function ${name}() {
${body}
}
HOOK
}

# useUser.js
restore_hook "$COMP_DIR/useUser.js" "useUser" "  return {
    user: null,
    loading: false,
    error: null,
  };"

# useRpcQuery.js
restore_hook "$COMP_DIR/useRpcQuery.js" "useRpcQuery" "  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
  };"

# useRpcInfiniteQuery.js
restore_hook "$COMP_DIR/useRpcInfiniteQuery.js" "useRpcInfiniteQuery" "  return {
    pages: [],
    loading: false,
    error: null,
    fetchNextPage: () => {},
  };"

# useRpcMutation.js
restore_hook "$COMP_DIR/useRpcMutation.js" "useRpcMutation" "  return {
    mutate: () => {},
    loading: false,
    error: null,
  };"

# useRpcBatch.js
restore_hook "$COMP_DIR/useRpcBatch.js" "useRpcBatch" "  return {
    executeBatch: () => {},
    loading: false,
    error: null,
  };"

# useGlyphStreamRpc.js
restore_hook "$COMP_DIR/useGlyphStreamRpc.js" "useGlyphStreamRpc" "  return {
    stream: [],
    loading: false,
    error: null,
    refresh: () => {},
  };"

echo "✦ ATS Hook Restoration Complete ✦"
