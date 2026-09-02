# Vector Vision Intelligence Platform

This repository is the controlled specification and future source tree for a reusable, industrial-grade machine-vision platform. Glove inspection is the first application package; the platform core must remain manufacturing-domain independent.

## Product promise

Vector allows trained integrators and authorised manufacturing engineers to configure cameras, inspection workflows, AI models, tolerances, decision rules, traceability, and PLC behaviour without modifying the runtime core. New hardware drivers or genuinely new inspection algorithms are added through versioned extension interfaces.

It does **not** promise that every new inspection can be commissioned by entering parameters alone. Optics, lighting, sample validation, machine integration, and occasional extension development remain engineering activities.

## Documents and authority

Read these files in order:

1. `AGENTS.md` — mandatory rules for Codex and all contributors.
2. Accepted ADRs under `docs/adr/` — approved decisions that constrain the work.
3. `docs/CURRENT_PHASE.md` — the only phase currently authorised for implementation.
4. `docs/PRODUCT_REQUIREMENTS.md` — product boundary and acceptance criteria.
5. `docs/ARCHITECTURE.md` — frozen technical architecture and interfaces.
6. `docs/SECURITY_PORTABILITY.md` — secure deployment, transfer, update, backup, and recovery.
7. `docs/DEVELOPMENT_ROADMAP.md` — gated development stages.
8. The currently approved task under `docs/tasks/`.
9. `docs/handoffs/HANDOFF-template.md` — end-of-session continuity record.

Active Stage 0 working records:

- `docs/STAGE0_DECISION_REGISTER.md` — unresolved baseline choices and required evidence.
- `docs/VERIFICATION_MATRIX.md` — requirements-to-test and roadmap traceability.
- `docs/RISK_REGISTER.md` — safety, technical, security, portability, and programme risks.
- `docs/THREAT_MODEL.md` — trust boundaries, threat scenarios, and planned controls.
- `docs/ARCHITECTURE_REVIEW_CHECKLIST.md` — Stage 0 review and exit checklist.
- `docs/STATION_ACCEPTANCE_TEMPLATE.md` — measurable station/site acceptance record.
- `docs/REFERENCE_INSPECTION_SCENARIOS.md` — three cross-industry scenario frameworks.
- `docs/compatibility/HARDWARE_COMPATIBILITY_MATRIX.md` — controlled reference and compatibility classification matrix.
- `docs/compatibility/PROTOCOL_CONFORMANCE_MATRIX.md` — protocol-specific acceptance and evidence status.
- `docs/compatibility/STAGE_0_EVIDENCE_REGISTER.md` — mandatory hardware, recovery, security, performance, and soak gates.
- `docs/compatibility/device-manifests/` — machine-readable reference-device manifests.
- `schemas/reference-device-manifest.schema.json` — manifest contract.
- `docs/ENGINEERING_STANDARDS.md` — enforceable repository, language, security and review baseline.
- `docs/RELEASE_STANDARD.md` — versioning, SBOM, signing, upgrade and rollback baseline.
- `docs/adr/ADR-repository-engineering-standards.md` — accepted monorepo and engineering governance decision.
- `docs/adr/ADR-solo-codeowner-governance.md` — accepted solo-maintainer review policy and compensating controls.

If documents conflict, `AGENTS.md` wins, followed by accepted ADRs, architecture, product requirements, security specification, roadmap, and task files.

## Repository layout

```text
apps/
edge/                    # deterministic C++20 runtime and equipment boundary
services/                # Go control-plane services
ml/                      # non-deterministic Python ML/offline tooling
schemas/                 # independently versioned contracts
inspection-packages/
  glove/                 # glove-specific package; never reusable core
deploy/                  # deployment assets after separate authorisation
docs/
tests/
tools/
.github/
```

## Current status

Stage 0 specification and engineering scaffolding baseline only. No production implementation is authorised until the Stage 0 exit criteria in `docs/DEVELOPMENT_ROADMAP.md` are evidenced and human approval advances the project.
