#!/usr/bin/env bash
set -euo pipefail

repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repository_root"

patterns=(
  '-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----'
  'AKIA[0-9A-Z]{16}'
  'gh[pousr]_[A-Za-z0-9_]{20,}'
  'github_pat_[A-Za-z0-9_]{20,}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
)

for pattern in "${patterns[@]}"; do
  if rg --hidden --glob '!.git/**' --glob '!tools/check-for-secrets.sh' --regexp "$pattern" .; then
    echo "Potential secret matched pattern: $pattern" >&2
    exit 1
  fi
done

echo "High-confidence local secret-pattern check passed."
