# Gated Development Roadmap

The platform is developed as a production product, not a throwaway POC. Early stages reduce technical and commercial risk, but all accepted code follows production security, testing, versioning, and documentation rules.

Codex may work only within the stage marked active in `CURRENT_PHASE.md`. Passing tests does not authorise the next stage; human approval does.

Progress is dynamic and evidence-gated. Stages have dependencies and exit criteria, not calendar delivery milestones. Dates are recorded only for audit events such as approvals, reviews, releases, and collected evidence.

## Programme sequence

Progress depends on verified outcomes and available hardware, customer samples, factory access, and a capable team covering edge/C++, backend/Go, frontend/TypeScript, ML/Python, QA/automation, DevSecOps, and industrial vision/controls.

| Stage | Dependency | Commercial outcome |
|---|---|---|
| 0. Baseline | None | Approved build contract and risks |
| 1. Edge skeleton | Stage 0 | Deterministic simulated vertical slice |
| 2. Devices/inference | Stage 1, hardware | Real-camera and PLC foundation |
| 3. Configuration platform | Stages 1–2 | First configurable glove application pack |
| 4. Factory operations | Stable contracts | Secure multi-station management |
| 5. Model factory | Model contracts and data | Governed training/deployment pipeline |
| 6. Commercial hardening | Stages 2–5 | Cross-industry sellable release candidate |
| 7. Intelligence | Reliable operational data | Governed RAG/agentic option |
| 8. Scale/ecosystem | Commercial release | Multi-site and partner readiness |

Stages 4 and 5 may overlap after contracts are frozen. Stage 7 must not delay or enter the deterministic runtime. Schedule pressure must be handled by reducing certified hardware or application scope, never by removing industrial verification.

## Stage 0 — Product and engineering baseline

Goal: freeze boundaries before implementation.

Deliverables:

- approved product requirements and supported use cases;
- architecture and threat model;
- protocol and hardware compatibility targets;
- performance measurement method and station acceptance template;
- repository, branching, CI, coding, review, release, and ADR standards;
- data classification, retention, backup, and recovery requirements;
- initial schemas for inspection result, event, recipe, workflow, model, package, and device profile;
- three reference inspection scenarios and representative sample strategy.

Exit gate:

- documents reviewed and signed off;
- unresolved decisions listed with owners;
- no critical interface is defined only in prose;
- initial risk register and verification matrix accepted.

## Stage 1 — Core contracts and deterministic edge skeleton

Goal: establish a testable runtime without vendor lock-in.

Deliverables:

- C++20 runtime process, lifecycle, structured logging, metrics, watchdog, and local state;
- stable frame/finding/decision/result types;
- workflow parser and schema validator;
- simulated camera, trigger, PLC, clock, and inference adapters;
- bounded queues, deadline tracking, and store-and-forward spool;
- deterministic decision engine with all four outcomes;
- unit, property, fuzz, soak, and failure-injection test harnesses;
- Go control-plane skeleton and versioned contracts.

Exit gate:

- simulated end-to-end inspection and handshake pass reproducibly;
- overload has explicit behaviour and never silently drops decisions;
- runtime survives/reports injected camera, PLC, storage, service, and clock failures;
- contract compatibility tests pass.

## Stage 2 — Industrial device and inference foundation

Goal: connect certified hardware and execute real pipelines.

Deliverables:

- GenICam/GigE Vision adapter and one certified camera family;
- lighting/trigger and Modbus TCP adapter;
- OPC UA secure client/server mapping as required;
- OpenCV/CUDA built-in nodes;
- ONNX Runtime and TensorRT inference adapters;
- calibration, image-quality checks, hardware profiles, and benchmark tooling;
- PLC handshake and reject-queue validation with real hardware;
- hardware-in-the-loop test rig.

Exit gate:

- sustained target-rate test on reference hardware;
- frame/trigger/result traceability has no unexplained gaps;
- power, cable, network, device, driver, and GPU failure tests pass;
- latency and throughput baselines are documented, not estimated.

## Stage 3 — Recipe, workflow, and application-package platform

Goal: make deployment configurable without core changes.

Deliverables:

- versioned workflow/recipe/device/model/application-pack schemas;
- review, approval, staging, activation, revocation, and rollback service;
- signed package verifier and compatibility resolver;
- extension SDK and at least one out-of-process reference node;
- Engineering Studio foundation with live preview, ROI, node graph, replay, and validation;
- golden-sample and regression-pack execution;
- first glove inspection pack.

Exit gate:

- authorised engineer creates and activates a recipe without editing source;
- incompatible/tampered packages are rejected;
- rollback restores known-good behaviour;
- glove pack installs and runs without changes to runtime core.

## Stage 4 — Factory data, operations, and security baseline

Goal: provide multi-station production management.

Deliverables:

- identity, RBAC, site/station scope, MFA integration, and approval policy;
- PostgreSQL, object storage, MQTT, API gateway, and Go services;
- inspection ingestion, idempotency, search, evidence, audit, alarms, reports, and exports;
- operator and operations interfaces;
- offline buffering and deterministic replay;
- deployment inventory, fleet health, and remote-support controls;
- backup, restore, migration, retention, and security-event procedures.

Exit gate:

- tenant/site isolation and privilege tests pass;
- edge continues while every factory service is stopped;
- restored replacement server reconciles buffered events correctly;
- complete audit trail exists for high-risk actions.

## Stage 5 — Model factory and MLOps

Goal: create governed datasets and deployable model packages.

Deliverables:

- dataset manifests, annotation workflow, lineage, quality checks, and access controls;
- training/evaluation pipelines with pinned environments;
- ONNX export, TensorRT build, target-hardware benchmark, and model card;
- validation thresholds, false-accept/false-reject analysis, approval workflow;
- drift and data-quality monitoring;
- staged deployment, canary where technically safe, rollback, and revocation;
- optional TAO integration behind the model-factory interface.

Exit gate:

- model is reproducible and traceable from samples to deployed engine;
- target-hardware results match declared acceptance limits;
- revoked or incompatible models cannot activate;
- model failure cannot bypass deterministic decision policy.

## Stage 6 — Cross-industry proof and commercial hardening

Goal: prove the platform is not glove-specific.

Deliverables:

- rigid-part application pack with dimensional and surface inspection;
- packaging application pack with presence/label/code/seal inspection;
- second camera family and additional approved PLC integration;
- installer, offline bundle, licensing, compatibility matrix, SBOM, signatures, upgrades, rollback, and migration;
- clean-machine installation and replacement-hardware recovery tests;
- full operator/admin/integrator manuals;
- performance, security, penetration, long-duration soak, and factory acceptance evidence.

Exit gate:

- three packs run on the same unmodified runtime core;
- clean install and secured transfer to replacement computers pass;
- no open critical security/reliability defects;
- support, patch, release, and end-of-life policy approved.

## Stage 7 — Production intelligence and agentic supervisor

Goal: add governed decision support after inspection reliability is proven.

Deliverables:

- approved knowledge ingestion with document lineage and access control;
- cited RAG answers and evaluation set;
- defect trend, correlation, and case-management tools;
- recommendation and approval workflow;
- agent audit, prompt/policy versioning, tool allow-list, and red-team tests;
- explicit technical enforcement of no direct control writes.

Exit gate:

- RAG quality and security evaluation meet accepted thresholds;
- recommendations are traceable and cannot alter production state;
- loss or failure of intelligence services has zero effect on inspection execution.

## Stage 8 — Scale, certification readiness, and ecosystem

Goal: operate a supported commercial product across factories.

Deliverables:

- multi-site release channels and fleet policy;
- partner SDK certification and conformance suite;
- support diagnostics with privacy controls;
- capacity planning and high-availability options;
- security response and customer advisory process;
- evidence package for applicable customer/regulatory assessments.

Exit gate:

- controlled upgrade across representative sites;
- disaster-recovery exercises meet customer RPO/RTO;
- partner extension cannot destabilise core runtime beyond declared containment;
- commercial service-level and supported-hardware policies approved.

## Universal definition of done

A task is done only when:

- acceptance criteria are met with evidence;
- code is reviewed, formatted, linted, statically analysed, and tested;
- negative paths and security effects are covered;
- schemas/docs/ADRs are updated where required;
- no secret or sensitive sample is committed;
- compatibility and migration effects are documented;
- observability exists for production diagnosis;
- installation/rollback changes are tested;
- `CURRENT_PHASE.md` and a handoff record are updated.
