# Current Authorised Phase

Phase: Stage 0 — Product and engineering baseline  
Status: Specification and repository-baseline work authorised; product implementation not authorised  
Last updated: 2026-09-02  

Progress model: Dynamic and evidence-gated; no calendar delivery milestones. Dates record audit events only.  

## Current objective

Review and approve the product boundary, architecture, security/portability requirements, development stages, initial hardware/protocol targets, and measurable acceptance criteria.

## Development progress

- TASK-0001 remains approved and in progress; Stage 0 exit has not been approved.
- The Stage 0 specification, compatibility, governance, validation and repository-scaffolding baseline is hosted at `https://github.com/zamriares/VectorVisionIntel` with no product implementation.
- Protected `main` is configured with squash-only merge, strict required checks, CODEOWNERS review, stale-review dismissal, last-push approval, resolved conversations, linear history, admin enforcement, and force-push/deletion prevention.
- Pull request `#1` records governance and SBOM evidence. For evidence commit `57a046647cfafce11f52605211b6586812ec8412`, repository baseline, secret scan, vulnerability/misconfiguration scan, and dependency/licence review all passed.
- Manual Stage 0 SBOM run `33589395444` passed. The retained SPDX JSON artifact has GitHub digest `sha256:23faee6f52567092b64382d1cd242157a2aa0b2d37883d7ee9ddc49b9adea917` and expires on 2026-09-16.
- Pull request `#1` remains blocked by the approved independent-review requirement. The second reviewer was deferred on 2026-09-02; the control was not disabled or bypassed.
- DEC-001 through DEC-007 and the mandatory hardware, protocol, recovery, security, performance and 72-hour soak evidence remain open or blocked. No hardware or site acceptance claim has been made.

## Allowed work

- Improve specifications, schemas, ADRs, risk register, test strategy, and acceptance templates.
- Create repository scaffolding, formatting/lint configuration, CI skeleton, and documentation checks only after explicit approval.
- Create bounded tasks for Stage 1.

## Prohibited work

- Production runtime, web application, database, model, PLC, camera, installer, or cloud implementation.
- Advancing to Stage 1 without human approval recorded in this file.
- Changing frozen stack or boundaries without an ADR.

## Stage 0 open decisions

- Initial certified camera brand/models and interface.
- First PLC brand/model and required protocols.
- Target edge hardware classes and supported operating-system image.
- Reference line speed, trigger rate, maximum decision latency, and reject mechanism.
- Required retention, availability, RPO, and RTO per deployment class.
- Licensing model and offline grace requirements.
- Initial glove defects and validated sample volumes.

## Approved Stage 0 baselines

- Product Requirements approved on 2026-09-01 by Zamri Ares, acting as Product Owner and Technical Lead.
- Vendor-neutral acquisition, integration protocols, initial controller families, and reference edge hardware classes approved as validation targets on 2026-09-01. Exact models, versions, mappings, and compatibility evidence remain open.
- ADR-0001 accepted the reference-hardware targets and three compatibility classifications. Stage 0 evidence remains blocked pending exact engineering selections and required bench/soak results.
- ADR-0002 accepted the GitHub monorepo, trunk-based governance, language boundaries, independent artefact versioning, supply-chain controls and Stage 0 engineering standards. Repository scaffolding and validation configuration were authorised on 2026-09-01; product implementation remains prohibited.

## Approval record

- TASK-0001 execution approved on 2026-09-01 by Zamri Ares, acting as Product Owner and Technical Lead.
- TASK-0001 repository and engineering standards work package approved on 2026-09-01 by Zamri Ares, acting as Product Owner and Technical Lead.
- Stage 0 exit approval: Not recorded. Stage 1 and production implementation remain unauthorised.
