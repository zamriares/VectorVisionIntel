# Site Acceptance Specification Template

Status: Stage 0 draft template  
Task: TASK-0001  

Use one completed specification per station class and inspection scenario. Replace every `TBD` before approval. Values must come from customer requirements, official hardware documentation, representative samples, or labelled bench/site evidence; they must not be inferred.

## 1. Approval and scope

| Field | Required value |
|---|---|
| Specification ID and version | TBD |
| Organisation/site/line/station class | TBD |
| Product/application pack | TBD |
| Recipe/workflow/model versions under test | TBD |
| Evidence tier | Simulation / emulation / bench / site acceptance / production |
| Test environment and date | TBD |
| Product Owner | Zamri Ares |
| Technical Lead | Zamri Ares |
| Customer acceptance authority | TBD |
| Safety authority, when applicable | TBD |

This specification does not certify a safety function. Machine safety remains in the independent safety controller.

## 2. Product and defect boundary

| Field | Required value |
|---|---|
| Product variants and allowed variation | TBD |
| Defect/measurement catalogue and severity | TBD |
| Explicitly excluded or unsupported conditions | TBD |
| PASS definition | TBD |
| FAIL definition | TBD |
| UNCERTAIN handling | TBD |
| SYSTEM_ERROR handling | TBD |
| Reinspection/manual-review policy | TBD |

Each defect must have an observable definition, decision mapping, smallest relevant size or tolerance where applicable, and representative validation samples.

## 3. Machine and device configuration

| Field | Required value |
|---|---|
| Camera manufacturer/model/firmware/interface | TBD |
| Lens, working distance, field of view, and resolution | TBD |
| Lighting type/controller/settings/environmental controls | TBD |
| Trigger/encoder source and electrical/interface details | TBD |
| PLC manufacturer/model/firmware/protocol | TBD |
| Approved handshake/register-map document | TBD |
| Reject mechanism, distance, actuation time, and feedback | TBD |
| Edge computer, CPU/GPU/RAM/storage | TBD |
| OS image, kernel, drivers, runtime and adapter versions | TBD |
| Network/time-synchronisation design and quality limit | TBD |
| Environmental operating range | TBD |

## 4. Workload and timing acceptance

| Metric | Required target | Measurement method | Result/evidence |
|---|---|---|---|
| Nominal line speed | TBD | Calibrated line/encoder measurement | NOT VERIFIED |
| Maximum line speed | TBD | Calibrated line/encoder measurement | NOT VERIFIED |
| Nominal trigger rate | TBD | Source trigger count over declared interval | NOT VERIFIED |
| Peak trigger rate and allowed burst | TBD | Declared burst profile and duration | NOT VERIFIED |
| Frames/cameras per inspection | TBD | Trace reconciliation | NOT VERIFIED |
| Trigger-to-decision latency p50/p95/p99 | TBD | Monotonic timestamps on target hardware | NOT VERIFIED |
| Hard decision deadline | TBD | Deadline-miss counter and trace | NOT VERIFIED |
| Decision-to-output latency | TBD | Monotonic output command trace | NOT VERIFIED |
| Output-to-PLC acknowledgement latency | TBD | Handshake trace | NOT VERIFIED |
| Reject timing margin at maximum speed | TBD | End-to-end HIL/site measurement | NOT VERIFIED |
| Sustained test duration/inspection count | TBD | Continuous declared workload | NOT VERIFIED |
| Allowed missed triggers/dropped frames/late decisions | TBD | Reconciled counters; no silent loss | NOT VERIFIED |

Report the workload, warm-up, percentile method, sample count, clock source, resource state, thermal state, and every excluded interval. Average latency alone is not acceptance evidence.

## 5. Inspection-quality acceptance

For binary defect acceptance, use these definitions unless the approved scenario defines a stricter defect-specific formulation:

- False accept: a known defective unit receives `PASS`.
- False reject: a known acceptable unit receives `FAIL`.
- Uncertain rate: units receiving `UNCERTAIN` divided by evaluated units.
- System-error rate: units receiving `SYSTEM_ERROR` divided by attempted inspections.

| Metric | Required target | Dataset/sampling method | Result/evidence |
|---|---|---|---|
| False-accept rate by critical defect | TBD | Locked representative validation set | NOT VERIFIED |
| False-reject rate by product variant | TBD | Locked representative validation set | NOT VERIFIED |
| UNCERTAIN rate and disposition | TBD | Representative production distribution | NOT VERIFIED |
| SYSTEM_ERROR rate | TBD | Sustained workload plus failure injection | NOT VERIFIED |
| Measurement error/repeatability, where applicable | TBD | Calibrated reference and repeated trials | NOT VERIFIED |
| Code/OCR performance, where applicable | TBD | Declared symbol/font/quality strata | NOT VERIFIED |
| Confidence interval/statistical method | TBD | Pre-approved analysis method | NOT VERIFIED |

Dataset evidence must identify provenance, labelling authority, product/defect strata, duplicates, exclusions, train/validation/test separation, and leakage checks.

## 6. Reliability and degraded-operation acceptance

| Scenario | Required station behaviour | Maximum recovery/loss target | Result/evidence |
|---|---|---|---|
| Factory services unavailable | Continue healthy local inspection and spool events | TBD | NOT VERIFIED |
| Camera disconnect/incomplete frame | Declared degraded or faulted state and PLC behaviour | TBD | NOT VERIFIED |
| PLC timeout/lost acknowledgement | No stale/duplicate output; declared state and alarm | TBD | NOT VERIFIED |
| GPU/inference failure | No direct model bypass; declared fallback or system error | TBD | NOT VERIFIED |
| Storage low/full | Bounded behaviour, alarm, and declared evidence policy | TBD | NOT VERIFIED |
| Clock drift/loss of synchronisation | Quality state, alarm, and declared decision policy | TBD | NOT VERIFIED |
| Resource saturation/thermal limit | No silent loss; bounded overload behaviour | TBD | NOT VERIFIED |
| Process/host restart | Traceable recovery without stale output | TBD | NOT VERIFIED |
| Power interruption | Recover to known state; reconcile durable data | TBD | NOT VERIFIED |
| Invalid/tampered/incompatible package | Reject activation and retain known-good version | No activation | NOT VERIFIED |

## 7. Availability, retention, and recovery

| Metric/policy | Required value | Measurement or verification | Result/evidence |
|---|---|---|---|
| Station availability definition and exclusions | TBD | Approved calculation and observation window | NOT VERIFIED |
| Evidence retained by result/defect type | TBD | Policy/configuration inspection | NOT VERIFIED |
| Local spool capacity by count/bytes/oldest age | TBD | Outage and capacity test | NOT VERIFIED |
| RPO per deployment class | TBD | Backup/restore drill | NOT VERIFIED |
| RTO per deployment class | TBD | Timed replacement recovery drill | NOT VERIFIED |
| Replacement-hardware revalidation scope | TBD | Restore, identity rebind, calibration and golden samples | NOT VERIFIED |

## 8. Security acceptance

- [ ] Unique device and service identities are installed without default/shared production passwords.
- [ ] Station-to-factory traffic is authenticated and encrypted under the approved certificate policy.
- [ ] Organisation/site/station and role boundaries pass unauthorised-path tests.
- [ ] Packages, models, recipes, plug-ins, installers, and updates reject tamper/incompatibility/revocation.
- [ ] Privileged actions and remote support require approved identity, scope, expiry, and audit.
- [ ] Secrets and restricted evidence are absent from logs, reports, bundles, and source.
- [ ] Backup/transfer packages pass encryption, integrity, authorisation, and wrong-key tests.

## 9. Evidence record

For each executed test, record:

- test ID, exact procedure/command, expected result, and actual result;
- software/build/package identity and configuration hashes;
- hardware serial/model identity and firmware/driver versions;
- dataset/golden-sample manifest and labelling version;
- start/end timestamps, monotonic duration, workload, and environmental conditions;
- raw trace/log/metric/report locations and cryptographic hashes where required;
- deviations, failures, retests, and approving identities.

## 10. Final disposition

| Gate | Disposition | Evidence/approval |
|---|---|---|
| Product/defect boundary approved | BLOCKED | TBD |
| Hardware/protocol configuration approved | BLOCKED | TBD |
| Timing/throughput acceptance passed | NOT VERIFIED | TBD |
| Inspection-quality acceptance passed | NOT VERIFIED | TBD |
| Reliability/degraded-state acceptance passed | NOT VERIFIED | TBD |
| Security acceptance passed | NOT VERIFIED | TBD |
| Recovery acceptance passed | NOT VERIFIED | TBD |
| Customer/site acceptance | NOT APPROVED | TBD |

Activation is prohibited while a required gate is blocked, failed, not verified, or not approved.
