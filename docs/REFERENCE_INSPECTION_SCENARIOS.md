# Stage 0 Reference Inspection Scenarios

Status: Initial scenario framework; targets and hardware are unapproved  
Task: TASK-0001  
Owner: Zamri Ares  

These scenarios establish the evidence structure needed to validate a manufacturing-independent runtime. They do not claim feasibility or performance. Each scenario requires a completed `STATION_ACCEPTANCE_TEMPLATE.md` and representative samples before it can be approved.

## Scenario REF-001 — Flexible-surface glove inspection

Purpose: Validate the first application pack against deformable material, variable pose/surface appearance, and defect-localisation requirements without placing glove-specific behaviour in the runtime core.

| Field | Current definition |
|---|---|
| Product boundary | Glove products and variants: TBD |
| Candidate defect classes | Must be supplied and approved under DEC-007; no defect list is inferred |
| Candidate vision functions | Classical/AI inspection combination: TBD from feasibility evidence |
| Camera/optics/lighting | BLOCKED by DEC-001 and optical feasibility work |
| PLC/reject integration | BLOCKED by DEC-002 and DEC-004 |
| Trigger/latency/throughput | BLOCKED by DEC-004 |
| Sample and quality targets | BLOCKED by DEC-007 |
| Acceptance evidence | Locked sample replay, target-hardware benchmark, HIL handshake/reject test, site acceptance |
| Runtime-core constraint | Glove names, defects, tolerances, and UI fields must arrive through signed pack/recipe/model/schema data |

Required variation strata include product variant, size, material/colour, supplier/process lot, shift, line condition, pose/deformation, lighting/contamination state, and each approved defect severity. Actual strata must be confirmed from production knowledge.

## Scenario REF-002 — Rigid-part dimensional and surface inspection

Purpose: Demonstrate that the same runtime supports calibrated measurement and rigid-surface findings through different certified nodes, models, and recipes.

| Field | Current definition |
|---|---|
| Product boundary | Reference moulded or metal part: TBD |
| Candidate findings | Dimensional and surface requirements: TBD; none inferred |
| Candidate vision functions | Calibration, alignment, measurement, surface inspection: subject to feasibility evidence |
| Camera/optics/lighting | TBD through a separate approved device profile |
| PLC/reject integration | TBD through an approved protocol/handshake profile |
| Measurement traceability | Calibrated reference, uncertainty method, repeatability/reproducibility plan: TBD |
| Acceptance evidence | Calibration verification, golden sample replay, target-hardware timing, HIL and site acceptance |
| Runtime-core constraint | No rigid-part-specific source changes; only certified adapters/nodes and signed configuration artefacts |

This is a Stage 6 commercial-readiness proof target. It does not authorise Stage 6 implementation during the current phase.

## Scenario REF-003 — Packaging integrity inspection

Purpose: Demonstrate that the same runtime supports discrete presence/position and print/code/label/seal-style inspection through a packaging application pack.

| Field | Current definition |
|---|---|
| Product boundary | Reference package and line: TBD |
| Candidate findings | Presence, label, print/code, fill, or seal requirements: TBD; none inferred |
| Candidate vision functions | Detection, measurement, OCR/code, classification or segmentation: selected only from feasibility evidence |
| Camera/optics/lighting | TBD through a separate approved device profile |
| PLC/reject integration | TBD through an approved protocol/handshake profile |
| Code/print quality strata | Symbology/font/content/contrast/deformation conditions: TBD when applicable |
| Acceptance evidence | Locked sample replay, target-hardware timing, code-quality testing where applicable, HIL and site acceptance |
| Runtime-core constraint | No packaging-specific source changes; only certified adapters/nodes and signed configuration artefacts |

This is a Stage 6 commercial-readiness proof target. It does not authorise Stage 6 implementation during the current phase.

## Cross-scenario proof

Commercial platform acceptance requires:

- one identifiable runtime-core release used unchanged across all three scenarios;
- scenario differences expressed only through certified adapters, nodes, models, recipes, workflows, device profiles, UI schemas, and application packs;
- versioned compatibility manifests and signed artefacts;
- scenario-specific golden/regression evidence and target-hardware benchmarks;
- failure, rollback, recovery, security, and traceability evidence appropriate to each station;
- a documented comparison showing that no domain-specific branch entered platform-core source.

## Current disposition

| Scenario | Definition | Feasibility | Targets | Acceptance |
|---|---|---|---|---|
| REF-001 | In progress | NOT VERIFIED | BLOCKED by DEC-001, DEC-002, DEC-004 and DEC-007 | NOT APPROVED |
| REF-002 | Framework only | NOT VERIFIED | TBD in its authorised stage | NOT APPROVED |
| REF-003 | Framework only | NOT VERIFIED | TBD in its authorised stage | NOT APPROVED |
