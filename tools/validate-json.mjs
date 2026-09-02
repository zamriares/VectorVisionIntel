#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "build", "dist"].includes(entry.name)) continue;
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(item)));
    if (entry.isFile() && entry.name.endsWith(".json")) files.push(item);
  }
  return files;
}

const jsonFiles = await walk(root);
for (const file of jsonFiles) {
  try {
    JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    failures.push(`${path.relative(root, file)}: invalid JSON: ${error.message}`);
  }
}

const manifestDirectory = path.join(root, "docs/compatibility/device-manifests");
const required = [
  "schema_version",
  "manifest_id",
  "manifest_version",
  "classification",
  "validation_status",
  "selection_status",
  "manufacturer",
  "product_family",
  "full_model_number",
  "firmware_version",
  "driver_or_sdk",
  "operating_system",
  "protocols",
  "licensing_status",
  "lifecycle_status",
  "source_datasheets",
  "required_evidence_gates",
  "limitations",
];
const allowedClasses = new Set([
  "REFERENCE_HARDWARE",
  "PROTOCOL_COMPATIBLE_HARDWARE",
  "CERTIFIED_PLATFORM_COMPATIBLE_HARDWARE",
]);
const allowedValidation = new Set([
  "TARGET",
  "DOCUMENTED",
  "BENCH_VERIFIED",
  "VALIDATED",
  "RESTRICTED",
  "REVOKED",
]);

for (const name of await readdir(manifestDirectory)) {
  if (!name.endsWith(".json")) continue;
  const relative = `docs/compatibility/device-manifests/${name}`;
  let manifest;
  try {
    manifest = JSON.parse(await readFile(path.join(manifestDirectory, name), "utf8"));
  } catch {
    continue;
  }
  for (const field of required) {
    if (!(field in manifest)) failures.push(`${relative}: missing required field ${field}`);
  }
  if (!allowedClasses.has(manifest.classification)) {
    failures.push(`${relative}: invalid classification ${manifest.classification}`);
  }
  if (!allowedValidation.has(manifest.validation_status)) {
    failures.push(`${relative}: invalid validation_status ${manifest.validation_status}`);
  }
  if (manifest.validation_status !== "TARGET") {
    failures.push(`${relative}: Stage 0 manifest makes unapproved validation claim ${manifest.validation_status}`);
  }
  if (manifest.selection_status === "PENDING_ENGINEERING_SELECTION" &&
      !String(manifest.full_model_number).includes("PENDING ENGINEERING SELECTION")) {
    failures.push(`${relative}: pending selection must not imply an exact full model number`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`JSON validation passed: ${jsonFiles.length} files; device manifests remain TARGET.`);
}
