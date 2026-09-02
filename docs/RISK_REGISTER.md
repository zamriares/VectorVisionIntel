# Stage 0 Risk Register

Status: Initial draft  
Task: TASK-0001  
Risk owner unless reassigned: Zamri Ares  

Scale: Likelihood and impact are `Low`, `Medium`, `High`, or `Critical`. Ratings are preliminary until Stage 0 review.

| ID | Risk | Likelihood | Impact | Required treatment/evidence | Trigger or early warning | Status |
|---|---|---|---|---|---|---|
| R-001 | Vision output is mistaken for a safety-rated control function | Medium | Critical | Explicit safety boundary in contracts/UI; independent safety controller; hazard review and acceptance checklist | Request to bypass safety PLC or use vision output as personnel protection | Open |
| R-002 | Samples do not represent defect, product, supplier, shift, and process variation | High | High | Governed sample strategy, provenance, leakage controls, defect coverage, held-out production validation | Strong lab metrics with weak or unmeasured production performance | Open |
| R-003 | Optics, lighting, motion, contamination, or mounting make the inspection physically unreliable | High | High | Optical feasibility study, controlled lighting design, image-quality limits, maintenance and golden-sample checks | Blur, glare, occlusion, drift, or unexplained uncertain/false-call increase | Open |
| R-004 | Selected cameras, edge computers, GPUs, or drivers have lifecycle or supply constraints | Medium | High | Certified compatibility matrix, lifecycle evidence, approved substitutes, pinned driver/OS combinations | End-of-life notice, long lead time, unsupported driver or OS update | Open |
| R-005 | PLC/protocol assumptions create unsafe or mistimed reject behaviour | Medium | Critical | Official register/handshake specification, sequence IDs, timeout/degraded states, hardware-in-the-loop evidence | Ambiguous ownership, missing acknowledgement, stale result, timing overrun | Open |
| R-006 | Latency/throughput targets are estimated instead of measured under worst conditions | High | High | Approved workload and statistic; sustained hardware test with overload, thermal, storage, and network faults | Mean-only benchmark, missing deadline-miss accounting, unexplained dropped frames | Open |
| R-007 | Model accuracy hides unacceptable false accept, false reject, uncertainty, or drift | High | High | Defect-specific metrics, confidence policy, deterministic fusion, drift monitoring, rollback and revalidation | Aggregate accuracy only, changing material/process, elevated uncertain rate | Open |
| R-008 | Compromised package, dependency, model, plug-in, update, or signing process reaches production | Medium | Critical | Protected signing, provenance, SBOM, scanning, revocation, tamper rejection, offline verification | Unsigned artefact, secret in build, expired vulnerability exception | Open |
| R-009 | Tenant/site/station data or privileges cross trust boundaries | Medium | Critical | Deny-by-default identity/scope design, service-owned DB roles, negative isolation tests, immutable audit | UI-only checks, shared credentials, missing site predicate or audit gap | Open |
| R-010 | Backup exists but cannot meet recovery objectives on replacement hardware | Medium | High | Approved RPO/RTO, automated integrity checks, restore drills, identity rebind and calibration revalidation | Untested backup, copied private identity, incompatible release/hardware | Open |
| R-011 | Platform becomes coupled to glove logic or a vendor-specific SDK | Medium | High | Domain-neutral contracts, isolated adapters, three-pack acceptance, substitution tests | Product terms in runtime core or vendor types leaking into public contracts | Open |
| R-012 | Offline licensing or remote support interrupts production or creates a backdoor | Medium | High | Approved grace policy; fail-safe commercial behaviour; customer-initiated time-bound audited support | Internet requirement, permanent tunnel, shared vendor credentials | Open |
| R-013 | Industrial verification scope exceeds available team, hardware, or factory access | High | High | Stage gates, named owners, procurement/access schedule, bounded application/hardware scope | Stage overlap without frozen contracts or unavailable HIL/site access | Open |
| R-014 | Operational evidence captures personal or sensitive information beyond need | Low | High | Data classification, minimisation, retention/access policy, privacy review and auditable deletion/export | People visible in images, unrestricted export, undefined retention | Open |

## Review requirements

- Assign a treatment owner and evidence-based progress gate before Stage 0 exit.
- Record accepted residual risk and approving role; do not silently close risks.
- Escalate architecture-boundary changes through an ADR.
- Reassess risks when hardware, protocols, application scope, deployment topology, or security boundaries change.
