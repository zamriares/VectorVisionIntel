# Codex Operating Contract

This file is mandatory for every Codex session and applies to the entire repository. More specific nested `AGENTS.md` files may add constraints but may not weaken these rules.

## 1. Mission

Build Vector Vision Intelligence as a secure, industrial-grade, manufacturing-independent vision platform. Glove inspection is the first application pack, never hard-coded platform behaviour.

Priorities, in order:

1. Human and machine safety boundaries.
2. Correct deterministic inspection and output behaviour.
3. Security, traceability, recovery, and data integrity.
4. Stable contracts and backward compatibility.
5. Measured performance and availability.
6. Maintainability and usability.
7. Feature breadth and development speed.

## 2. Mandatory context-loading sequence

Before planning or editing, Codex must read completely:

1. This `AGENTS.md`.
2. `docs/CURRENT_PHASE.md`.
3. The active approved file under `docs/tasks/`.
4. Every document named in that task's Required reading section.
5. Relevant accepted ADRs and the nearest nested `AGENTS.md`.

If there is no approved active task, stop after inspection and propose a bounded task. Do not begin implementation.

Do not rely on chat memory as the source of truth. Repository documents and accepted ADRs control implementation.

## 3. Source-of-truth hierarchy

When instructions conflict, use this order:

1. Safety and explicit current human instruction.
2. This file and applicable nested `AGENTS.md` files.
3. Accepted ADRs, newest superseding older.
4. `docs/ARCHITECTURE.md`.
5. `docs/PRODUCT_REQUIREMENTS.md`.
6. `docs/SECURITY_PORTABILITY.md`.
7. `docs/DEVELOPMENT_ROADMAP.md` and `docs/CURRENT_PHASE.md`.
8. Approved active task.
9. Existing implementation and comments.

Stop and report unresolved contradictions. Never silently select the convenient interpretation.

## 4. Phase and scope control

- Work only in the stage authorised by `docs/CURRENT_PHASE.md`.
- Work only on one approved task at a time.
- Keep changes small and reviewable. Split work when it crosses more than one major component or cannot be verified within the task.
- Do not add adjacent features, speculative abstractions, new infrastructure, or broad refactors.
- Do not advance a stage, declare a gate passed, or modify the approval record without human approval.
- Treat absence of detail as an unknown, not permission to invent.

## 5. Architecture invariants

The following cannot change without an accepted ADR and human approval:

- C++20 owns acquisition, pipeline execution, deterministic decision, PLC handshake, and reject timing.
- Python is limited to training, evaluation, export, and non-critical tooling.
- Go owns factory control-plane services.
- TypeScript/React owns web interfaces and never directly controls equipment or databases.
- Platform core remains industry independent; industry behaviour is in signed packages, recipes, nodes, and models.
- Edge inspection continues without UI, factory services, cloud, RAG, or agentic services.
- Model output never drives PLC output directly; the deterministic decision engine evaluates typed findings.
- RAG/agents have no direct write path to PLC, I/O, active recipes, thresholds, safety systems, or deployment.
- No Kubernetes or required public-cloud dependency in the standard deployment.
- Public contracts and stored data are versioned; deployed artefacts are signed and reversible.
- Arbitrary user code is never executed inside the edge runtime.

## 6. Required work cycle

For every task:

1. Restate objective, in-scope files, acceptance criteria, and stop conditions.
2. Inspect existing code, tests, schemas, ADRs, and repository status before editing.
3. Identify security, safety, compatibility, migration, failure, and observability effects.
4. If a material design choice is missing, draft an ADR and stop for approval.
5. Implement the smallest complete vertical change.
6. Test normal, boundary, failure, and unauthorised paths relevant to the change.
7. Run formatters, linters, static analysis, dependency checks, and targeted tests.
8. Review the diff for scope creep, secrets, insecure defaults, and undocumented contract changes.
9. Update specifications, generated contracts, task evidence, and handoff.
10. Report actual evidence, remaining risks, and the next bounded task. Never claim success from code inspection alone.

## 7. Anti-hallucination and anti-drift rules

- Never invent files, APIs, schemas, test results, hardware behaviour, protocol fields, benchmark numbers, customer requirements, or completed work.
- Locate symbols and files using repository search before referring to them.
- Quote command results accurately. If a tool or hardware test was not run, say `NOT VERIFIED`.
- Do not substitute mocks for hardware acceptance. Label simulation, emulation, bench, and production evidence separately.
- Do not infer a protocol register, PLC address, camera capability, safety state, or timing guarantee. Require an approved interface document or device manual.
- Do not change language, framework, database, broker, protocol, deployment method, or security control because another option appears easier.
- Do not create a second implementation path when an approved abstraction exists.
- Do not weaken tests to make a change pass. Fix the cause or report the blocker.
- Do not delete or rewrite user work outside task scope.
- At approximately 60% of the available context window, stop expanding scope, update the handoff, and finish or split the task.
- When resuming, trust the latest repository handoff and rerun its verification; do not reconstruct state from memory.

## 8. Stop conditions

Stop implementation and request a decision when:

- the task is missing, unapproved, ambiguous, or outside the current stage;
- requirements conflict or an architecture invariant would change;
- a safety, security, privacy, licensing, or data-loss risk lacks an approved treatment;
- production hardware/protocol information is required but absent;
- a migration or public contract is not backward compatible;
- credentials, certificates, signing keys, customer data, or external write access are needed but not explicitly available;
- a destructive operation or production deployment was not explicitly authorised;
- verification cannot distinguish a safe result from a false positive;
- unrelated dirty work overlaps the requested files.

Provide the exact blocker, evidence, available choices, and recommended ADR or task update. Do not guess.

## 9. Coding and interface rules

### General

- Prefer explicit state machines, typed errors, bounded queues, timeouts, cancellation, idempotency, and deterministic configuration.
- Validate untrusted data at every trust boundary and cap sizes, rates, recursion, memory, and execution time.
- Use UTC for persisted wall time and monotonic clocks for durations/deadlines.
- Use stable identifiers; never use display names as keys.
- No silent fallback that changes inspection quality or security posture.
- No secrets, customer images, production datasets, generated binaries, or private keys in source control.
- Dependencies must be pinned, reviewed, licence checked, and represented in the SBOM.

### C++ edge

- C++20, RAII, explicit ownership, `std::chrono`, no unchecked buffer operations, no exceptions across ABI boundaries.
- Stable C ABI for plug-ins; validate ABI/version/signature before loading.
- No unbounded allocation or blocking network call in time-critical paths.
- Threading, queue ownership, deadlines, and degraded states must be documented and tested.
- Sanitizers, static analysis, fuzzing, and hardware-in-the-loop tests are release inputs.

### Go services

- Propagate context deadlines and cancellation.
- Wrap errors with operation context without leaking secrets.
- Transactions define consistency boundaries; consumers are idempotent.
- APIs require authentication, authorisation, scope, validation, rate limits, and audit where applicable.

### TypeScript web

- Strict TypeScript; generated API clients where contracts exist.
- No business-critical truth only in browser state.
- Never expose service, database, camera, PLC, broker, or object-store credentials.
- Treat all displayed and uploaded data as untrusted; enforce server-side authorisation.

### Python model factory

- Pinned reproducible environment and deterministic seeds where supported.
- Dataset lineage, split integrity, metric definitions, model card, and export validation are mandatory.
- Deserialise only approved safe formats. Never load untrusted pickle-like artefacts.
- Exported models require target-runtime parity and target-hardware benchmarks.

### Contracts and database

- Contract-first changes: update schema, compatibility tests, generated clients, implementation, and documentation together.
- Never reuse Protobuf field numbers or silently change field meaning/unit.
- Database migrations are forward-only, reviewed, backed up, tested on representative volume, and supplied with recovery procedure.
- UI and third parties never connect directly to production database tables.

## 10. Security requirements for every change

Review:

- authentication and authorisation;
- organisation/site/station isolation;
- input size/type/rate validation;
- secrets and sensitive logging;
- transport and storage encryption;
- package/dependency trust;
- audit and repudiation;
- rollback and recovery;
- effect of partial outage or malicious upstream input.

Use deny-by-default. Remote access, telemetry export, cloud connection, and privileged actions are disabled until explicitly configured and audited.

## 11. Testing evidence

Use the applicable layers:

- unit and property tests;
- schema and API contract tests;
- integration tests with real database/broker/storage;
- simulation tests labelled as simulation;
- hardware-in-the-loop tests with device identities and firmware recorded;
- golden-image/model regression tests;
- failure injection, restart, network partition, storage-full, clock, and overload tests;
- security, fuzz, dependency, and secret scans;
- performance and long-duration soak tests on declared hardware;
- installer, upgrade, rollback, backup, restore, and clean-machine tests.

Record exact commands, environment, versions, duration, and results. Never write “all tests pass” without evidence.

## 12. Git and file safety

- Inspect `git status` before and after work.
- Preserve unrelated user changes.
- Never use destructive reset, checkout, clean, recursive delete, history rewrite, force push, or production deployment without explicit authorisation.
- Generated files must state their generator and be reproducible.
- Commit messages, branches, and release tags follow the project convention once defined.

## 13. Completion response

Every completed task report must state:

- outcome first;
- changed files;
- verification commands and actual results;
- unverified items;
- security/compatibility/migration effects;
- remaining risks or blockers;
- exact next bounded task.

Update or create a file under `docs/handoffs/` before ending a material implementation session.
