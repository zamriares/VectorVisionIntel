# Stage 0 Decision Register

Status: In progress  
Task: TASK-0001  
Decision owner: Zamri Ares, Product Owner and Technical Lead  

No hardware capability, protocol detail, timing target, or commercial commitment in this register is approved until supported by official documentation, representative samples, or labelled bench evidence as applicable.

| ID | Required decision | Owner | Evidence required | Progress gate | Status |
|---|---|---|---|---|---|
| DEC-001 | Exact camera suffixes and optics for Basler ace 2 GigE/USB3, Hikrobot GigE and Basler racer 2 GigE reference targets | Zamri Ares | Optical/line calculations, official manuals, lifecycle, SDK/firmware, procurement and bench evidence | Required before Stage 0 exit | Reference families approved; exact suffixes pending engineering selection |
| DEC-002 | Exact Siemens S7-1500 CPU, CODESYS Control runtime/host/licence, isolated 24 VDC Modbus TCP I/O, security profiles and handshake maps | Zamri Ares | Official manuals, licences, secure protocol capabilities, explicit maps/ownership and bench evidence | Required before Stage 0 exit | Reference families approved; exact combinations pending engineering selection |
| DEC-003 | Exact x86 industrial PC/RTX GPU/Ubuntu image and Jetson AGX Orin Industrial carrier/JetPack/storage/network configuration | Zamri Ares | Official sources, lifecycle, TPM, CPU/GPU/storage/thermal envelope, driver matrix, network design and bench evidence | Required before Stage 0 exit | Reference platforms approved; exact configurations pending engineering selection |
| DEC-004 | Reference line speed, trigger rate, maximum decision latency, reject mechanism, and timing margin | Zamri Ares | Machine geometry, encoder/trigger design, reject distance, speed range, and measurement method | Required before Stage 0 exit | Deferred by owner on 2026-09-03; remains unresolved and required before Stage 0 exit |
| DEC-005 | Retention, availability, RPO, and RTO per deployment class | Zamri Ares | Customer operating constraints, storage sizing inputs, recovery ownership, and outage scenarios | Required before Stage 0 exit | Open |
| DEC-006 | Licensing model and offline grace requirements | Zamri Ares | Commercial policy, isolated-site behaviour, failure modes, and customer support model | Required before Stage 0 exit | Open |
| DEC-007 | Initial glove defect catalogue and validated sample volumes | Zamri Ares | Defect definitions, severity/decision mapping, production prevalence, sample provenance, and split plan | Required before Stage 0 exit | Open |

## Decision rules

- A material choice that changes an architecture invariant requires an accepted ADR and explicit human approval.
- Hardware and protocol claims require official documentation or labelled bench evidence.
- Performance targets must state conditions, percentile/statistic, observation duration, and failure treatment.
- Every approved decision must identify its verification method and rollback or substitution impact.
- Progress is evidence-gated and dynamic. Calendar delivery deadlines are not required; audit and approval dates are still recorded when events occur.
