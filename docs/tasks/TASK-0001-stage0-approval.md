# TASK-0001: Approve the product and engineering baseline

Stage: 0  
Status: Approved — in progress  
Owner: Zamri Ares (Product Owner and Technical Lead)  
Dependencies: None  
Related ADRs: ADR-0001 (`docs/adr/ADR-reference-hardware-selection.md`), ADR-0002 (`docs/adr/ADR-repository-engineering-standards.md`)  

## Execution approval

- Approved by: Zamri Ares, Product Owner
- Approved by: Zamri Ares, Technical Lead
- Approval date: 2026-09-01
- Scope: Execute Stage 0 baseline work only. This approval does not authorise Stage 1 or production implementation.

## Objective

Review the specification package, resolve Stage 0 decisions, and establish the approved specification and engineering baseline without beginning product implementation.

## Approved bounded work package — repository and engineering standards

Approved on 2026-09-01 by Zamri Ares, acting as Product Owner and Technical Lead.

- Establish the required GitHub monorepo top-level structure.
- Define branch, pull-request, ownership, language, testing, security, supply-chain, release, upgrade and rollback standards.
- Add formatter/static-analysis configuration, GitHub templates, Stage 0 CI definitions and local validation scripts.
- Record the decision in ADR-0002 and update Stage 0 records.
- Do not add runtime, camera, PLC, UI, database, ML pipeline, inspection algorithm, deployment or Stage 1 code.

## In scope

- Review product boundary and commercial configuration promise.
- Review architecture invariants, language/toolchain policy, protocols, deployment topology, and agentic boundary.
- Confirm security, transfer, backup, update, and recovery requirements.
- Confirm first camera, PLC, edge hardware, OS, inspection scenario, and measurable station targets.
- Create ADRs for every material change or unresolved choice.
- Create the verification matrix and risk register.
- Create the approved Stage 0 repository and engineering standards scaffolding.
- Update `docs/CURRENT_PHASE.md` only after named human approval.

## Out of scope

- Runtime, UI, database, protocol, camera, PLC, model, installer, and cloud implementation.
- Procurement or factory deployment.
- Claiming compliance or performance certification.

## Required reading

- `AGENTS.md`
- `README.md`
- `docs/PRODUCT_REQUIREMENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/SECURITY_PORTABILITY.md`
- `docs/DEVELOPMENT_ROADMAP.md`
- `docs/CURRENT_PHASE.md`

## Interfaces affected

All planned public contracts; no implemented interface may exist at this stage.

## Acceptance criteria

- Each open decision in `docs/CURRENT_PHASE.md` has an approved answer or a named owner and explicit evidence/progress gate.
- Architecture and security contradictions are resolved through accepted ADRs.
- Reference inspection scenarios include measurable trigger rate, latency, accuracy/error, availability, retention, and recovery targets.
- A traceability/verification matrix maps product requirements to planned tests and roadmap stages.
- A risk register covers safety boundary, samples, optics, hardware supply, protocol integration, model performance, security, portability, support, and schedule.
- Product owner and technical lead approval is recorded with date.
- Required top-level repository paths exist and glove-specific functionality is confined to `inspection-packages/glove/`.
- ADR-0002, engineering/release standards, governance templates, pinned Stage 0 workflows and local validators exist.
- Local validation results distinguish pass, failure, unavailable and not-applicable checks.
- GitHub enforcement is not claimed until repository hosting, main protection, required checks and a valid CODEOWNERS identity are evidenced.

## Required tests

- Markdown/link validation.
- Schema examples, if introduced, validate against their schemas.
- Architecture review checklist completed.
- Threat-model review completed.

## Risks and stop conditions

- Stop if hardware or protocol capability is inferred without official documentation or bench evidence.
- Stop if “industrial grade” is used without a measurable acceptance criterion.
- Stop if a requested commercial promise conflicts with the configuration boundary in product requirements.
- Stop if the baseline would permit an AI/RAG component to write directly to production control.

## Completion evidence

- Accepted ADRs.
- Updated baseline documents.
- Verification matrix and risk register.
- Review record and approval entry in `docs/CURRENT_PHASE.md`.
- Repository validation output and unavailable-check record in the session handoff.

## Repository-baseline result

Status: Implemented and hosted; independent-review enforcement evidence pending.

- Required scaffolding, standards, formatter/static-analysis configuration, GitHub templates, CI definitions and validators were created without production code.
- ADR-0002 is accepted and supersedes the earlier planned `packages/application-packs/` layout with `inspection-packages/`.
- CODEOWNERS assigns `@zamriares`, explicitly approved by Zamri Ares on 2026-09-02.
- The local Git repository and public GitHub remote contain the TASK-0001 bootstrap baseline. Protected `main`, required checks, code-owner review, stale/last-push approval, conversation resolution, linear history, admin enforcement, force-push/deletion prevention and squash-only merge are configured. Actual independent approval and merge enforcement remain NOT VERIFIED until exercised by a pull request. Signed release evidence remains outside the authorised Stage 0 workflow scope.

Local and hosted evidence recorded on 2026-09-01 and 2026-09-02:

- PASS: shell syntax for both validation scripts.
- PASS: Node syntax for both validation modules and the ESLint/Prettier configurations.
- PASS: 11 JSON files parsed; all device manifests retained `TARGET` status.
- PASS: 28 Markdown files passed local link/required-metadata validation.
- PASS: eight YAML files parsed with the locally installed PyYAML 6.0.3.
- PASS: `pyproject.toml` parsed with Python `tomllib`; `tsconfig.base.json` parsed with Node.
- PASS: `.clang-format` and `.clang-tidy` loaded using locally installed tools.
- PASS: all workflow `uses:` references are full 40-character commit SHAs.
- PASS: no implementation file exists in the scaffolded implementation roots.
- PASS: the conservative local secret-pattern scan returned no matches.
- PASS: `bash tools/validate-repository.sh` after the approved `@zamriares` CODEOWNERS assignment.
- PASS: local Git repository on `main` with authorised `origin` set to `https://github.com/zamriares/VectorVisionIntel.git`.
- PASS: bootstrap commit `4a7cbe522723134d418005f088b048302e2b2a86` pushed to `origin/main` on 2026-09-02.
- PASS: hosted `Stage 0 validation` run `33589098380` completed successfully for the bootstrap commit.
- PASS: hosted `Stage 0 validation` run `33589222920` completed successfully for evidence commit `e5cb823e7a6a788cf9dbec780398d220ea1b2e4e`.
- PASS: authenticated GitHub API readback confirmed public `main`, squash-only merge, strict required checks (`Repository baseline`, `Secret scan`, `Vulnerability and misconfiguration scan`, `Dependency and licence review`), one required approval, CODEOWNERS review, stale-review dismissal, last-push approval, conversation resolution, linear history, admin enforcement, and disabled force-push/deletion.
- PASS: manual Stage 0 SBOM run `33589395444` completed successfully for `e5cb823e7a6a788cf9dbec780398d220ea1b2e4e`. Artifact `stage0-repository-sbom.spdx.json` has GitHub digest `sha256:23faee6f52567092b64382d1cd242157a2aa0b2d37883d7ee9ddc49b9adea917` and expires on 2026-09-16.
- PASS: pull request `#1` is blocked by protected `main`; repository-baseline, secret-scan and vulnerability/misconfiguration checks passed.
- PASS: after Dependency Graph activation, the `Dependency and licence review` rerun on pull request `#1` completed successfully in workflow run `33590223847`.
- DEFERRED: independent code-owner approval. The owner directed that the second reviewer be ignored on 2026-09-02; the approved self-approval prohibition remains enabled and pull request `#1` remains blocked.
- UNAVAILABLE locally: Go, Ruff, mypy, pytest, ESLint, Prettier, TypeScript, actionlint, ShellCheck, markdownlint, Gitleaks, Trivy, Syft and Cosign execution.
