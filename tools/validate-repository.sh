#!/usr/bin/env bash
set -euo pipefail

repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repository_root"

failures=0

fail() {
  echo "ERROR: $*" >&2
  failures=$((failures + 1))
}

required_directories=(
  edge services apps ml schemas inspection-packages inspection-packages/glove
  deploy docs tests tools .github .github/workflows
)
required_files=(
  AGENTS.md README.md .editorconfig .gitattributes .gitignore .clang-format .clang-tidy
  .golangci.yml tsconfig.base.json eslint.config.mjs prettier.config.mjs pyproject.toml
  .github/CODEOWNERS
  .github/pull_request_template.md .github/dependabot.yml
  docs/ENGINEERING_STANDARDS.md docs/RELEASE_STANDARD.md
  docs/adr/ADR-repository-engineering-standards.md
)

for directory in "${required_directories[@]}"; do
  [[ -d "$directory" ]] || fail "missing required directory: $directory"
done
for file in "${required_files[@]}"; do
  [[ -f "$file" ]] || fail "missing required file: $file"
done

if ! awk '!/^[[:space:]]*(#|$)/ && /@[A-Za-z0-9_-]+/ { found=1 } END { exit !found }' .github/CODEOWNERS; then
  fail "CODEOWNERS has no approved GitHub user/team; supply the exact handle before enforcement can pass"
fi

while IFS= read -r workflow; do
  while IFS= read -r usage; do
    reference="${usage##*@}"
    [[ "$reference" =~ ^[0-9a-f]{40}$ ]] || fail "$workflow contains a non-immutable action reference: $usage"
  done < <(sed -nE 's/^[[:space:]]*-[[:space:]]*uses:[[:space:]]*([^#[:space:]]+).*/\1/p' "$workflow" | grep -v '^\./' || true)
done < <(find .github/workflows -type f \( -name '*.yml' -o -name '*.yaml' \) -print)

if find edge services apps ml deploy inspection-packages tests -type f ! -name '.gitkeep' -print -quit | grep -q .; then
  fail "Stage 0 implementation roots contain files other than approved scaffolding markers"
fi

if rg --ignore-case --files-with-matches 'glove' edge services apps ml deploy tools schemas 2>/dev/null | grep -v '^tools/validate-repository.sh$' | grep -q .; then
  fail "glove-specific content exists in a reusable core/tooling path"
fi

node tools/validate-json.mjs || failures=$((failures + 1))
node tools/validate-docs.mjs || failures=$((failures + 1))
bash tools/check-for-secrets.sh || failures=$((failures + 1))

if (( failures > 0 )); then
  echo "Repository baseline validation failed with $failures issue(s)." >&2
  exit 1
fi

echo "Repository baseline validation passed."
