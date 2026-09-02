# Stage 0 Architecture Review Checklist

Status: Open  
Task: TASK-0001  
Reviewer/approver: Zamri Ares, Product Owner and Technical Lead  

Use `PASS`, `FAIL`, `BLOCKED`, or `NOT REVIEWED`. A `PASS` requires a durable evidence reference; prose intent alone is insufficient where the item requires a test or external capability.

## Product and safety boundary

- [x] Core remains manufacturing-domain independent; glove behaviour exists only in packages, recipes, nodes, and models. Evidence: approved `PRODUCT_REQUIREMENTS.md` §1, §9.
- [x] Vision is explicitly outside certified machine-safety functions and cannot bypass the safety controller. Evidence: approved `PRODUCT_REQUIREMENTS.md` §3.4, §5, §8.
- [x] Configuration promise distinguishes site engineering, application configuration, and extension engineering. Evidence: approved `PRODUCT_REQUIREMENTS.md` §7.
- [ ] Reference inspections have measurable accuracy/error, trigger, latency, availability, retention, and recovery targets.

## Runtime ownership and failure containment

- [ ] C++20 exclusively owns acquisition, deterministic pipeline/decision, PLC handshake, and reject timing.
- [ ] Python is absent from the critical runtime and is limited to training, evaluation, export, and tooling.
- [ ] UI, factory, cloud, RAG, and agents are unnecessary for continued healthy edge inspection.
- [ ] Model outputs become typed findings and cannot directly drive PLC or I/O.
- [ ] Queue, memory, time, restart, overload, degraded-state, and observability behaviour is bounded and specified.

## Contracts, extension, and compatibility

- [ ] Public/stored contracts are versioned with compatibility rules and negative tests.
- [ ] Workflow DAG validation rejects cycles, invalid types, missing dependencies, fan-out, and budget violations.
- [ ] Extension ABI/isolation/signature/runtime-compatibility policy is testable and arbitrary user code is prohibited.
- [ ] Artefact identity, signature, dependency, migration, revocation, and rollback contracts are defined.
- [ ] Database/event/object ownership, idempotency, tenancy, retention, and recovery contracts are defined.

## Hardware and industrial integration

- [ ] Initial camera/model/interface and SDK/firmware support range are approved from official evidence.
- [ ] Initial PLC/model/protocol and explicit handshake/register ownership are approved from official evidence.
- [ ] Exact edge hardware, OS image, GPU/driver, storage, network, time, and thermal support matrix is validated. Approved targets are recorded in `docs/compatibility/HARDWARE_COMPATIBILITY_MATRIX.md`; exact configurations and evidence remain open.
- [ ] Reference line/reject geometry and timing measurement method are approved.
- [ ] Hardware-in-the-loop and site acceptance plans distinguish simulation, bench, and production evidence.

## Security and operations

- [ ] Zones, conduits, allowed flows, identity, authentication, authorisation, and certificate ownership are defined.
- [ ] Organisation/site/station isolation is enforced server-side and covered by negative tests.
- [ ] Privileged actions use step-up or two-person approval and create protected audit evidence.
- [ ] Build/signing/update/revocation/SBOM/provenance processes exclude production secrets from developer systems.
- [ ] Offline install, update failure, rollback, backup, restore, migration, replacement identity, and revalidation are testable.
- [ ] Remote support is disabled by default, customer-approved, time-bound, scoped, and audited.
- [ ] RAG/agent access is technically prevented from production-control writes.

## Stage 0 exit disposition

- [ ] DEC-001 through DEC-007 have approved answers and required evidence.
- [ ] Verification matrix is accepted with owners and evidence plans.
- [ ] Risk register has treatment owners, dates, and approved residual-risk dispositions.
- [ ] Threat model is reviewed with protocol/hardware additions and no unresolved critical risk.
- [ ] Required ADRs are accepted and contradictions are resolved.
- [ ] Product Owner and Technical Lead record Stage 0 exit approval with date.

Current disposition: `BLOCKED` by open DEC-001 through DEC-007 and incomplete review evidence.
