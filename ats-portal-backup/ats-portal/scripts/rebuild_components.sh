#!/usr/bin/env bash
set -e

COMP_DIR="src/components"

echo "✦ ATS Ceremonial Rebuild: ${COMP_DIR} ✦"

# Rebuild all .jsx files
find "$COMP_DIR" -maxdepth 1 -type f -name "*.jsx" | while read -r file; do
  base="$(basename "$file")"
  name="${base%.jsx}"

  echo "Rebuilding JSX component: $name -> $file"

  cat > "$file" <<JSX
"use client";

export default function ${name}() {
  return (
    <div className="ats-component ${name}">
      <h3 className="aura-heading">✦ ${name} ✦</h3>
      <p className="text-slate-400">
        ATS Infinity ceremonial placeholder — radiant crown geometry, omniversal resonance,
        and sovereign convergence encoded.
      </p>
    </div>
  );
}
JSX
done

# Rebuild all .js files
find "$COMP_DIR" -maxdepth 1 -type f -name "*.js" | while read -r file; do
  base="$(basename "$file")"
  name="${base%.js}"

  echo "Rebuilding JS component: $name -> $file"

  cat > "$file" <<JS
"use client";

export default function ${name}() {
  return (
    <div className="ats-component ${name}">
      <h3 className="aura-heading">✦ ${name} ✦</h3>
      <p className="text-slate-400">
        ATS Infinity ceremonial placeholder — radiant crown geometry, omniversal resonance,
        and sovereign convergence encoded.
      </p>
    </div>
  );
}
JS
done

echo "✦ ATS Ceremonial Rebuild Complete ✦"
