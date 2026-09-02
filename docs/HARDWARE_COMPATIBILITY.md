# Hardware Compatibility List

Status: Superseded as the compatibility source of truth; retained as an overview  
Owner: Zamri Ares, Product Owner and Technical Lead  

The controlled compatibility source is `docs/compatibility/HARDWARE_COMPATIBILITY_MATRIX.md`, with conformance and evidence in the adjacent matrices and machine-readable manifests. A target vendor or standard is not a compatibility claim.

## Status definitions

- `TARGET`: selected for evaluation; no compatibility claim.
- `DOCUMENTED`: official documentation reviewed and a bounded bench plan approved.
- `BENCH_VERIFIED`: declared tests passed on identified bench hardware; not site acceptance.
- `VALIDATED`: all required compatibility, security, failure, performance, and applicable site gates passed for the declared scope.
- `RESTRICTED`: supported only with stated limitations or deployment controls.
- `REVOKED`: prohibited because of security, reliability, lifecycle, or compatibility risk.

## Reference deployment classes

| Class | Approved target | Exact configuration | Status | Evidence/limitations |
|---|---|---|---|---|
| Production edge | Industrial x86-64, NVIDIA GPU, NVMe, TPM 2.0, segregated camera/factory networks, Ubuntu LTS | TBD | TARGET | Exact computer, GPU, storage, NIC, TPM, OS image, kernel and driver/runtime matrix required |
| Compact edge | Supported NVIDIA Jetson, NVMe where supported, segregated camera/factory networks, Ubuntu-based NVIDIA system image | TBD | TARGET | Exact module/carrier, storage, thermal/power envelope and JetPack/runtime matrix required |

## Camera targets

| Interface/family | Vendor/model | Firmware/SDK/driver | Deployment class | Status | Evidence/limitations |
|---|---|---|---|---|---|
| GenICam GigE Vision area-scan | TBD | TBD | TBD | TARGET | Initial certified camera family/model required |
| GenICam GigE Vision line-scan | TBD | TBD | TBD | TARGET | Application and encoder/trigger feasibility required |
| GenICam USB3 Vision | TBD | TBD | TBD | TARGET | Cable, topology, bandwidth and environment constraints required |
| RTSP | TBD | TBD | Monitoring/non-deterministic only | TARGET | Not approved for precision triggered rejection |
| Thermal | TBD | TBD | TBD | TARGET | Calibration, radiometry and environmental evidence required |
| 3D | TBD | TBD | TBD | TARGET | Data format, calibration, bandwidth and timing evidence required |

## PLC and controller targets

No protocol support is inferred from a vendor name. Each entry requires an exact controller, communication module, firmware, protocol/security profile, gateway where used, and approved handshake/register mapping.

| Vendor/family | Exact controller/module | Interface or gateway | Firmware/profile | Status | Evidence/limitations |
|---|---|---|---|---|---|
| Siemens | TBD | Standards-based interface or certified gateway: TBD | TBD | TARGET | Official manuals and bench plan required |
| Rockwell Automation | TBD | Standards-based interface or certified gateway: TBD | TBD | TARGET | Official manuals and bench plan required |
| Beckhoff | TBD | Standards-based interface or certified gateway: TBD | TBD | TARGET | Official manuals and bench plan required |
| Omron | TBD | Standards-based interface or certified gateway: TBD | TBD | TARGET | Official manuals and bench plan required |
| Mitsubishi Electric | TBD | Standards-based interface or certified gateway: TBD | TBD | TARGET | Official manuals and bench plan required |
| CODESYS-based controller | Vendor and model TBD | Standards-based interface or certified gateway: TBD | Runtime/profile TBD | TARGET | CODESYS runtime alone does not establish hardware compatibility |

## Platform integration targets

| Interface | Security/transport baseline | Permitted purpose | Status | Evidence/limitations |
|---|---|---|---|---|
| OPC UA | Approved certificates, trust policy and security mode/profile | Controller and information integration as explicitly mapped | TARGET | Exact client/server roles and profiles TBD |
| Modbus TCP | Segregated network, explicit map, bounded polling/timeouts | Legacy controller/device integration | TARGET | No implicit security; zoning and gateway controls required |
| MQTT 5.0 | TLS, authenticated identity, versioned topics/payloads, QoS 1 | Store-and-forward events and telemetry | TARGET | Broker/product/version and capacity limits TBD |
| REST API | HTTPS, authenticated/authorised versioned API | External management and data integration | TARGET | Never used for time-critical reject output |
| Secure WebSocket | WSS plus authenticated/authorised session | Non-time-critical monitoring and approved updates | TARGET | Never used for reject or safety output |
| gRPC | mTLS and versioned contracts | Controlled service-to-service calls | TARGET | Service identities and compatibility policy required |
| Digital I/O | Certified isolated hardware | Explicit bounded machine signals | TARGET | Exact device/electrical/failure behaviour TBD |

## Validation evidence required per production entry

- official manufacturer manuals, lifecycle/support status, licences, and procurement status;
- exact model/module/accessory identities, firmware, SDK, drivers, OS image, and configuration;
- protocol/security profile and explicit register, tag, topic, endpoint, or handshake ownership;
- normal, boundary, malformed-input, disconnect, timeout, restart, overload, and recovery tests;
- performance evidence on the declared edge hardware and workload;
- cybersecurity review, network-zone/conduit definition, credential/certificate lifecycle, and vulnerability status;
- known limitations, incompatible combinations, substitution/revalidation rules, and revocation procedure;
- bench and site evidence clearly labelled and linked.

## Current disposition

All entries are `TARGET`. Hardware and protocol compatibility is `NOT VERIFIED`; no production support claim is authorised yet.
