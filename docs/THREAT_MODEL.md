# Stage 0 Threat Model

Status: Initial review draft  
Task: TASK-0001  
Owner: Zamri Ares  

## Scope and safety boundary

This threat model covers the planned machine, edge, factory, engineering, optional central, and remote-support zones. Machine safety remains exclusively in the independent safety controller. The vision platform is not a safety-rated system and must not become a path around guards, interlocks, emergency stops, or safety PLC logic.

## Protected assets

- Deterministic inspection decisions, timing, sequence identity, and PLC handshake state.
- Approved recipes, workflows, thresholds, calibrations, device profiles, models, and packages.
- Device, service, user, publisher, and release signing identities.
- Inspection records, production evidence, audit history, and customer/site boundaries.
- Release bundles, source, build provenance, SBOMs, validation evidence, and recovery data.
- Availability of edge inspection, local spool, factory services, and recovery procedures.

## Trust zones and allowed flow classes

| Zone | Examples | Allowed flow class | Default boundary |
|---|---|---|---|
| Machine | Camera, PLC, lighting, encoder, isolated I/O | Explicit device protocols and deterministic handshakes | No direct enterprise or internet route |
| Edge vision | Runtime, local state, spool, update agent | Device traffic, authenticated factory synchronization, approved offline update | Least privilege; factory loss must not stop inspection |
| Factory services | APIs, identity, database, broker, object storage, observability | Authenticated management, ingestion, query, audit, package distribution | Deny by default; services own data access |
| Engineering | Studio, administrative workstation, model tools | Authenticated authoring, approval, validation, signed submission | No direct production DB or implicit device control |
| Enterprise/central | MES, approved central management | Versioned, authenticated integrations and approved replication | Never required for production decisions |
| Remote support | Named support identity and approved channel | Customer-approved, time-bound diagnostic access | Disabled by default; no permanent backdoor |

Exact ports, endpoints, certificate profiles, and device register maps remain unapproved until their owning designs and hardware are selected.

## Threat scenarios and required controls

| ID | Scenario | Security or safety effect | Required preventive/detective controls | Planned evidence |
|---|---|---|---|---|
| T-001 | Spoofed or replayed trigger/result/acknowledgement | Wrong part rejected or accepted; traceability loss | Sequence/boot/inspection IDs, explicit state machine, timeout, stale-message rejection, communication health | Simulation then PLC hardware-in-the-loop negative tests |
| T-002 | Malicious or malformed camera/device payload | Runtime crash, memory exhaustion, delayed decision | Bounded parsing/buffers, strict validation, adapter isolation, fuzzing, watchdog and degraded state | Parser fuzzing, malformed traffic, overload and restart tests |
| T-003 | Tampered recipe, model, plug-in, or application pack | Inspection policy changed or code executed | Signature/hash/compatibility verification, trust policy, revocation, no arbitrary runtime code | Tamper, downgrade, incompatible and revoked artefact tests |
| T-004 | Compromised model produces adversarial or erroneous findings | False accept/reject | Model output only as typed finding, deterministic policy, uncertainty/system-error handling, golden regression and drift monitoring | Contract tests, adversarial/shifted samples, rollback test |
| T-005 | Stolen user/session/service credential | Unauthorised view or privileged action | OIDC/MFA, short sessions, mTLS device/service identity, scoped RBAC, step-up/two-person approval, revocation | Role/scope negatives, token/certificate expiry and revocation tests |
| T-006 | Cross-organisation/site/station access | Customer data or control boundary breach | Server-side scope enforcement, service-owned DB roles, object prefixes/policies, audit | Cross-tenant API, DB and object-storage negative tests |
| T-007 | Audit deletion, suppression, or repudiation | Privileged changes cannot be reconstructed | Append-only controls, stable event/action IDs, protected clocks, restricted export, off-host retention where approved | Privileged tamper attempts, ordering and clock-degradation tests |
| T-008 | Factory/cloud/network outage or malicious upstream flood | Edge interruption or spool exhaustion | Edge independence, bounded queues/spool, rate/size limits, backpressure, local health and later idempotent replay | Partition, flood, spool-full, recovery and duplicate tests |
| T-009 | Supply-chain or build compromise | Signed malicious release or dependency exposure | Pinned dependencies, isolated protected signing, review, SAST/dependency/licence/secret scans, SBOM and provenance | Reproducible build, scanner evidence, signature and provenance verification |
| T-010 | Update/migration interrupted or maliciously downgraded | Station unavailable, incompatible data, weakened security | Atomic activation, anti-downgrade policy, compatibility manifest, forward-only migration, health check and rollback | Power-loss/failure injection, incompatible version and recovery tests |
| T-011 | Backup or transfer package stolen/tampered | Customer data disclosure or altered restored state | Customer-controlled encryption, signature/hash verification, scoped export, new destination identity | Wrong-key/tamper negatives, restore integrity, identity rebind test |
| T-012 | Remote support becomes persistent or bypasses approvals | Hidden privileged access to production | Off by default, customer initiation, MFA, expiry, purpose/scope restriction, recording and audit | Expiry, revocation, forbidden-action and no-backdoor network review |
| T-013 | RAG/agent prompt or tool injection | Unauthorised production write or sensitive disclosure | Approved sources, citations, scoped retrieval, tool allow-list, network/API enforcement of no control writes | Poisoned-document, prompt-injection, cross-scope and forbidden-tool red-team tests |
| T-014 | Storage exhaustion, clock manipulation, thermal/resource pressure | Missing evidence, late output, invalid ordering, silent degradation | Resource reservations/limits, monotonic deadlines, clock-quality state, retention policy, alarms and declared PLC behaviour | Storage-full, clock-step/drift, thermal and resource saturation tests |
| T-015 | Images capture people or confidential production information | Privacy, contractual, or regulatory breach | Data minimisation, explicit purpose, access/retention limits, protected export/deletion/legal hold | Access/export/deletion tests and privacy review |

## Security assumptions requiring validation

- The selected PLC, cameras, edge hardware, OS, broker, database, object store, and identity provider can support the approved security profile.
- Customer network zoning and certificate lifecycle ownership will be defined per deployment.
- Protected production signing keys will not reside on developer workstations.
- Site acceptance can exercise fail-safe/degraded states without creating a machine hazard.

## Review gate

Before Stage 0 exit, every scenario must have a named treatment owner, target stage, verification reference, and residual-risk disposition. Protocol-specific and hardware-specific threat analysis must be added after DEC-001 through DEC-003 are approved.
