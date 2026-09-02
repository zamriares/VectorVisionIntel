# Product Verification Matrix

Status: Initial Stage 0 draft  
Task: TASK-0001  

This matrix maps baseline requirements to planned evidence. Stage assignments are planning commitments only; they do not authorise those stages.

Station-specific results must use `STATION_ACCEPTANCE_TEMPLATE.md`. Cross-industry proof is defined in `REFERENCE_INSPECTION_SCENARIOS.md`.

| ID | Requirement | Source | Planned verification | Roadmap stage | Current evidence |
|---|---|---|---|---:|---|
| V-001 | Edge inspection continues without factory, cloud, UI, RAG, or central services | Product Requirements §4; Architecture §1–3 | Network-partition and service-loss test with continued local decision/output, followed by ordered event replay | 1, 4 | NOT VERIFIED |
| V-002 | Decisions are deterministic and produce PASS, FAIL, UNCERTAIN, or SYSTEM_ERROR | Product Requirements §3.4; Architecture §6 | Unit/property tests and golden replay with fixed inputs, versions, clocks, and expected reasons | 1 | NOT VERIFIED |
| V-003 | Model output never directly drives PLC output | AGENTS.md §5; Architecture §6 | Contract/static architecture tests and end-to-end test proving typed findings pass through decision policy | 1–3 | NOT VERIFIED |
| V-004 | Queues, deadlines, and overload behaviour are bounded and observable | AGENTS.md §9; Roadmap Stage 1 | Capacity limits, overload/failure injection, deadline-miss metrics, and soak tests | 1 | NOT VERIFIED |
| V-005 | Camera/trigger/frame/result identity has no unexplained traceability gaps | Product Requirements §3.5; Architecture §6 | Sequence reconciliation under normal load, packet loss, reconnect, restart, and storage pressure | 2 | NOT VERIFIED |
| V-006 | PLC handshake and reject timing meet the approved site target | Architecture §5.2; Roadmap Stage 2 | Hardware-in-the-loop timing tests using approved PLC, I/O, machine geometry, and target rate | 2 | BLOCKED by DEC-002 and DEC-004 |
| V-007 | Workflow graphs reject cycles, invalid types, incompatible versions, and budget violations | Architecture §7 | Schema, property, fuzz, compatibility, and negative publication tests | 1, 3 | NOT VERIFIED |
| V-008 | Tampered, unsigned, revoked, or incompatible artefacts cannot activate | Architecture §8–9; Security §3–4 | Signature, hash, trust-store, revocation, downgrade, and compatibility negative tests | 3, 6 | NOT VERIFIED |
| V-009 | Organisation/site/station isolation and high-risk authorisation are enforced server-side | Architecture §10–11; Security §3 | Role/scope matrix tests, cross-tenant negative tests, MFA/step-up, two-person approval, and audit checks | 4 | NOT VERIFIED |
| V-010 | Store-and-forward delivery is idempotent and survives factory outage | Product Requirements §3.5; Architecture §10.3 | Duplicate, reorder, restart, partition, spool-full, and reconciliation integration tests | 1, 4 | NOT VERIFIED |
| V-011 | Releases are reproducible, signed, offline-installable, reversible, and include SBOM/provenance | Product Requirements §4; Security §4–5 | Clean-machine offline install, checksum/signature validation, reproducible build comparison, rollback, and secret scan | 6 | NOT VERIFIED |
| V-012 | Backup restores factory and edge state to replacement hardware within approved RPO/RTO | Security §6–7 | Encrypted export, restore, new device identity, rebind, golden sample, integrity and elapsed-time evidence | 4, 6 | BLOCKED by DEC-005 |
| V-013 | Three application packs run on one unmodified runtime core | Product Requirements §9; Roadmap Stage 6 | Release identity comparison plus acceptance suites for flexible, rigid, and packaging packs | 6 | NOT VERIFIED |
| V-014 | RAG/agents cannot write production control state | Product Requirements §3.11; Architecture §13 | Capability allow-list review, authorization negatives, network policy test, and red-team tool-injection tests | 7 | NOT VERIFIED |
| V-015 | Model lineage, reproducibility, target-runtime parity, and revocation are enforced | Product Requirements §3.7; Security §4 | Manifest/schema tests, rebuild comparison, ONNX/target benchmark, incompatible/revoked activation negatives | 5 | BLOCKED by DEC-003 and DEC-007 |

## Evidence rules

- Record exact command, environment, hardware identity, firmware/driver versions, duration, and result.
- Label simulation, emulation, bench, site acceptance, and production evidence separately.
- A passing lower evidence tier never substitutes for required hardware or site evidence.
- Replace `NOT VERIFIED` only with a durable evidence reference.
