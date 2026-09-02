# Complete Platform Architecture

Status: Proposed architecture baseline. Changes require an accepted ADR.

## 1. Architectural principles

1. Deterministic control is local. Acquisition, inspection decision, reject timing, and PLC output run at the edge.
2. Platform core is domain independent. Industry behaviour is delivered through signed application packages.
3. Configuration is data, not source-code modification. Recipes and workflows are schema-validated and versioned.
4. Failures are contained. Loss of UI, factory server, cloud, RAG, or analytics cannot stop an otherwise healthy inspection station.
5. AI supports inspection; it does not replace deterministic state, validation, or safety controls.
6. Every deployed artefact is identifiable, signed, auditable, and reversible.
7. No hidden coupling to a camera vendor, PLC vendor, GPU model, factory, or cloud provider.

## 2. System context

```text
Machine/camera/lighting/encoder
              |
              v
      Edge Inspection Station --------> PLC / reject mechanism
              |
        store and forward
              v
         Factory Platform ------------> MES / SCADA / historian
              |
              v
  Optional Central Management --------> approved remote support
```

Machine safety remains in the safety controller. The platform may report safety-related status but is not a safety-rated control system.

## 3. Deployment planes

### 3.1 Edge execution plane

One station process owns each physical acquisition and decision chain.

Components:

- Device manager: camera, lighting, trigger, encoder, I/O, and PLC lifecycle.
- Acquisition engine: buffers, timestamps, frame IDs, trigger correlation, synchronization, and quality checks.
- Pipeline executor: validated directed acyclic workflow graph with bounded resources.
- Node host: built-in or sandboxed extension nodes with declared inputs, outputs, memory, and timing budgets.
- Inference manager: TensorRT, ONNX Runtime, and certified accelerator adapters.
- Decision engine: deterministic rules, tolerance logic, confidence handling, and result fusion.
- Output controller: PLC result handshake, reject queue, acknowledgement, timeout, and safe degraded state.
- Evidence manager: result record, image selection, compression, encryption policy, and retention buffer.
- Local state store: recipes, deployed packages, station configuration, event spool, and audit cache.
- Health supervisor: watchdog, process recovery, resource limits, thermal status, clock drift, dropped frames, and output health.
- Update agent: verifies signed release bundles, performs atomic activation, health check, and rollback.

Hard rule: no UI, RAG, cloud SDK, training framework, or general-purpose scripting interpreter is loaded into the critical runtime process.

### 3.2 Factory management plane

Docker Compose on a supported Ubuntu Server LTS installation is the standard deployment.

Services:

- API gateway and reverse proxy.
- OIDC identity integration and local break-glass administration.
- Control-plane API.
- Recipe, workflow, device-profile, and station registry.
- Model and application-package registry.
- Deployment promotion and fleet-health service.
- Inspection-result ingestion and query service.
- Audit service with append-only controls.
- Reporting and export service.
- Object-storage gateway.
- Notification and alarm-routing service.
- RAG ingestion/query service, isolated from control APIs.
- Agentic supervisor, read-mostly and approval gated.

### 3.3 Optional central plane

- Multi-site inventory and health.
- Signed release and model distribution.
- Cross-site analytics using approved replicated data.
- Licence management designed with an offline grace policy.
- Remote support through customer-approved, time-bound access.

The central plane is never required to make a production decision.

## 4. Frozen language and toolchain policy

| Area | Language/runtime | Purpose and restrictions |
|---|---|---|
| Edge runtime and SDK | C++20 | Deterministic acquisition, processing, decision, PLC/reject, native adapters |
| Extension ABI | Stable C ABI plus versioned C++ wrapper | Avoid C++ ABI/compiler coupling across third-party extensions |
| Factory services | Go | Compiled, concurrency-safe APIs, ingestion, orchestration, deployment, audit |
| Web applications | TypeScript, React/Next.js | Operator, engineering, operations; never direct control or DB access |
| Model factory | Python | Dataset, training, evaluation, export; prohibited from critical control path |
| Database | PostgreSQL SQL | Transactional state, metadata, audit, inspection indexes |
| Time-series | PostgreSQL/TimescaleDB extension when justified | Metrics and high-volume trends; deployment must work without proprietary SaaS |
| Object storage | S3-compatible MinIO | Images, datasets, models, reports, bundles |
| Contracts | Protocol Buffers and JSON Schema | Binary internal RPC/events and user-authored configuration validation |
| Build | CMake + pinned package lock; Go modules; pnpm lockfile; Python lockfile | Reproducible, offline-capable builds |

New production languages require an ADR stating ownership, lifecycle, security scanning, deployment cost, and failure containment.

## 5. Industrial interfaces and protocols

### 5.1 Vision and time

- GigE Vision and GenICam are primary industrial camera standards.
- USB3 Vision is supported for validated devices and suitable cable/environment constraints.
- Vendor SDK adapters are isolated behind the camera interface.
- RTSP is allowed for monitoring or non-deterministic inspections, not assumed suitable for precision triggered rejection.
- IEEE 1588 PTP is preferred for multi-device precision timing where supported; NTP/chrony is used for general system time.
- Hardware trigger and encoder correlation are first-class interfaces.

### 5.2 Automation

- OPC UA with certificates and security policies is the preferred information interface.
- Modbus TCP is supported for legacy equipment with network zoning and explicit register maps.
- PROFINET and EtherNet/IP integration is through certified adapters/gateways or separately licensed native adapters.
- Digital I/O is supported through certified isolated hardware.
- PLC handshakes must include trigger/sequence ID, busy/ready, result, result-valid, acknowledgement, timeout, and communication-health states.

### 5.3 Platform integration

- MQTT 5 over TLS, QoS 1 for events and store-and-forward telemetry. Topic and payload schemas are versioned.
- gRPC with mTLS for controlled service-to-service calls.
- REST/JSON over HTTPS for external management integrations and user applications.
- WebSocket or Server-Sent Events for UI updates; never for time-critical reject output.
- Secure WebSocket connections may be used for non-deterministic monitoring and approved integration updates; they never carry time-critical reject or safety output.
- S3 API for objects.
- OpenTelemetry conventions for traces, metrics, and logs.

## 6. Runtime processing model

```text
Trigger -> Acquire -> Validate -> Calibrate/Align -> ROI
        -> Classical/AI nodes -> Measurements -> Decision fusion
        -> PASS | FAIL | UNCERTAIN | SYSTEM_ERROR
        -> PLC handshake + evidence + event spool
```

Each frame set carries:

- station ID, boot ID, inspection ID, trigger ID, and sequence number;
- monotonic and wall-clock timestamps plus synchronization quality;
- product, batch, recipe, workflow, node, and model versions;
- camera and calibration identity;
- measurements, defect findings, confidence, and decision reasons;
- processing duration, deadline status, and device health;
- output command and PLC acknowledgement;
- evidence references and cryptographic hashes where required.

No model produces the final PLC signal directly. Model outputs become typed findings evaluated by the deterministic decision engine.

## 7. Workflow and extension architecture

Workflows are schema-validated DAGs. Cycles, unbounded fan-out, undeclared types, missing dependencies, incompatible versions, or budget violations prevent publication.

Node contract:

- immutable node type and semantic version;
- typed input/output schema;
- deterministic configuration schema;
- declared CPU, GPU, memory, and timing envelope;
- thread-safety and state model;
- health and error codes;
- test-vector bundle;
- extension signature and compatible runtime range.

Extension isolation tiers:

1. Built-in nodes: security reviewed and compiled with runtime.
2. Certified native plug-ins: stable C ABI, signature verified, restricted loading policy.
3. Out-of-process plug-ins: gRPC/IPC boundary, OS resource controls, restart isolation; preferred for third parties.

Arbitrary user code inside the edge runtime is prohibited.

## 8. Application package format

A signed application pack contains:

```text
manifest.json
compatibility.json
recipes/
workflows/
device-profiles/
models/
node-requirements/
ui-schemas/
reports/
knowledge/
validation/
signatures/
```

The manifest identifies package ID/version, publisher, supported runtime range, required capabilities, licences, hashes, migrations, rollback compatibility, and validation evidence.

Examples: `glove-inspection`, `packaging-integrity`, `metal-surface`, `electronics-assembly`, and `textile-quality`.

## 9. Recipe lifecycle

States:

```text
DRAFT -> REVIEW -> VALIDATED -> APPROVED -> STAGED -> ACTIVE
  |         |           |          |          |
  +------> REJECTED     +-------> REVOKED <---+
                                     |
                                  ROLLED_BACK
```

Production activation requires authorised approval, compatible signed dependencies, validation evidence, backup of the previous active package, and station health confirmation.

## 10. Data architecture

### 10.1 PostgreSQL

Stores organisations/sites, users/roles, stations/devices, products/batches, recipes/workflows, model metadata, deployment state, inspection indexes, findings, alarms, audit metadata, retention policy, and approval records.

Every table carrying customer production data includes an organisation/site boundary. Database roles enforce service ownership. Schema changes use forward-only versioned migrations with tested restore/rollback procedures.

### 10.2 Object storage

Stores images, video clips where approved, datasets, models, validation reports, generated reports, SBOMs, and release bundles. Objects are content-addressed or hash-verified, encrypted, access controlled, and lifecycle managed.

### 10.3 Event model

Canonical events include inspection completed, finding detected, output acknowledged/failed, station health changed, configuration promoted, deployment changed, model drift alert, security event, and audit action.

Consumers must be idempotent using event ID and source sequence. Delivery is at least once; schemas state compatibility and retention.

## 11. Identity, authorisation, and tenancy

- OIDC/OAuth 2.1 integration for enterprise identity; local identity only for isolated deployments.
- Web sessions use short-lived secure tokens and protected refresh flow.
- Service identity uses mTLS certificates, not shared static passwords.
- RBAC roles are combined with site/station scope and approval policy.
- High-risk actions require step-up authentication or two-person approval: recipe activation, model promotion, trust-store change, user privilege change, audit export, and remote support enablement.
- UI never receives database credentials or device-control credentials.

## 12. Observability and reliability

Minimum edge metrics:

- triggers received, frames acquired/dropped, incomplete frames;
- inspection latency percentiles and deadline misses;
- result counts, uncertain rate, system errors, reject acknowledgements;
- CPU/GPU/memory/storage/network/temperature;
- camera reconnects, PLC timeouts, clock offset;
- event-spool depth and oldest age;
- active runtime, recipe, workflow, node, model, and application-pack versions.

Logs are structured and redact secrets and restricted image metadata. Health has `HEALTHY`, `DEGRADED`, `NOT_READY`, and `FAULTED` states with defined PLC behaviour.

## 13. RAG and agentic boundary

RAG indexes only approved, versioned knowledge sources. Every answer records citations, document versions, model identity, prompt/policy version, and user action.

The agentic supervisor may read operational data and create recommendations, cases, or approval requests. It cannot directly:

- write to PLCs or I/O;
- activate recipes or models;
- alter thresholds or retention;
- disable alarms or audit;
- execute shell commands on an edge station.

## 14. Compatibility and versioning

- Semantic versioning for public APIs, SDKs, nodes, models, recipes, and packs.
- Protobuf field numbers are never reused.
- JSON schemas use explicit versions and reject unknown critical fields.
- Support an N/N-1 compatibility window at minimum after commercial release.
- Database, event, runtime, SDK, and application-pack compatibility matrices are release artefacts.
- Deprecations require warning, migration guidance, and a removal release.

## 15. Standard deployment topology

### Edge station

- Reference production class: industrial x86-64 computer with supported NVIDIA GPU, NVMe storage, TPM 2.0, and segregated camera and factory networks.
- Compact class: NVIDIA Jetson AGX Orin Industrial reference target; only exact combinations that pass the applicable gates may be described as certified platform-compatible.
- Ubuntu LTS is the reference operating system; a Windows IoT/Windows deployment requires separate certification.
- Runtime as a least-privilege system service.
- Read-only application partition where practical, encrypted data partition, local event spool, watchdog, and offline update agent.

### Initial compatibility targets

- Vendor-neutral camera acquisition through GenICam-compatible GigE Vision and USB3 Vision devices.
- RTSP sources only for monitoring or separately validated non-deterministic inspection.
- Initial PLC/controller families: Siemens, Rockwell Automation, Beckhoff, Omron, Mitsubishi Electric, and CODESYS-based controllers.
- Controller connectivity through OPC UA, Modbus TCP, certified industrial gateways, or separately approved adapters.
- Factory/enterprise integration through MQTT 5 over TLS, REST/JSON over HTTPS, gRPC with mTLS, and secure WebSocket connections where non-time-critical updates are required.

An initial target does not equal validated compatibility. Exact device model, module, firmware, SDK/driver, OS image, protocol/security profile, gateway, and tested limitations shall be recorded in `docs/compatibility/HARDWARE_COMPATIBILITY_MATRIX.md` and its machine-readable manifests before support is claimed.

### Factory server

- Ubuntu Server LTS.
- Nginx, Go services, PostgreSQL, MinIO, MQTT broker, and observability through pinned Docker Compose images.
- TLS for all user and inter-service connections.
- No public inbound exposure by default.

## 16. Architecture acceptance tests

- Pull factory network and prove continued decision/output with later event replay.
- Restart each non-edge service independently and prove bounded recovery.
- Corrupt or tamper with a package and prove rejection.
- Deploy an incompatible model and prove prevention.
- Fail camera/PLC/GPU/storage/time synchronization and verify defined degraded behaviour.
- Restore factory server and one edge station from backup onto replacement hardware.
- Run three different application packs without modifying runtime core.
- Verify tenant/site isolation and role restrictions.
- Verify rollback after a failed staged update.
