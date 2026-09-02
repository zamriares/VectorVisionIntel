# Repository and Engineering Standards

Status: Approved Stage 0 baseline  
ADR: ADR-0002  
Owner: Zamri Ares  

## 1. Repository ownership and structure

The repository is a GitHub-hosted monorepo. Top-level ownership is:

| Path | Purpose | Language/control boundary |
|---|---|---|
| `edge/` | Deterministic runtime, SDK and equipment adapters | C++20; acquisition, decision, PLC/reject and timing |
| `services/` | Factory control plane and management services | Go |
| `apps/` | Operator, engineering and operations applications | Strict TypeScript and React; no direct device/DB control |
| `ml/` | Dataset, training, evaluation and export tooling | Python; never deterministic control |
| `schemas/` | Versioned Protobuf and JSON Schema contracts | Contract-first |
| `inspection-packages/` | Industry/product packages | Signed/versioned; glove only under `inspection-packages/glove/` |
| `deploy/` | Offline, edge, factory and observability deployment assets | No production deployment during Stage 0 |
| `docs/` | Specifications, ADRs, tasks, evidence and handoffs | Authority hierarchy in `AGENTS.md` |
| `tests/` | Cross-component contract, integration, simulation and HIL harnesses | Evidence tier must be labelled |
| `tools/` | Non-production validation/build/release tooling | Bounded, reviewed and reproducible |
| `.github/` | PR governance, ownership, CI and dependency automation | GitHub-hosted controls |

Nested `AGENTS.md` files may strengthen local constraints but cannot weaken the root contract.

## 2. Branch, pull-request and review governance

- `main` is protected. Direct commits, force pushes, branch deletion and history rewrite are prohibited.
- Branches are short-lived and named `<type>/<task-id>-<short-description>`, where type is `feature`, `fix`, `docs`, `security`, `build` or `chore`.
- Every change uses a pull request. Draft PRs cannot merge.
- PR title format: `<TASK-NNNN>: <imperative summary>`.
- The PR body states objective, scope, risk, tests with actual results, unavailable checks, compatibility/migration effects and rollback.
- All required CI checks must pass. Under ADR-0003 solo-maintainer mode, `@zamriares` is the sole CODEOWNER and may merge an owner-authored pull request after recording final-diff self-review; GitHub approving reviews and required CODEOWNER reviews are not required because authors cannot approve their own pull requests.
- Safety/control, security/trust, public-contract, migration, signing/trust-store and release changes require explicit Technical Lead and applicable-owner approval recorded in the pull request. Those roles may be held by the same person only while ADR-0003 solo-maintainer mode applies; separately defined production two-person approvals are unchanged.
- Squash merge is the only merge method. Merge commits and rebase merge are disabled.
- The squash commit uses the approved PR title and retains the task ID. One PR addresses one approved task unless the task explicitly defines atomic cross-component scope.
- Conversations must be resolved; stale approvals are dismissed after material changes.

Remote GitHub ruleset evidence is required before this governance is considered enforced. Required pull requests, strict required checks, resolved conversations, linear history, administrator enforcement, and force-push/deletion prevention remain mandatory; required approving reviews, CODEOWNER reviews, and last-push approval are disabled only as authorised by ADR-0003.

## 3. Commit and task traceability

- Local commits use an imperative subject and contain no secrets, generated binaries, customer data or production keys.
- Every PR and resulting squash commit references an approved task under `docs/tasks/`.
- ADR-required changes link the accepted ADR. Public contract changes identify old/new versions and compatibility evidence.
- Generated files identify their generator/version and must be reproducible.
- Hardware, benchmark and soak claims link durable evidence and exact manifests.

## 4. Language quality gates

### C++20

- Format with repository `.clang-format`; CI rejects differences.
- Compile with warnings enabled and warnings treated as errors on approved compiler versions.
- Run `clang-tidy` using `.clang-tidy`; suppressions require justification adjacent to the narrow suppression.
- Unit/property tests run under AddressSanitizer and UndefinedBehaviorSanitizer. ThreadSanitizer runs for threading/state-machine changes on a supported configuration.
- Release-relevant edge code also requires fuzz, static-analysis, soak and appropriate HIL evidence.
- Coverage is decision-support evidence, not a substitute for boundary/failure tests. New deterministic logic requires branch coverage of every state transition and error outcome.

### Go

- `gofmt` and `go vet` are mandatory; `golangci-lint` runs with `.golangci.yml`.
- `go test ./...` and `go test -race ./...` are required for affected modules.
- Module dependencies are pinned in `go.mod`/`go.sum`; vendoring or an offline cache is required for release reproducibility.
- Tests cover cancellation, deadline, unauthorised scope, duplicate/idempotent handling and partial failure where applicable.

### TypeScript and React

- TypeScript uses the strict baseline in `tsconfig.base.json`; `any` and unsafe type assertions require narrow review justification.
- Prettier formatting, ESLint type-aware checks, type checking and affected unit/component tests are mandatory.
- Package management uses pnpm with a committed lockfile and exact toolchain declaration when the first app is authorised.
- Server-side authorisation, untrusted-output rendering, upload limits and forbidden direct device/database access require negative tests.

### Python

- Ruff formatting/linting, mypy strict typing for production-quality tooling and pytest are mandatory under `pyproject.toml`.
- The supported Python version and locked environment are selected by the first approved ML/tooling task; Stage 0 does not invent a runtime version.
- A locked, reproducible environment is required; no untrusted pickle-like deserialisation.
- Tests cover deterministic seeds where supported, dataset split/lineage integrity, malformed manifests and export parity.
- Python cannot be imported or executed in deterministic acquisition, decision or reject paths.

## 5. Contracts and documentation

- Public interfaces are schema-first. Update schema, compatibility tests, generated clients, implementation and documentation atomically.
- Protobuf field numbers are never reused. JSON Schema versions reject unknown critical fields.
- Breaking changes require an accepted ADR, major version, migration/rollback procedure and explicit approval.
- ADRs use the repository template and one immutable decision per file. Accepted ADRs are never edited to change their decision; supersede them.
- Markdown links, headings, required metadata and task/ADR references are CI validated.

## 6. Security and dependency gates

- Dependencies are direct-need only, exact/pinned, licence-reviewed and represented in lockfiles and SBOMs.
- GitHub Actions use full immutable commit SHAs with a version comment; workflow permissions are explicitly least privilege.
- Pull requests run secret scanning, dependency review and vulnerability/licence policy checks when the platform capability is available.
- Repository filesystem/container scanning uses a pinned scanner. Critical/high vulnerabilities fail unless a time-limited exception records owner, reason, compensating control and expiry.
- Production signing keys never enter source, CI variables accessible to PRs, or developer machines. Signing uses a protected release environment and approved keyless/HSM-backed identity.
- Remote telemetry, uploads and privileged workflows are deny-by-default.

## 7. Testing and evidence

- Changed behaviour requires normal, boundary, failure and unauthorised-path tests at the appropriate layer.
- Coverage thresholds are component-specific and set with the first approved implementation task. Thresholds cannot be lowered to merge a change.
- CI records exact commands and tool versions. Simulation, emulation, bench, HIL, site and production evidence are labelled separately.
- Flaky tests are failures. Quarantine requires owner, issue, bounded scope and explicit merge approval; quarantined tests cannot satisfy acceptance.
- Hardware claims require device identity, firmware/driver, topology, duration, workload and raw evidence.

## 8. Release, upgrade and rollback

- APIs, schemas, models, inspection packages and hardware adapters use independent semantic versions and compatibility matrices.
- A release is built from a protected commit/tag after CI, review and release-environment approval.
- Release output includes checksums, SPDX or CycloneDX SBOM, provenance, licence notices, compatibility/migration manifest, signature and verification instructions.
- Artefacts are immutable. A defect creates a new version or revocation; existing artefacts are not overwritten.
- Upgrade includes preflight, backup, forward migration, health/golden checks and atomic activation. Failure restores the last known good release.
- Release signing and publishing are not enabled during Stage 0; workflow definitions remain non-deploying until separately approved.

## 9. Stage 0 CI scope

Stage 0 CI validates repository structure, governance files, documentation shape, JSON syntax/manifest controls, immutable action pins, secret scanning and dependency changes. Language build/test jobs activate only when an approved task adds real source and pinned build manifests. No placeholder production code may be added to create a green build.
