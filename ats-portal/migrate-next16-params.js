const fs = require("fs");
const path = require("path");

const root = "src/app";

const replacements = [
  ["params.id", "id"],
  ["params.uuid", "uuid"],
  ["params.role", "role"],
  ["params.block", "block"],
];

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      walk(full);
      continue;
    }

    if (!file.endsWith(".tsx")) continue;

    let content = fs.readFileSync(full, "utf8");

    if (!content.includes("params")) continue;

    let original = content;

    // Remove old params signature
    content = content.replace(
      /\(\{\s*params\s*(?:,\s*searchParams)?\s*\}[^)]*\)/g,
      "()"
    );

    // Replace usages
    for (const [oldValue, newValue] of replacements) {
      content = content.replaceAll(oldValue, newValue);
    }

    // Add useParams import for client pages
    if (
      content.includes('"use client"') &&
      !content.includes("useParams")
    ) {
      content = content.replace(
        /import\s+/,
        'import { useParams } from "next/navigation";\n\nimport '
      );

      // Insert hook inside component
      content = content.replace(
        /export default function ([^(]+)\(\)\s*\{/,
        `export default function $1() {\n  const { id, uuid, role, block } = useParams<{ id?: string; uuid?: string; role?: string; block?: string }>();`
      );
    }

    if (content !== original) {
      fs.writeFileSync(full, content);
      console.log("Updated:", full);
    }
  }
}

walk(root);

console.log("Migration complete");
