# Product Requirements Baseline

Status: Approved Stage 0 baseline  
Product: Vector Vision Intelligence Platform  
Initial application pack: Glove Manufacturing Inspection  
Approved by: Zamri Ares, Product Owner and Technical Lead  
Approval date: 2026-09-01  

## 1. Product objective

The Vector Vision Intelligence Platform shall be a configurable, industrial-grade machine-vision software product deployable across different manufacturing industries without rebuilding the core system for every customer.

The platform shall enable authorised users and system integrators to configure inspection applications using product-specific parameters, camera settings, inspection zones, defect classes, acceptance criteria, and production rules.

The reusable platform provides the inspection engine and governed configuration mechanisms. Each customer deployment supplies or approves its product recipe, defect definitions, trained model, hardware configuration, production integration, and measurable acceptance criteria.

## 2. Users

- Operator: runs approved recipes, acknowledges alarms, and reviews permitted results.
- Quality engineer: defines acceptance criteria, reviews uncertain results, and approves validation evidence.
- Vision engineer/integrator: configures cameras, lighting, workflows, calibration, models, and PLC mappings.
- Production engineer: maps products, lines, shifts, batches, lots, and work orders.
- Administrator: manages users, certificates, retention, backup, deployment, and security policy.
- Auditor: reviews authorised production, configuration, security, and approval records without operational control.
- Service engineer: diagnoses health with explicitly granted, time-bound, audited access.
- ML engineer: curates datasets, trains models, and submits model packages for approval.

## 3. Core functional requirements

### 3.1 Image acquisition

The platform shall support, through certified and versioned adapters:

- industrial area-scan, line-scan, thermal, and 3D cameras;
- GigE Vision, USB3 Vision, GenICam, and RTSP-compatible sources;
- hardware and software triggering;
- multiple cameras per inspection station with bounded synchronisation;
- camera health, incomplete-frame, frame-loss, connection, and timing-quality monitoring.

RTSP is suitable for monitoring and validated non-deterministic inspections. It shall not be presumed suitable for precision triggered rejection without scenario-specific evidence.

The primary vendor-neutral acquisition boundary shall be GenICam-compatible GigE Vision and USB3 Vision. Vendor SDKs and proprietary transports shall remain replaceable adapters and require an approved Hardware Compatibility List entry.

### 3.2 Inspection configuration

The platform shall support:

- configurable inspection recipes for different products and SKUs;
- regions of interest, masks, measurement zones, and exclusion zones;
- adjustable defect thresholds, tolerances, confidence policies, and production rules;
- product changeover without modifying platform-core source code;
- workflow validation and sample replay before production activation;
- versioned recipes with review, validation, approval, staging, activation, revocation, and rollback.

Production activation shall require authorised approval, compatible signed dependencies, validation evidence, a recoverable previous version, and station health confirmation.

### 3.3 Image processing and AI inference

The platform shall support:

- traditional machine-vision and image-processing algorithms;
- deep-learning classification, object detection, segmentation, and anomaly detection;
- optical character recognition, barcode/QR reading, and verification;
- dimensional and geometric measurement;
- multiple models and classical-vision nodes within one validated inspection pipeline;
- CPU, GPU, and certified edge-device inference backends.

Model output shall become a typed finding. A model shall never drive PLC, robot, actuator, or production output directly.

### 3.4 Decision and production control

Every attempted inspection shall resolve to one of four canonical outcomes:

- `PASS`: all approved acceptance rules are satisfied;
- `FAIL`: one or more approved rejection rules are satisfied;
- `UNCERTAIN`: available evidence cannot support a reliable pass/fail decision and the configured human-review or controlled disposition policy applies;
- `SYSTEM_ERROR`: acquisition, runtime, model execution, timing, storage, output, or communication failure prevents a valid inspection decision.

`REVIEW` is a workflow disposition for `UNCERTAIN`, not a separate inspection result. `UNKNOWN` shall not be used as an ambiguous production result; failures that prevent a valid decision use `SYSTEM_ERROR` with a typed reason.

The platform shall support:

- configurable defect severity, decision fusion, rejection, escalation, and reinspection rules;
- PLC, robot, reject-actuator, and production-line integration through certified adapters;
- deterministic response within the approved inspection-cycle deadline;
- explicit trigger/sequence identity, ready/busy/result/result-valid/acknowledgement/timeout/health states where applicable;
- defined fail-safe or degraded behaviour when cameras, models, storage, timing, output, or communications fail.

Machine safety remains in an independent safety controller. The platform shall not implement or replace certified personnel-protection or machine-safety functions.

### 3.5 Traceability

The platform shall:

- assign an immutable inspection identity and record timestamps plus synchronisation quality;
- store inspection outcome, reason, findings, measurements, product identity, and recipe/workflow/model versions;
- link results to organisation, site, line, station, machine, batch, lot, work order, shift, and operator where configured;
- retain selected images and defect evidence according to approved retention and privacy policies;
- provide searchable production and inspection histories;
- generate audit-ready records for configuration, approvals, deployments, results, output acknowledgement, and security events;
- detect and record missed triggers, incomplete or dropped frames, late decisions, output failures, and traceability gaps.

No loss may be silent. Images intentionally excluded by an approved evidence policy are not considered lost; any expected, acquired, selected-for-retention, or referenced image that is unavailable shall create an observable counter, state, and reason. Inspection results and required traceability records shall use durable, recoverable storage and bounded store-and-forward behaviour.

### 3.6 Monitoring and reporting

The platform shall provide:

- live inspection and station-health dashboards;
- defect counts, trends, Pareto analysis, first-pass yield, and operational performance;
- false-reject, false-accept, uncertain, and system-error monitoring using approved definitions;
- reports by product, batch, lot, machine, line, station, shift, and date range;
- authorised export to PDF, CSV, and Excel-compatible formats;
- alarms and metrics for camera, PLC, inference, storage, spool, clock, CPU/GPU, memory, network, and thermal state.

### 3.7 Model lifecycle management

The platform shall support:

- governed dataset creation, image annotation, manifests, and lineage;
- reproducible training, validation, testing, export, and controlled deployment outside the deterministic edge process;
- model versioning, approval, staged deployment, rollback, revocation, and retirement;
- performance, data-quality, and drift monitoring;
- human review and authorised feedback for continuous improvement;
- separation of experimental, validated, and production-approved models;
- model cards, checksums, signatures, supported-runtime ranges, target-hardware benchmarks, and validation reports.

ONNX is the exchange format. TensorRT is the primary NVIDIA target, with validated ONNX Runtime or certified accelerator backends where required. Unsafe pickle-like model artefacts shall not be accepted.

### 3.8 Industrial integration

The platform shall support, through versioned and secured interfaces:

- OPC UA, Modbus TCP, MQTT 5, REST/JSON, gRPC, and certified digital I/O;
- secure WebSocket connections for non-time-critical status, monitoring, and approved integration updates;
- integration with PLCs, robots, SCADA, MES, ERP, historians, and quality systems;
- store-and-forward operation during network and upstream-service interruptions;
- standardised northbound management/data interfaces and southbound device/control adapters.

Protocol and device support shall be declared in `docs/compatibility/HARDWARE_COMPATIBILITY_MATRIX.md` and `PROTOCOL_CONFORMANCE_MATRIX.md`. Security capabilities, explicit maps, timing, and failure behaviour require official documentation or labelled bench evidence.

Initial PLC compatibility targets are Siemens, Rockwell Automation, Beckhoff, Omron, Mitsubishi Electric, and CODESYS-based controllers through standards-based interfaces or certified industrial gateways. This is a validation target, not a claim that every controller, firmware, module, or protocol combination is supported.

### 3.9 Security and administration

The platform shall provide:

- role-based access for operators, engineers, quality personnel, administrators, auditors, service personnel, and ML personnel;
- secure authentication, session management, MFA for privileged roles, and scoped service/device identity;
- encryption in transit and at rest according to the approved deployment profile;
- audit logging for configuration, recipe, model, identity, deployment, remote-access, and security changes;
- signed software, configuration, plug-in, application-pack, model, installer, and update artefacts;
- backup, restoration, migration, and disaster-recovery capabilities;
- organisation, customer, site, station, and object/data isolation;
- deny-by-default remote access and privileged operations.

High-risk actions shall require step-up authentication or two-person approval where defined by policy. Audit shall not be disableable by normal administrators.

### 3.10 Deployment and maintainability

The platform shall support:

- on-premises edge and factory deployment as the standard operating mode;
- optional private-cloud, approved central-management, and hybrid integration without making cloud connectivity necessary for inspection;
- offline factory operation and signed offline installation/update bundles where required;
- containerised, pinned, version-controlled factory services and least-privilege edge system services;
- installation, upgrade, health-check, rollback, backup, restoration, migration, and licence-management mechanisms;
- hardware abstraction so supported cameras, PLCs, I/O, and inference devices can be replaced through certified adapters and revalidation rather than core rewrites;
- customer-authorised, time-bound, purpose-limited, audited remote diagnostics.

The reference production hardware class shall be an x86-64 Ubuntu LTS industrial computer with a supported NVIDIA RTX professional GPU, NVMe storage, TPM 2.0, and segregated camera and factory networks. The compact reference target is NVIDIA Jetson AGX Orin Industrial. Exact combinations require the approved compatibility classification and evidence.

Kubernetes and public cloud services shall not be required for the standard deployment.

### 3.11 Production intelligence

The platform may provide RAG over approved SOPs, manuals, defect catalogues, maintenance records, and corrective actions, plus trend, correlation, root-cause, and shift-summary assistance.

RAG and agentic components shall be isolated from deterministic inspection. They may create cited recommendations, cases, and approval requests but shall have no direct write path to PLCs, I/O, safety systems, active recipes, thresholds, retention policy, alarms, or model deployment.

## 4. Non-functional requirements

- Every station shall have approved, measurable latency, trigger-rate, throughput, reject-timing, inspection-quality, availability, retention, and recovery criteria.
- Edge inspection shall continue through loss of internet, factory services, dashboards, RAG, and optional central services when the local inspection chain remains healthy.
- Service recovery and deployment availability behaviour shall be defined per station/deployment class; no unmeasured high-availability claim is permitted.
- There shall be no silent loss of expected images, inspections, results, output state, or required traceability records.
- Deployment shall scale from one station to multiple factories using versioned contracts and declared capacity limits.
- Data-retention periods shall be configurable by site, data/evidence class, result type, and applicable policy.
- Model accuracy and operational performance shall use approved metric definitions, representative samples, target-hardware evidence, and stated statistical methods.
- Inter-service, event, extension, recipe, model, package, and stored-data contracts shall be versioned and backward-compatibility tested.
- Releases shall be reproducible from source, lockfiles, toolchain manifests, and build provenance.
- Installation shall be possible on a clean supported computer using a signed offline bundle.
- Backup shall be restorable to replacement hardware through a documented, tested recovery procedure and new device identity.
- No default password, embedded production secret, permanent vendor backdoor, or required internet dependency is permitted.
- Installation, operation, maintenance, validation, recovery, security, and supported-hardware documentation shall be complete for the declared release scope.

## 5. Supported configurable inspection categories

Support means the platform can host an appropriately engineered and validated application using certified hardware, adapters, nodes, models, workflows, and recipes. It does not mean every instance is feasible without optical and sample validation.

| Use case | Typical functions | Example applications |
|---|---|---|
| Surface-defect inspection | Detect scratches, cracks, holes, stains, dents, bubbles, and contamination | Gloves, metal, plastic, glass, rubber, and painted parts |
| Presence/absence inspection | Confirm required components or features are present | Assembly, packaging, electronics, and automotive parts |
| Object detection and counting | Locate, classify, and count products or components | Conveyor counting, component verification, and packing |
| Dimensional inspection | Measure length, width, diameter, spacing, position, and alignment | Machined parts, seals, packaging, and fabricated components |
| Assembly verification | Confirm orientation, sequence, fitment, and completeness | Automotive, electrical, and consumer-product assembly |
| OCR and code verification | Read and validate text, serial numbers, barcodes, and QR codes | Labels, packaging, traceability, and pharmaceutical products |
| Colour and appearance inspection | Verify colour, shade, uniformity, and visual finish | Textiles, food, coatings, plastics, and printed products |
| Seal and packaging inspection | Inspect seal quality, closure, fill level, damage, and label placement | Food, medical, chemical, and consumer packaging |
| Foreign-object detection | Identify unexpected materials or contaminants | Food processing, medical products, and raw materials |
| Anomaly detection | Identify validated deviations from the learned normal distribution | High-mix or low-defect manufacturing |
| Thermal inspection | Detect abnormal temperature patterns or overheating | Electrical systems, furnaces, motors, bearings, and process equipment |
| 3D inspection | Inspect height, volume, shape, deformation, and surface profile | Welding, casting, assembly, and precision components |
| Process monitoring | Observe flow, position, motion, and abnormal production conditions | Continuous production lines and automated machinery |
| Non-safety zone monitoring | Detect entry, obstruction, or unusual conditions for information and alarms only | Restricted-area awareness and material-handling observation |
| Glove inspection | Detect approved glove defect classes and dimensional/appearance deviations | Medical and industrial glove manufacturing |

Non-safety zone monitoring shall not provide personnel protection, safety interlocks, emergency-stop logic, certified safety decisions, or direct safety-control outputs. Any safety response remains the responsibility of independently certified safety devices and controllers.

## 6. Use-case configuration requirements

Every deployed use case shall define and approve:

- product variants, defect/measurement types, severity, and explicit exclusions;
- camera, lens, lighting, mounting, calibration, and environmental arrangement;
- production-line speed, trigger profile, inspection-cycle deadline, and overload behaviour;
- field of view, spatial resolution, and minimum detectable defect or measurement tolerance;
- `PASS`, `FAIL`, `UNCERTAIN`, and `SYSTEM_ERROR` rules and dispositions;
- target false-accept/detection performance, maximum false-reject rate, uncertainty rate, and statistical method;
- PLC, robot, actuator, handshake, reject-timing, and communication-health requirements;
- image/evidence/result retention, privacy, backup, RPO, and RTO requirements;
- traceability fields and upstream/downstream integration contracts;
- human-review, escalation, reinspection, and authorised feedback rules;
- applicable environmental, safety-boundary, security, privacy, contractual, and regulatory constraints;
- Site Acceptance Specification criteria and required evidence tier.

`STATION_ACCEPTANCE_TEMPLATE.md` is the controlled structure for recording these deployment-specific targets and results.

## 7. Commercial configuration boundary

The platform should make approximately 70–85% of common deployment software behaviour configurable. Remaining work is classified as:

1. Site engineering: lighting, optics, mounting, triggering, PLC addressing, machine integration, and acceptance testing.
2. Application configuration: workflows, ROIs, tolerances, model selection, decision rules, reports, and retention.
3. Extension engineering: new drivers, algorithms, model families, protocol adapters, specialised nodes, or report integrations.

The approved commercial statement is:

> The platform supports multiple manufacturing inspection applications through configurable workflows and hardware interfaces. Each application remains subject to feasibility testing, suitable imaging conditions, representative training data, and customer-approved acceptance criteria.

The platform shall not be marketed as automatically able to inspect every product or defect.

## 8. Explicit exclusions

- Safety PLC functions, certified machine-safety functions, or personnel-protection decisions.
- Autonomous process-parameter changes by an LLM, RAG, model, or agentic component.
- Guaranteed inspection of arbitrary products without optical, process, and representative-sample validation.
- Unapproved or required public-cloud dependency.
- Kubernetes in the standard single-factory deployment.
- Python in deterministic acquisition, decision, PLC, or reject-control paths.
- Direct database access by UI clients, third parties, or application packs.
- Arbitrary user code inside the deterministic edge runtime.
- Direct model output to PLC, robot, actuator, I/O, or safety systems.

## 9. Platform acceptance

The core is commercially ready only after one identifiable runtime release passes all approved gates with three technically different validated application packs:

- flexible-surface inspection: glove or textile;
- rigid-part inspection: moulded or metal part with dimensional checks;
- packaging inspection: presence, print/code, label, fill, or seal.

All three shall use the same unmodified runtime core and differ only through certified adapters, nodes, models, recipes, workflows, device profiles, UI schemas, and signed application packs. `REFERENCE_INSPECTION_SCENARIOS.md` defines the initial proof framework.
