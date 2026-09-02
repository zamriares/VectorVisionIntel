#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "build", "dist"].includes(entry.name)) continue;
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(item)));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(item);
  }
  return files;
}

const files = await markdownFiles(root);
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of files) {
  const text = await readFile(file, "utf8");
  let match;
  while ((match = linkPattern.exec(text)) !== null) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, "");
    if (/^(https?:|mailto:|#)/.test(rawTarget)) continue;
    const target = decodeURIComponent(rawTarget.split("#", 1)[0]);
    if (target.length === 0) continue;
    const resolved = path.resolve(path.dirname(file), target);
    try {
      await access(resolved);
    } catch {
      failures.push(`${path.relative(root, file)}: broken local link ${rawTarget}`);
    }
  }
}

for (const file of files.filter((item) => item.includes(`${path.sep}docs${path.sep}adr${path.sep}ADR-`))) {
  if (file.endsWith("ADR-0000-template.md")) continue;
  const text = await readFile(file, "utf8");
  for (const heading of ["Status:", "## Context", "## Decision", "## Consequences"]) {
    if (!text.includes(heading)) failures.push(`${path.relative(root, file)}: missing ${heading}`);
  }
}

for (const file of files.filter((item) => item.includes(`${path.sep}docs${path.sep}tasks${path.sep}TASK-`))) {
  if (file.endsWith("TASK-template.md")) continue;
  const text = await readFile(file, "utf8");
  for (const field of ["Stage:", "Status:", "Owner:", "## Objective", "## Acceptance criteria"]) {
    if (!text.includes(field)) failures.push(`${path.relative(root, file)}: missing ${field}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Documentation validation passed: ${files.length} Markdown files.`);
}
